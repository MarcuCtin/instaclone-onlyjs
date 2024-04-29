
const likeButton = document.querySelectorAll('.likeButton');
const numOflikes = document.querySelectorAll('.numberOfLikes');
const likesListContainer = document.querySelectorAll('.likedByList')
const likeContainerTrigger = document.querySelectorAll('.likesTrigger');
const likeLayout =document.querySelector('.test-like');
const username = document.querySelector('.navPicture').getAttribute('user_username')
const currentUserId =  document.querySelector('.navPicture').getAttribute('user_id')

const fetchLike = async (postId) => {
    try {
        const res = await fetch(`/p/${postId}/likeModule`, {

            method: 'POST'
        })
        if (res.ok) {
            console.log(res)
        } else console.log(res)
    } catch (e) {
        console.log(e)
    }
}
const fetchDislike = async (postId) => {
    console.log(postId)
    try {
        const res = await fetch(`/p/${postId}/dislikeModule`, {

            method: 'POST'
        })

        if (res.ok) {
            console.log(res)
        } else console.log(res)
    } catch (e) {
        console.log(e)
    }
}
let userData={};
const fetchUsers = async (postId) => {
    const res = await fetch('/fetchUser',{
        method:'GET',
        headers: {
            accept: 'application/json',
          },
    
    });
    const data = await res.json();
    JSON.stringify(data);
    
    return data.user
}

// const getUser = async()=>{
//     const result = await fetchUsers();
//     console.log(result)
// }
// getUser()
likeContainerTrigger.forEach(numBtn => {
    numBtn.addEventListener('click', async function () {
        const postId = numBtn.getAttribute('data_post_id');;
        const inModalState = numBtn.getAttribute('inModal')
        if(inModalState ==='true'){
            document.querySelector('.overlay2').style.display='block';
            document.querySelector('.overlay2').addEventListener('click',function(){
                this.style.display='none'
                document.querySelector('.likedByList[data_post_id="' + postId + '"]').classList.add('d-none')

            })
        try{
        const res = await fetch(`/post/${postId}/interactPost`,{
            method:'post'
        })
        const data = await res.json();
        
        JSON.stringify(data)
        document.querySelector('.likedByList[data_post_id="' + postId + '"]').classList.remove('d-none')
            // const userLikes = document.querySelectorAll('.userLiked[data_post_id="'+postId+'"]');
            
            const likeUsername = document.querySelectorAll('.likedUserUsername[data_post_id="'+postId+'"]')
            likeUsername.forEach((usrLike,i)=>{
                usrLike.textContent = data.postLikes[i].username
            })
 
        overlay.style.display = 'block'
        document.querySelector('body').style.overflow = 'hidden'
        }catch(e){
            console.log(e)
        }
    }
    else{
       
        try{
        const res = await fetch(`/post/${postId}/interactPost`,{
            method:'post'
        })
        const data = await res.json();
        
        JSON.stringify(data)
        document.querySelector('.likedByList[data_post_id="' + postId + '"]').classList.remove('d-none')
            // const userLikes = document.querySelectorAll('.userLiked[data_post_id="'+postId+'"]');
            
            const likeUsername = document.querySelectorAll('.likedUserUsername[data_post_id="'+postId+'"]')
            likeUsername.forEach((usrLike,i)=>{
                usrLike.textContent = data.postLikes[i].username
            })
 
        overlay.style.display = 'block'
        document.querySelector('body').style.overflow = 'hidden'
        }catch(e){
            console.log(e)
        }
    }
    })
})

