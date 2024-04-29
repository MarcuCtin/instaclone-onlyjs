const optionsBtn = document.querySelector('.nav-more-block');
const popupMenu = document.querySelector('.popup-menu');
optionsBtn.addEventListener('click',function(){
  if(popupMenu.classList.contains('d-none'))
    popupMenu.classList.remove('d-none')
  else popupMenu.classList.add('d-none')
})












































// const imageInput = document.getElementById('image-input');
// const image = document.getElementById('image');
// const imageInputContainer = document.getElementById('iamge-input-container')
// const overlay = document.querySelector('.overlay');
// const modalContainer = document.querySelector('.modal-container');
// const closeBtn = document.querySelector('.closeBtn');
// const triggerBtn = document.querySelector('.modal-create-trigger');
// const navTop = document.querySelector('.navigation-sm-top')

// // Open the modal when the trigger button is clicked
// triggerBtn.addEventListener('click', function() {
//   overlay.style.display = 'block';
//   modalContainer.style.display = 'block';
//   document.querySelector('body').style.overflow='hidden';

// });
// // Close the modal when the close button is clicked or when the overlay is clicked
// closeBtn.addEventListener('click', function() {
//   overlay.style.display = 'none';
//   modalContainer.style.display = 'none';
//   document.querySelector('body').style.overflow='visible';

// });

// overlay.addEventListener('click', function() {
//   overlay.style.display = 'none';
//   modalContainer.style.display = 'none';
//   document.querySelector('body').style.overflow='visible';

  
// });

// imageInput.addEventListener('change',function(){
//   const file = imageInput.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => {
//     image.src = reader.result;
//   }
// })
// const cropper = new Cropper(image, {
//   aspectRatio: 1,
//   crop: () => {
//     // Handle crop events here
//   }
// });