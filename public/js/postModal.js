
//avem access la array cu post-uril din home page in variabila 'postsData'
const modalTrigger = document.querySelectorAll('.comment-button');
const modalPosts = document.querySelectorAll('.modal-post');
const modalPost = document.querySelector('.modal-post')
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.closeBtn');
const options = document.querySelectorAll('.post-options');
const cancelBtn = document.querySelectorAll('.option-cancel')
const optionPopup = document.querySelectorAll('.option-popup')
const posts = document.querySelectorAll('.post');
const imageModal = document.querySelector('.modal-image');
const imagePostPath = document.querySelectorAll('.imagePostSrc');
const closeModal = document.querySelector('.closeModal');
const commentLayout = document.querySelector('.test-comment')
const likeListLayoutComm = document.querySelector('.likedByComment[client_side="true"]')
const infoPopup = document.querySelector('.infoPopup')
const popupText = document.querySelector('.popupText')
const likeLayoutComm = document.querySelector('.test-likeComm')
const postsIds = [];
posts.forEach((post, i) => {
    const id = post.getAttribute('data-post-id');
    postsIds.push(id);
})
const newCommentForm = document.querySelector('.newCommentForm');

const populatedPosts = [];
const commTriggerModal = document.querySelectorAll('.triggerModalViewComments')
const fetchCommLike = async (commentID, postID) => {
    try {
        const res = await fetch(`/p/${postID}/comments/${commentID}/like`, {
            method: 'post'
        })
        if (!res.ok)
            console.log(res)
    } catch (err) {
        console.log(err)
    }
}
const fetchCommDislike = async (commentID, postID) => {
    try {
        const res = await fetch(`/p/${postID}/comments/${commentID}/dislike`, {
            method: 'post'
        })
        if (!res.ok)
            console.log(res)
    } catch (err) {
        console.log(err)
    }
}
let x = 0;
document.addEventListener('DOMContentLoaded', function () {
    modalTrigger.forEach(function (button) {

        button.addEventListener('click', async () => {

            var postID = button.getAttribute('data_post_id');;
            const newCommentBtn = document.querySelector('.newCommentBtn[data_post_id="' + postID + '"]');
            const commentsContainer = document.querySelector('.commentsContainer[data_post_id="' + postID + '"]')
            const res = await fetch(`/p/${postID}`);
            const data = await res.json();
            JSON.stringify(data);
            console.log(data)
            const modal = document.querySelector('.modal-post[data_post_id="' + postID + '"]');
            const comments = document.querySelectorAll('.comment-content[data_post_id="'+postID+'"]')
            // comments.forEach((comm)=>{
            //     const commentid = comm.getAttribute('comment_id')
            //     comm.append(document.querySelector('.commentOptions[data_post_id="'+postID+'"][comment_id="'+commentid+'"]'))
            // })
            modal.style.display = 'flex';
            overlay.style.display = 'block';
            document.querySelector('body').style.overflow = 'hidden';
            overlay.addEventListener('click', function () {
                overlay.style.display = 'none';
                modal.style.display = 'none';
                document.querySelector('body').style.overflow = 'visible';

            });
            closeBtn.addEventListener('click', function () {
                overlay.style.display = 'none';
                modal.style.display = 'none';
                document.querySelector('body').style.overflow = 'visible';

            });
            closeModal.addEventListener('click', function () {
                modal.style.display = 'none';
                overlay.style.display = 'none';
                document.querySelector('body').style.overflow = 'visible';
            })
            data.post.comments.forEach((comment, i) => {
                document.querySelector('.commentText[comment_id="' + comment._id + '"]').textContent = comment.body
                document.querySelector('.commentUsername[comment_id="' + comment._id + '"').textContent = comment.author.username
            })

            document.querySelector('.modal-image').attributes.src.value = data.post.images.path.replace('/upload', '/upload/ar_1:1,c_fill,w_1000,g_auto');
            const submitCommentFn =  async function () {
                var comment = document.querySelector('.formInputComment[data_post_id="' + postID + '"]').value;
                let commentData = new URLSearchParams({
                    comment: comment,
                })
                const res = await fetch(`p/${postID}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: commentData,
                })
                const data2 = await res.json();
                JSON.stringify(data2);
                const comment_id = data2._id
                console.log(data2)

                const likeListClient = likeListLayoutComm.cloneNode(true);        
                likeListClient.attributes[0].value = comment_id;
                likeListClient.attributes[1].value = postID;
                likeListClient.children[1].children[0].attributes[0].value = comment_id
                console.log(likeListClient)
                document.querySelector('.footer-post').append(likeListClient)
                    

                const newClientComment = commentLayout.cloneNode(true);
                newClientComment.classList.remove('d-none')
                newClientComment.classList.remove('test-comment')
                newClientComment.classList.add('comment-content');
                
                newClientComment.children[0].children[1].children[1].textContent = ' ' + comment;
                newClientComment.children[0].children[1].children[0].textContent = data.username;
                newClientComment.children[1].children[0].children[4].attributes[2].value=comment_id
                const likeComm = newClientComment.children[0].children[2].children[0];
                likeComm.attributes[3].value = comment_id;
                likeComm.attributes[2].value = postID;
                newClientComment.children[1].children[0].children[1].attributes[1].value = postID
                newClientComment.children[1].children[0].children[1].attributes[2].value = comment_id
                newClientComment.children[1].children[0].children[1].children[0].attributes[1].value = comment_id
                const commentSettingsLayout = document.querySelector('.commentSettingsLayout')
                const newCommentSettings = commentSettingsLayout.cloneNode(true);
                newCommentSettings.classList.remove('commentSettingsLayout')
                newCommentSettings.attributes[1].value = comment_id
                newCommentSettings.children[0].attributes[1].value = comment_id
                newCommentSettings.children[2].attributes[1].value = comment_id
                document.querySelector('.footer-post[data_Post_id="'+postID+'"]').append(newCommentSettings);
                const newCommentSettingsTrigger= newClientComment.children[1].children[0].children[4];
                if(document.querySelector('.numOfCommentsProfilePost[data_post_id="'+postID+'"'))
                    {document.querySelector('.numOfCommentsProfilePost[data_post_id="'+postID+'"').textContent++;}
                // console.log(newCommentSettingsTrigger)
                //delete the new comment
                newCommentSettingsTrigger.addEventListener('click',function(){
                    document.querySelector('body').style.overflow ='hidden'
                    
                    const deleteComment  = newCommentSettings.children[0]
                    console.log(newCommentSettings)
                    // const newCommentSettings = document.querySelector('.commentSettings[comment_id="'+comment_id+'"]')
                    newCommentSettings.style.display='block';
                    document.querySelector('.overlay2').style.display='block';
                    document.querySelector('.overlay2').addEventListener('click',function(){
                        document.querySelector('.overlay2').style.display='none';
                        newCommentSettings.style.display='none'
                    })
                        deleteComment.addEventListener('click',async function(){
                            
                            const postid = deleteComment.getAttribute('data_post_id')
                            const res = await fetch(`/p/${postid}/comments/${comment_id}/delete`,{method:'post'});
                            if(res.ok){console.log('deleted')}
                            else console.log('error cant delete')
                            newClientComment.remove();
                            document.querySelector('.overlay2').style.display='none';
                            newCommentSettings.remove();
                            infoPopup.classList.remove('d-none')
                            popupText.textContent='comment deleted'
                            setTimeout(function(){
                                infoPopup.classList.add('d-none');
                                popupText.textContent=''
                            },5000)
                        })
                })

                likeComm.addEventListener('click', async function () {
                    const commentid= likeComm.getAttribute('comment_id')
                    console.log(commentid,'xxx')
                    if (this.classList.contains('disliked')) {
                       
                        fetchCommLike(comment_id, postID)
                        this.classList.replace('disliked', 'liked')
                        document.querySelector('.numOfCommLikes[comment_id="' + comment_id + '"]').textContent++
                        document.querySelector('.userLikedComm[comment_id="' + commentid + '"][user_id="'+currentUserId+'"]').classList.remove('d-none')
                        
                    }
                    else {
                        fetchCommDislike(comment_id, postID)
                        this.classList.replace('liked', 'disliked');
                        document.querySelector('.numOfCommLikes[comment_id="' + comment_id + '"]').textContent--;
                        document.querySelector('.userLikedComm[comment_id="' + commentid + '"][user_id="'+currentUserId+'"]').classList.add('d-none')

                       
                    }
                })

                commentsContainer.append(newClientComment);
                document.querySelector('.numOfLikesTriggerBtn[comment_id="'+comment_id+'"]').addEventListener('click',()=>{
                    const commentId = this.getAttribute('comment_id')
                    console.log(comment_id,'added')
                    likeListClient.classList.remove('d-none')      
                    document.querySelector('.overlay2').style.display = 'block';
                    document.querySelector('.overlay2').addEventListener('click', () => {
                        document.querySelector('.overlay2').style.display = 'none'
                        likeListClient.classList.add('d-none')
                    })
                })

            }
            if(!newCommentBtn.hasClickListener)
            {
                newCommentBtn.addEventListener('click',submitCommentFn)
                newCommentBtn.hasClickListener = true;
            }

            const commentsLikeBtns = document.querySelectorAll('.likeCommBtn[post_id="' + postID + '"]');
            commentsLikeBtns.forEach(btn => {
                const likeModule = async () => {
                    const postID = btn.getAttribute('post_id')
                    const commentID = btn.getAttribute('comment_id')
                
                    if (btn.classList.contains('disliked')) {
                        const inReplyLikeComm = btn.getAttribute('inreplylikecomm')
                        fetchCommLike(commentID, postID)
                        const newLike = likeLayoutComm.cloneNode(true);
                        newLike.classList.remove('d-none')
                        newLike.classList.remove('test-likeComm')
                        newLike.classList.add('userLikedComm');
                        newLike.attributes[0].value = commentID;
                        document.querySelector('.commentLikesList[comment_id="' + commentID + '"]').append(newLike)
                        
                        if(inReplyLikeComm === 'true'){
                            document.querySelector('.likeCommBtn[comment_id="'+commentID+'"][inreplylikecomm="false"]').classList.replace('disliked','liked')
                            document.querySelector('.likeCommBtn[comment_id="'+commentID+'"][inreplylikecomm="true"]').classList.replace('disliked','liked')
                        }
                        if(inReplyLikeComm === 'false'){
                            document.querySelector('.likeCommBtn[comment_id="'+commentID+'"][inreplylikecomm="false"]').classList.replace('disliked','liked')
                            document.querySelector('.likeCommBtn[comment_id="'+commentID+'"][inreplylikecomm="true"]').classList.replace('disliked','liked')
                        }
                        document.querySelector('.numOfCommLikes[comment_id="' + commentID + '"]').textContent++
                        document.querySelector('.numOfCommLikesRep[comment_id="'+commentID+'"]').textContent++
                        
                    }
                    else {
                        const inReplyLikeComm = btn.getAttribute('inreplylikecomm')
                        fetchCommDislike(commentID, postID)
                        document.querySelector('.userLikedComm[comment_id="' + commentID + '"][user_id="' + currentUserId + '"]').remove()
                        if(inReplyLikeComm === 'true'){
                            document.querySelector('.likeCommBtn[comment_id="'+commentID+'"][inreplylikecomm="false"]').classList.replace('liked','disliked')
                            document.querySelector('.likeCommBtn[comment_id="'+commentID+'"][inreplylikecomm="true"]').classList.replace('liked','disliked')
                        }
                        if(inReplyLikeComm === 'false'){
                            document.querySelector('.likeCommBtn[comment_id="'+commentID+'"][inreplylikecomm="false"]').classList.replace('liked','disliked')
                            document.querySelector('.likeCommBtn[comment_id="'+commentID+'"][inreplylikecomm="true"]').classList.replace('liked','disliked')
                        }
                        document.querySelector('.numOfCommLikes[comment_id="' + commentID + '"]').textContent--;
                        document.querySelector('.numOfCommLikesRep[comment_id="'+commentID+'"]').textContent--;
                    }
                }
                if (!btn.hasClickListener) {
                    btn.addEventListener('click', likeModule)
                    btn.hasClickListener = true;
                }
            })
            const commLikeListTrigger = document.querySelectorAll('.numOfLikesTriggerBtn')
            commLikeListTrigger.forEach(function (buton) {
                buton.addEventListener('click', async () => {
                    const commentId = buton.getAttribute('comment_id');
                    const likesList = document.querySelector('.likedByComment[comment_id="' + commentId + '"]');
                    const res = await fetch(`/p/${postID}/comments/${commentId}`, { method: 'post' })
                    const likeList = await res.json()
                    JSON.stringify(likeList)
                    console.log(likeList)
                    const likes = document.querySelectorAll('.userLikedComm[comment_id="' + commentId + '"][data_post_id="' + postID + '"]')
                    likes.forEach((like, i) => {
                        like.children[0].children[1].children[0].children[0].textContent = likeList[i].username
                    })
                    likesList.classList.remove('d-none');

                    document.querySelector('.overlay2').style.display = 'block';
                    document.querySelector('.overlay2').addEventListener('click', () => {
                        document.querySelector('.overlay2').style.display = 'none'
                        likesList.classList.add('d-none');
                    })

                })
            })
            
           
        })
    })
})



const commentSettingsTriggers = document.querySelectorAll('.commentSettingsTrigger')
commentSettingsTriggers.forEach(trigger=>{
   const triggerSettings = async()=>{
    document.querySelector('body').style.overflow ='hidden'
    const commentid = trigger.getAttribute('comment_id')
    const deleteComment  = document.querySelector('.deleteComment[comment_id="'+commentid+'"]')
    const commentSettings = document.querySelector('.commentSettings[comment_id="'+commentid+'"]')
    commentSettings.style.display='block';
    document.querySelector('.overlay2').style.display='block';
    document.querySelector('.overlay2').addEventListener('click',function(){
        document.querySelector('.overlay2').style.display='none';
        commentSettings.style.display='none'
    })
        deleteComment.addEventListener('click',async function(){
            
            const commentid = deleteComment.getAttribute('comment_id')
            const postid = deleteComment.getAttribute('data_post_id')
            const res = await fetch(`/p/${postid}/comments/${commentid}/delete`,{method:'post'});;
            if(document.querySelector('.numOfCommentsProfilePost[data_post_id="'+postid+'"'))
                {document.querySelector('.numOfCommentsProfilePost[data_post_id="'+postid+'"').textContent--;}
            if(res.ok){console.log('deleted')}
            else console.log('error cant delete')
            document.querySelector('.comment-content[comment_id="'+commentid+'"]').remove();
            document.querySelector('.overlay2').style.display='none';
            commentSettings.remove();
            infoPopup.classList.remove('d-none')
            popupText.textContent='comment deleted'
            setTimeout(function(){
                infoPopup.classList.add('d-none');
                popupText.textContent=''
            },5000)
        })

   }
   if(!trigger.hasEventListener){
    trigger.addEventListener('click',triggerSettings)
    trigger.hasEventListener = true
   }
})
cancelBtn.forEach((button) => {
    button.addEventListener('click', function () {
        const postId = button.getAttribute('data-post-id');
        const commentid=button.getAttribute('comment_id')
        if(!commentid) overlay.style.display = 'none';
        document.querySelector('.option-popup[data-post-id="' + postId + '"]').style.display = 'none';
        document.querySelector('body').style.overflow = 'visible';
        document.querySelector('.commentSettings[comment_id="'+commentid+'"]').style.display='none'
        document.querySelector('.overlay2').style.display='none'
    })
})
overlay.addEventListener('click', function () {
    // document.querySelectorAll('.likedByList').classList.add('d-none')
    this.style.display = 'none';
    optionPopup.forEach(element => {
        element.style.display = 'none'
    });
    document.querySelector('body').style.overflow = 'visible';
});