likesListContainer.forEach(async(cont,x) => {
    const postArray=[]
    const postId= cont.getAttribute('data_post_id')
    document.querySelector('.overlay').addEventListener('click', function () {
        cont.classList.add('d-none');
        document.querySelector('body').style.overflow = 'visible'
    })
})
likeButton.forEach(button => {
    button.addEventListener('click', async function () {
        const postId = button.getAttribute('data_post_id');
        const likeModalState = button.getAttribute('likeModal')
        
        
        if (button.classList.contains('liked')) {
            if(likeModalState ==='true'){
                fetchDislike(postId)
                document.querySelector('.likeButton[data_post_id="'+postId+'"][likeModal="false"]').classList.replace('liked', 'disliked');
                document.querySelector('.userLiked[user_username="'+currentUserId+'"][data_post_id="'+postId+'"]').remove();
                button.classList.replace('liked', 'disliked')
                document.querySelector('.numberOfLikes[data_post_id="' + postId + '"]').textContent--;
                document.querySelector('.numOfLikesModal[data_post_id="'+postId+'"]').textContent--;
                document.querySelector('.numOfLikesProfilePost[data_post_id="'+postId+'"]').textContent--;

            }
            else{
           fetchDislike(postId)
            document.querySelector('.userLiked[user_username="'+currentUserId+'"][data_post_id="'+postId+'"]').remove();
            button.classList.replace('liked', 'disliked')
            document.querySelector('.numberOfLikes[data_post_id="' + postId + '"]').textContent--;
            document.querySelector('.likeButton[data_post_id="'+postId+'"][likeModal="true"]').classList.replace('liked', 'disliked');
            document.querySelector('.numOfLikesModal[data_post_id="'+postId+'"]').textContent--;
            document.querySelector('.numOfLikesProfilePost[data_post_id="'+postId+'"]').textContent--;
        }
            // document.querySelector('.numOfLikesModal[data_post_id="'+postId+'"]').textContent--;

        } else {
            if(likeModalState==='true'){
                fetchLike(postId)
                document.querySelector('.likeButton[data_post_id="'+postId+'"][likeModal="false"]').classList.replace('disliked', 'liked');
                button.classList.replace('disliked', 'liked')
                const newClientLike = likeLayout.cloneNode(true);
                newClientLike.classList.remove('d-none')
                newClientLike.classList.remove('test-like')
                newClientLike.classList.add('userLiked')
                newClientLike.attributes[1].value =currentUserId;
                newClientLike.attributes[2].value = postId;
                newClientLike.children[0].children[1].children[0].children[0].textContent=username                
                newClientLike.children[0].children[1].children[0].children[0].attributes[2].value=postId
                newClientLike.children[0].children[1].children[0].children[0].attributes[1].value=currentUserId 
                document.querySelector('.likesList[data_post_id="'+postId+'"]').append(newClientLike)
                document.querySelector('.numberOfLikes[data_post_id="' + postId + '"').textContent++;
                document.querySelector('.numOfLikesModal[data_post_id="'+postId+'"]').textContent++
                document.querySelector('.numOfLikesProfilePost[data_post_id="'+postId+'"]').textContent++;
            }else{
                fetchLike(postId)
                document.querySelector('.likeButton[data_post_id="'+postId+'"][likeModal="true"]').classList.replace('disliked', 'liked');
                button.classList.replace('disliked', 'liked')
                const newClientLike = likeLayout.cloneNode(true);
                newClientLike.classList.remove('d-none')
                newClientLike.classList.remove('test-like')
                newClientLike.classList.add('userLiked')
                newClientLike.attributes[1].value =currentUserId;
                newClientLike.attributes[2].value = postId;
                newClientLike.children[0].children[1].children[0].children[0].textContent=username     
                newClientLike.children[0].children[1].children[0].children[0].attributes[2].value=postId
                newClientLike.children[0].children[1].children[0].children[0].attributes[1].value=currentUserId 
                document.querySelector('.likesList[data_post_id="'+postId+'"]').append(newClientLike)
                document.querySelector('.numberOfLikes[data_post_id="' + postId + '"').textContent++;
                document.querySelector('.numOfLikesModal[data_post_id="'+postId+'"]').textContent++
                document.querySelector('.numOfLikesProfilePost[data_post_id="'+postId+'"]').textContent++;

            }


            // document.querySelector('.numOfLikesModal[data_post_id="'+postId+'"]').textContent++
        }
    })

})
