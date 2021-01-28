document.querySelector('.menu').addEventListener('click', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('responsive');
    nav.style.cssText ="transition: all 0.5s ease-in-out;";
});


// TRUCATE main blogs
let truncate = document.querySelectorAll('.truncate');
for(let i =0; i < truncate.length; i++){ 
    let truncateValve = document.querySelector('.truncate').innerText;
    if(truncateValve.length > 190){
        render = truncateValve.substring(0,190);
    }
    truncate[i].innerText = `${render}...`;
}


// TRUCATE populer posts
let trucate_populer = document.querySelectorAll('.trucatepopuler');
for(let i =0; i < trucate_populer.length; i++){ 
  let trucate_populer_value = document.querySelector('.trucatepopuler').innerText;
  console.log(trucate_populer_value.length);
  if(trucate_populer_value.length > 55){
    render_pop = trucate_populer_value.substring(0,55);
  }
  trucate_populer[i].innerText = `${render_pop}...`;
}





// EDITOR
// let editor = document.querySelector('#editor');
// ClassicEditor.create(editor).catch( error => {
//     console.error( error );
// });

// MODELS
let modal = document.querySelector('.modal-user');
let btn = document.querySelector('.setting');

var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


let modal2 = document.querySelector('.modal-post');
let btn2 = document.querySelector('.model-edit');

let spanpost = document.querySelector('.close-post');
// When the user clicks the button, open the modal 
btn2.onclick = function() {
    modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanpost.onclick = function() {
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}