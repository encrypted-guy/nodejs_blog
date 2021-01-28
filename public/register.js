// register password
const btn1 = document.getElementById('checkreg');
btn1.addEventListener('click', () => {
    let password1 = document.getElementById('password1').value;
    let password2 = document.getElementById('password2').value;
    if(password1 != password2) {
        document.getElementById('password1').classList.add("wrong");
        document.getElementById('password2').classList.add("wrong");
    }
});

