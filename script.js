const formOpenBtn = document.querySelector("#form-open"),
    home = document.querySelector(".home"),
    formContainer = document.querySelector(".form_container"),
    formCloseBtn = document.querySelector(".form_close"),
    signupBtn = document.querySelector("#signup"),
    loginBtn = document.querySelector("#login"),
    pwShowHide = document.querySelectorAll(".fa-eye-slash, .fa-eye");

// Mostrar el contenedor del formulario
formOpenBtn.addEventListener("click", () => {
    home.classList.add("show");
});

// Cerrar el contenedor del formulario
formCloseBtn.addEventListener("click", () => {
    home.classList.remove("show");
});

// Mostrar/ocultar la contraseña
pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type == "password") {
            getPwInput.type = "text";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        }
    });
});

// Cambiar a registro
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.querySelector('.login-form').classList.remove('active'); // Ocultar el formulario de inicio de sesión
    formContainer.querySelector('.signup_form').classList.add('active'); // Mostrar el formulario de registro
});

// Cambiar a inicio de sesión
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.querySelector('.signup_form').classList.remove('active'); // Ocultar el formulario de registro
    formContainer.querySelector('.login-form').classList.add('active'); // Mostrar el formulario de inicio de sesión
});
