const followBtns = document.querySelectorAll('.followBtn');
const loggedUsername = username
const triggerFlwList = document.querySelector('.triggerFollowersList');
const triggerFollowingList = document.querySelector('.triggerFollowingList')
if(triggerFlwList){
triggerFlwList.addEventListener('click',function(){
    const username = this.getAttribute('username')
    document.querySelector('.followersList').classList.remove('d-none')
    overlay.style.display='block'
})
}
if(triggerFollowingList){
triggerFollowingList.addEventListener('click',function(){
    const username = this.getAttribute('username');
    document.querySelector('.followingList').classList.remove('d-none');
    overlay.style.display = 'block'
})}
followBtns.forEach(btn=>{
    btn.addEventListener('click',async function(){
        const owner = btn.getAttribute('owner')
        const followingState = btn.getAttribute('followingState');
        const username = btn.getAttribute('username');
        const fffbl = btn.getAttribute('followFromFollowedByList')
        const fffl = btn.getAttribute('followFromFollowingList');
        const ffm = btn.getAttribute('followFromMainButton');
        const ffpll = btn.getAttribute('followFromPostLikeList')
        const rmvFlw = btn.getAttribute('removeFollower')
        if(followingState==="false") //following
        {     // if(document.querySelector('.numOfFollowing[username="'+username+'"]'))
            //     document.querySelector('.numOfFollowing[username="'+username+'"]').textContent++;
            const res= await fetch(`/${username}/follow`,{method:"post"})
            if(res.ok){
                btn.classList.replace('btn-primary','btn-secondary');
                if(ffm==="true")
                {document.querySelector('.clientFollow[username="'+username+'"]').classList.remove('d-none')
                document.querySelector('.numOfFollowers[username="'+username+'"]').textContent++;
                btn.textContent = 'Following';
                }
                if(fffbl==='true' || fffl==='true' || ffpll==='true')
                {
                    btn.textContent = 'Unfollow';
                } 
            }
            const response = await res.json();
            JSON.stringify(response);
            console.log(response)
            btn.attributes[1].value=response.followed;
        }
        if(followingState==="true") //unfollowing
        {   
            // if(document.querySelector('.numOfFollowing[username="'+username+'"]'))
            //     document.querySelector('.numOfFollowing[username="'+username+'"]').textContent--;
            const res= await fetch(`/${username}/unfollow`,{method:"post"})
            if(res.ok){            
                btn.classList.replace('btn-secondary','btn-primary');
                btn.textContent = 'Follow';
                if(ffm==='true'){
                    document.querySelector('.numOfFollowers[username="'+username+'"]').textContent--;
                    btn.textContent = 'Follow';
                    if(document.querySelector('.clientFollow[username="'+username+'"]'))
                        document.querySelector('.clientFollow[username="'+username+'"]').classList.add('d-none')
                    if(document.querySelector('.followedByUser[username="'+loggedUsername+'"][serverside="true"]'))
                        document.querySelector('.followedByUser[username="'+loggedUsername+'"][serverside="true"]').remove()      
                }
                if(fffl==='true' && owner===loggedUsername){
                    btn.closest('.followingUser').remove();
                    document.querySelector('.numOfFollowing').textContent--;
                }
                if(rmvFlw ==='true'){
                    btn.closest('.followedByUser').remove();
                    document.querySelector('.numOfFollowers[username="'+loggedUsername+'"]').textContent--;

                }
            }
            const response = await res.json();
            JSON.stringify(response);
            console.log(response);
            if(rmvFlw !=='true')
                btn.attributes[1].value=response.followed;
        }
    })
})
