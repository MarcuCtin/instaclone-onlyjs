

document.addEventListener('DOMContentLoaded', function() {
    const optionButtons = document.querySelectorAll('.post-options')
    optionButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        document.querySelector('body').style.overflow='hidden'
        overlay.style.display='block'
        const postId = button.getAttribute('data-post-id');
        const post = document.querySelector('.post[data-post-id="' + postId + '"]')
        console.log(postId)
        const optionPopup = document.querySelector('.option-popup[data-post-id="' + postId+ '"]');
        optionPopup.style.display='block'
        var optionDel = document.querySelector('.optionDel[data-post-id="' +postId+ '"]');
        optionDel.addEventListener('click',async()=>{
            optionPopup.style.display='none'
            document.querySelector('body').style.overflow='visible'
            optionPopup.remove();
            overlay.style.display='none'
            try{
                const res = await fetch(`/p/${postId}?_method=DELETE`,{
                    method:"POST",
                })
                if(res.ok){
                    post.remove();
                    popupText.textContent='post deleted'
                    infoPopup.classList.remove('d-none')
                    setTimeout(function(){
                        infoPopup.classList.add('d-none');
                        popupText.textContent=''
                    },5000)          
                }
                else 
                {
                    throw new Error(msg,404)
                }
            }catch(e){
                console.log(e)
            }
        })
        // var deleteform = document.querySelector('.deleteForm')
        // deleteform.attributes[0].nodeValue = `/p/${postId}?_method=DELETE`;     
        // Show or manipulate the option popup box based on postId
        
      });
    });
  });