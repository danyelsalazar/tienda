// codigo para el menu responsive
window.onscroll = function(){
     scroll = document.documentElement.scrollTop;

     header = document.getElementById("header");

     scroll > 20 && header.classList.add("nav_mod");
    //  if(scroll > 20){
    //      header.classList.add("nav_mod")
    //  }
    scroll < 20 && header.classList.remove("nav_mod")
    //  else if(scroll < 20){
    //     header.classList.remove("nav_mod")
    //  }
};

document.getElementById("btn__menu").addEventListener("click", mostrarMenu);

 const menu = document.getElementById("header");
 const body = document.getElementById("container_all");
 const nav = document.getElementById("nav");

function mostrarMenu(){
     
    menu.classList.toggle("move_content");
    nav.classList.toggle("move_nav");
    body.classList.toggle("move_content");
    
};

window.addEventListener("resize", function(){
    
    if(window.innerWidth > 760){
        menu.classList.remove("move_content");
        nav.classList.remove("move_nav");
        body.classList.remove("move_content");
    }
});

const menuLinks = document.querySelectorAll(".menu a[href^=\"#\"]");

menuLinks.forEach(menuLink =>{
    menuLink.addEventListener("click", function(){
        menu.classList.remove("move_content");
        nav.classList.remove("move_nav");
        body.classList.remove("move_content");
    })
});

// salir del menu: 
const main = document.querySelector(".contenido");
const card = document.querySelector(".row");
const pieDePagina = document.querySelector("footer");

main.addEventListener("click", ()=>{
    menu.classList.remove("move_content");
    nav.classList.remove("move_nav");
    body.classList.remove("move_content");
});
card.addEventListener("click", ()=>{
    menu.classList.remove("move_content");
    nav.classList.remove("move_nav");
    body.classList.remove("move_content");
});
pieDePagina.addEventListener("click", ()=>{
    menu.classList.remove("move_content");
    nav.classList.remove("move_nav");
    body.classList.remove("move_content");
});

// botom empezar:
const btnEmpezar = document.querySelector(".btnEmpezar");

btnEmpezar.addEventListener("click", ()=>{
    Swal.fire(`¡Próximamente !💻`)
})