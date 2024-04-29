
const express= require('express');
const ejsMate = require('ejs-mate');
const path = require('path')
const app = express();
const dotenv = require('dotenv');
const Replies = require('./models/reply')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Post = require('./models/post');
const Comment  = require('./models/comment');
const User = require('./models/user')
const { cloudinary } = require('./cloudinary');
const postsRoutes = require('./routes/postRoutes');
const commentsRoutes = require('./routes/comments')
const userRoutes = require('./routes/user')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db= mongoose.connection;
db.on('error',console.error.bind(console,"connection error:"));
db.once('open',()=>{
    console.log('database connected');
})

const multer = require('multer');
const {storage} = require('./cloudinary');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
const upload = multer({storage});

app.use(methodOverride('_method'))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));

app.engine('ejs',ejsMate);
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

app.use(session(sessionConfig))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/p',postsRoutes)
app.use('/p/:id/comments',commentsRoutes)

app.get('/',async (req,res)=>{
    if(req.isAuthenticated()){
    await User.findById(req.user._id)
    const posts = await Post.find({}).populate('likedBy').populate('author').populate('comments').populate({path:'comments',populate:{path:'replies',path:'likedBy'}}).populate({path:'comments',populate:{path:'replies',populate:{path:'likedBy'}}});
    
    // posts.forEach(post=>{
    //     if(post.likedBy.contains(req.user._id))
 
    // })
    res.render('home',{posts});
    }else res.render('login')
    
})
app.get('/register',async(req,res,next)=>{
    res.render('register')
})
app.post('/post/:id/interactPost',async(req,res)=>{
    try{
    const {id}= req.params;
    const post = await Post.findById(id).populate('likedBy');
    console.log(req.user,'currentUSer')
     console.log(post.likedBy)
    res.json({
        postLikes:post.likedBy,
    })
    }
    catch(e){
        console.log(e)
    }
})
app.post('/register',catchAsync(async(req,res)=>{
    try{
        const {username,password,email} = req.body;
        const user = new User({email,username});
        const registeredUser = await User.register(user,password);
            req.login(registeredUser,err=>{
                if(err) return err.message;
                // req.flash('success','Welcome to yelpcamp');
                res.redirect('/')
            })}catch(e){
            req.flash('error',e.message);
            res.redirect('/register')
            }
}))
app.post('/p/:id/comments/',async(req,res)=>{
    console.log(req.body)
    const{id} = req.params;
    const post = await Post.findById(id);
    const {comment} = req.body;

    const newComment =  new Comment({body:comment}); 
    newComment.author = req.user._id; 
    post.comments.push(newComment);
    await post.save();
    await  newComment.save();
    res.sendStatus(200)
    // console.log('post',post)
})
app.get('/login',async(req,res)=>{
    res.render('login')
})
app.get('/logout',async(req,res)=>{
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/');
})
app.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
    req.flash('success',`welcome back ${req.user.username}`);
    res.redirect('/')
})
// app.use('/p/:id/comments',comments)

// app.delete('/p/:id',async(req,res)=>{
//     console.log('hit')
//     await Post.findByIdAndDelete(req.params.id);
//     res.redirect('/')
    
// })
app.get('/fetchUser',async(req,res)=>{
    if(req.user)
    {res.json({
        user:req.user
    })}
    
})
app.get('/create',async(req,res)=>{
    res.render('create')
})
// app.get('/p/:id',async(req,res)=>{
//     try{const id = req.params.id;
//     const post = await Post.findById(id);
//     if(post){
//         res.json(post);
//     }else {
//         res.status(404).json({ error: 'Document not found' });
//       }}catch(error) {
//       res.status(500).json({ error: 'Server error' });
//       }
// })
// app.post('/p',upload.single('image'),async(req,res)=>{
    
//     const post  = await new Post(req.body.post);
//     // post.images.path = req.file.path;
//     // post.images.filename = req.file.filename
//     post.images = req.file;
    
//     await post.save();console.log(post)
//     res.redirect('/')
// })
app.use('/:username',userRoutes)
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})
app.listen('8080',(req,res)=>{
    console.log('on 8080')
})