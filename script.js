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
    formContainer.querySelector('.login-form').classList.remove('active');
    formContainer.querySelector('.signup_form').classList.add('active');
});

// Cambiar a inicio de sesión
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.querySelector('.signup_form').classList.remove('active');
    formContainer.querySelector('.login-form').classList.add('active');
});


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.navbar a[href="#${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
});


new Swiper(".card-wrapper", {
    loop: true,
    spaceBetween: 30,
  
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

//Programacion del carousel 

const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");


btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRigt())

setInterval(() => {
    moveToRigt()
}, 6000);

let operacion = 0,
    counter = 0,
    widthImg = 100 / sliderSection.length;

function moveToRigt() {
    if (counter >= sliderSection.length-1) {
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        return;
    } 
    counter++;
    operacion = operacion + widthImg
    slider.style.transform = `translate(-${operacion}%)`
    slider.style.transition = "all ease .6s"
}

function moveToLeft() {
    counter--;
    if (counter < 0 ) {
        counter = sliderSection.length-1;
        operacion = widthImg * (sliderSection.length-1)
        slider.style.transform = `translate(-${operacion}%)`
        return;
    }
    operacion = operacion - widthImg
    slider.style.transform = `translate(-${operacion}%)`
    slider.style.transition = "all ease .6s"
}