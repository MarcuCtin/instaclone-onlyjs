const likeModule = async(postid,commentid,replyid)=>{
     try{
        const res = await fetch(`/p/${postid}/comments/${commentid}/reply/${replyid}/like`, { method: 'post' })
        if(res.ok){
            const reply=await res.json()
            console.log(reply)
            console.log(`like reply with id ${replyid}`)}
        else{
            console.log(`cant like${replyid}`)
        }
     }
     catch(e){
        console.log(e)
     }
}
const dislikeModule = async(postid,commentid,replyid)=>{
     try{
        const res = await fetch(`/p/${postid}/comments/${commentid}/reply/${replyid}/dislike`, { method: 'post' })
        if(res.ok){
            const reply=await res.json()
            console.log(reply)
        console.log(`disliked reply with id ${replyid}`)}
        else{
            console.log(`cant dislike${replyid}`)
        }
     }
     catch(e){
        console.log(e)
     }
}
const repliesBtns = document.querySelectorAll('.replyButton')
repliesBtns.forEach((btn) => {
    const displayReplies = async ()=>{
        const commentId = btn.getAttribute('comment_id')
        const postId = btn.getAttribute('post_id')
        const res = await fetch(`/p/${postId}/comments/${commentId}/reply/retrieveReplies`, { method: 'post' });
        const commentHeader = document.querySelector('.comment-header[comment_id="'+commentId+'"]');
        const commentInHeader = document.querySelector('.comment-contentRep[comment_id="'+commentId+'"][headercomment="true"]')
        const submitReplyform = document.querySelector('.submitReplyform[comment_id="'+commentId+'"]')

        const comment = await res.json()
        JSON.stringify(comment.replies)
        console.log(comment)
        
        const main = document.querySelector('.commentRepliesMain[comment_id="' + commentId + '"]')
        const replysUsernames = document.querySelectorAll('.commentUsernameRep[comment_id="' + commentId + '"]')
        const replyLikeBtns = document.querySelectorAll('.likeReply[comment_id="'+commentId+'"]');
        const repliesLikes = []
        comment.replies.forEach((rep,i)=>{
            repliesLikes.push(rep.likedBy.length)
        })
        if (comment.replies.length !== 0) {
            const replys = document.querySelectorAll('.comment-contentRep[comment_id="' + commentId + '"][serverside="true"]')
            replys.forEach((reply, i) => {
                const replyId = reply.getAttribute('reply_id')
                document.querySelector('.commentUsernameRep[reply_id="' + replyId + '"]').textContent = comment.replies[i].username;
                document.querySelector('.commentTextRep[reply_id="' + replyId + '"]').textContent = comment.replies[i].body;
                if(comment.replies[i].likedBy.includes(currentUserId))
                    replyLikeBtns[i].classList.replace('disliked','liked')
                    document.querySelector('.numOfLikesReply[reply_id="'+replyId+'"]').textContent = repliesLikes[i]
            })
        }
        
        main.classList.remove('d-none')
        document.querySelector('.overlay2').style.display = 'block'
        document.querySelector('.overlay2').addEventListener('click', () => {
            document.querySelector('.overlay2').style.display = 'none'
            main.classList.add('d-none');
        })
        
        // const replyLayout = document.querySelector('.replyLayout[comment_id="' + commentId + '"');
        const replyButton = document.querySelector('.newCommentBtnRep[comment_id="' + commentId + '"');
        const submitReply = async function () {
            const commentBody = document.querySelector('.formInputCommentRep[comment_id="' + commentId + '"]').value
            const commentData = new URLSearchParams({
                comment: commentBody,
            })
            const res = await fetch(`/p/${postId}/comments/${commentId}/reply`, {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: commentData
            })
            const clientReply = await res.json()
            JSON.stringify(clientReply);
            const replyLayout = document.querySelector('.replyLayout[comment_id="' + commentId + '"]')
            const newReply = replyLayout.cloneNode(true);
            newReply.classList.remove('d-none')
            newReply.classList.remove('replyLayout')
            newReply.attributes[2].value = clientReply._id;
            newReply.children[0].children[1].children[0].textContent = username;//currentUser username;
            newReply.children[0].children[1].children[2].textContent = commentBody;
            newReply.children[0].children[2].children[0].children[0].attributes[3].value = clientReply._id;
            newReply.children[0].children[2].children[0].children[0].classList.add('likeReply')
            newReply.children[1].children[0].children[1].children[0].attributes[1].value=clientReply._id
            newReply.children[1].children[0].children[1].attributes[1].value = clientReply._id
            const likeReply = newReply.children[0].children[2].children[0].children[0];
            const newReplyLikesTrigger = newReply.children[1].children[0].children[1];
            document.querySelector('.listOfReplies[comment_id="'+commentId+'"]').append(newReply)
            if(document.querySelector('.noReplies[comment_id="'+commentId+'"]')) document.querySelector('.noReplies[comment_id="'+commentId+'"]').remove()
            newReplyLikesTrigger.addEventListener('click',function(){
            
            })
            const likeLogic = async()=>{
                const replyid = likeReply.getAttribute('reply_id');
                const commentid = likeReply.getAttribute('comment_id')
                const postid = likeReply.getAttribute('post_id');
                
                if(likeReply.classList.contains('disliked')){
                    likeModule(postId,commentid,replyid)
                    likeReply.classList.replace('disliked','liked')
                    console.log('liked')
                    document.querySelector('.numOfLikesReply[reply_id="'+replyid+'"]').textContent ++;
                }
                else if(likeReply.classList.contains('liked')){
                    dislikeModule(postid,commentid,replyid)
                    
                    likeReply.classList.replace('liked','disliked');
                    console.log('disliked')
                    document.querySelector('.numOfLikesReply[reply_id="'+replyid+'"]').textContent--;
                }
            }
            if(!likeReply.hasClickListener){
                likeReply.addEventListener('click',likeLogic);
                likeReply.hasClickListener = true;
            }
        }
        if(!replyButton.hasClickListener){
            replyButton.addEventListener('click',submitReply)
            replyButton.hasClickListener = true
        }
        
        replyLikeBtns.forEach(like=>{
            const likeLogic = async()=>{
                const replyid = like.getAttribute('reply_id');
                const commentid = like.getAttribute('comment_id')
                const postid = like.getAttribute('post_id')
                if(like.classList.contains('disliked')){
                    likeModule(postId,commentid,replyid)
                    like.classList.replace('disliked','liked')
                    console.log('liked')
                    document.querySelector('.numOfLikesReply[reply_id="'+replyid+'"]').textContent++;
                    document.querySelector('.clientLikeReply[reply_id="'+replyid+'"][username="'+username+'"]').classList.remove('d-none')
                }
                else if(like.classList.contains('liked')){
                    dislikeModule(postid,commentid,replyid)
                    like.classList.replace('liked','disliked');
                    console.log('disliked');
                    if(document.querySelector('.userLikedReply[username="'+username+'"][reply_id="'+replyid+'"]'))
                        document.querySelector('.userLikedReply[username="'+username+'"][reply_id="'+replyid+'"]').remove();
                    if(document.querySelector('.clientLikeReply[reply_id="'+replyid+'"][username="'+username+'"]'))
                        document.querySelector('.clientLikeReply[reply_id="'+replyid+'"][username="'+username+'"]').classList.add('d-none')
                    document.querySelector('.numOfLikesReply[reply_id="'+replyid+'"]').textContent--;
                }
            }
            if(!like.hasClickListener){
                like.addEventListener('click',likeLogic);
                like.hasClickListener = true;
            }
        })
        const replyLikesTriggers = document.querySelectorAll('.numOfLikesTriggerReply[comment_id="'+commentId+'"]')
        const replys = document.querySelectorAll('.comment-contentRep[comment_id="' + commentId + '"][serverside="true"]')
        replyLikesTriggers.forEach((btn,i)=>{
            const triggerListFn = async()=>{
                const replyid = btn.getAttribute('reply_id');
                const commentid = btn.getAttribute('comment_id');
                const reply = document.querySelector('.comment-contentRep[reply_id="'+replyid+'"]')
                const replyText =document.querySelector('.comment-textRep[reply="true"][reply_id="'+replyid+'"]')
                const replyTextLength =document.querySelector('.commentTextRep[reply_id="'+replyid+'"]').textContent.length
                document.querySelector('.comment-header[comment_id="'+commentid+'"]').append(reply)
                reply.classList.add('moveReply')
                reply.classList.add('px-2')
                
                document.querySelector('.comment-contentRep[comment_id="'+commentid+'"][headercomment="true"]').classList.add('moveHeader')
                document.querySelector('.likedByReply[reply_id="'+replyid+'"]').classList.remove('d-none')
                document.querySelector('.submitReplyform[comment_id="'+commentid+'"]').style.display='none'
                document.querySelector('.listOfReplies[comment_id="'+commentid+'"]').style.display='none';
                const savedTopDim = commentHeader.offsetTop;
                const replyTop = -80 - reply.offsetHeight/2
                if(replyTextLength<25)
                    {console.log(replyTextLength);
                    commentHeader.style.top="-80px";}
                else 
                    {replyText.classList.add('replyAdapt');commentHeader.style.top=`${replyTop}px`}
                document.querySelector('.closeLikesReply[reply_id="'+replyid+'"]').addEventListener('click',function(){
                    commentHeader.style.top=`${savedTopDim}px`
                    replyText.classList.remove('replyAdapt')
                    document.querySelector('.likedByReply[reply_id="'+replyid+'"]').classList.add('d-none')
                    document.querySelector('.submitReplyform[comment_id="'+commentid+'"]').style.display='block';
                    document.querySelector('.listOfReplies[comment_id="'+commentid+'"]').style.display='block'
                    document.querySelector('.comment-contentRep[comment_id="'+commentid+'"][headercomment="true"]').classList.remove('moveHeader')
                    reply.classList.remove('moveReply')
                    reply.classList.remove('px-2')
                    if(!replys[i-2]) 
                        document.querySelector('.listOfReplies[comment_id="'+commentid+'"]').prepend(reply)
                    else 
                        replys[i-2].append(reply)
                })
                document.querySelector('.overlay2').addEventListener('click',function(){
                    commentHeader.style.top=`${savedTopDim}px`
                    replyText.classList.remove('replyAdapt')
                    document.querySelector('.likedByReply[reply_id="'+replyid+'"]').classList.add('d-none');
                    document.querySelector('.listOfReplies[comment_id="'+commentid+'"]').style.display='block';
                    document.querySelector('.submitReplyform[comment_id="'+commentid+'"]').style.display='block';
                })
            }
            if(!btn.hasClickListener){
                btn.addEventListener('click',triggerListFn)
                btn.hasClickListener=true
            }
        })
        if(comment.body.length>25){
            commentHeader.style.height="fit-content"
            commentHeader.style.maxHeight="150px"
            const heightDif = commentHeader.offsetHeight - 70;
            const topValue= -80 - heightDif ;
            const topFormCalc = 300-commentHeader.offsetHeight/2;
            const commentText = document.querySelector('.comment-textRep[comment_id="'+commentId+'"][headercomment="true"]')
            commentHeader.style.top =`${topValue}px`
            submitReplyform.style.top=`${topFormCalc}px`
            const listOfReplies = document.querySelector('.listOfReplies[comment_id="'+commentId+'"]')
            listOfReplies.style.top=`-${heightDif+110}px`
            
        }
        // console.log(commentHeader.offsetTop)
    }
    if(!btn.hasEventListener){
        btn.addEventListener('click',displayReplies)
        btn.hasEventListener = true;
    }
    
})