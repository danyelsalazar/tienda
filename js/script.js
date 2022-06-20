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
}

document.getElementById("btn__menu").addEventListener("click", mostrarMenu);

menu = document.getElementById("header");
body = document.getElementById("container_all")
nav = document.getElementById("nav");

function mostrarMenu(){
     
    menu.classList.toggle("move_content");
    nav.classList.toggle("move_nav");
    body.classList.toggle("move_content");
    
}

window.addEventListener("resize", function(){
    
    if(window.innerWidth > 760){
        menu.classList.remove("move_content");
        nav.classList.remove("move_nav");
        body.classList.remove("move_content");
    }
})

const menuLinks = document.querySelectorAll(".menu a[href^=\"#\"]");

menuLinks.forEach(menuLink =>{
    menuLink.addEventListener("click", function(){
        menu.classList.remove("move_content");
        nav.classList.remove("move_nav");
        body.classList.remove("move_content");
    })
})