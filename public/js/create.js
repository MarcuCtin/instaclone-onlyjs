const imageInput = document.getElementById('imageInput');
const imageInputText = document.querySelector('.input-text');
const firstimage = document.querySelector('.image')
const imageContainer = document.querySelector('.image-container')
const inputContainer = document.querySelector('.photo-uploading');
const postbutton = document.querySelector('.submit-post-button')
const files=[];
const textarea = document.querySelector(".textarea-desc");
const placeholder = textarea.getAttribute("placeholder");
const locationInput = document.getElementById('inputLocation');
const textareaContainer = document.querySelector('.post-description')
locationInput.addEventListener('focus',function(){
  this.addEventListener('input',function(){
    this.classList.remove('loadingBackground');
    if(this.value ==='')
      this.classList.add('loadingBackground')
  })
  
})

textarea.addEventListener('focus',function(){
  this.addEventListener('input',function(){
    this.classList.remove('loadingBackground');
    textareaContainer.classList.remove('loadingBackground');
    if(this.value.length===18)
    {
      this.classList.add('loadingBackground')
      textareaContainer.classList.add('loadingBackground')
    }
  })
})


imageContainer.style.height = imageContainer.style.width;
if(firstimage.classList.contains('d-none'))
  imageContainer.style.height='470px';

imageInput.addEventListener('change',function(){
  imageContainer.style.height='fit-content';
    for(let file of imageInput.files)
        files.push(file); 
         
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
              firstimage.src = reader.result;
            } 
    console.log(files)  

    inputContainer.style.display='none';
    firstimage.style.display="block!important";
    firstimage.classList.remove('d-none');
    // firstimage.style.position='relative';
    inputContainer.style.height='fit-content';
    if(textarea.value>0){
      postbutton.style.display='block';
    }
    
})

textarea.addEventListener("input", function() {
 
  const value = textarea.value.replace(placeholder, "");
  textarea.value = placeholder + value;
  const textareaValue = textarea.value;
  
  if(files.length>0 && textareaValue.length>18){
    postbutton.style.display='block';
  }
  if(files.length>0 && textareaValue.length===18){
    postbutton.style.display='none';
  }
  
});
textarea.addEventListener('focus',function(){
  textarea.value='                  ';
})

//daca sunt mai mult de o imagine cream cumva un carusel
//la submit post vom lua imaginile din array
//la click pe submit vom da dsiplay:nope la article si vom da display:block la un div care va contine o validare gen post created, bifa.