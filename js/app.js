const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();

let carrito = {};

// eventos:
document.addEventListener("DOMContentLoaded", () => { 
    fetchData() 
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        pintarCarrito()
    }
});

cards.addEventListener("click", e => { 
    addCarrito(e)
});

items.addEventListener("click", e => {
    btnAccion(e)
})

// capturamos los datos de la api:
const fetchData = async () => {
    try{
        const res = await fetch("api.json");
        const data = await res.json();
        // console.log(data);
        pintarCards(data)
    }catch(error){
        console.log(error);
    }
}

// pintar los productos:

const pintarCards = data =>{
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl);
        templateCard.querySelector('button').dataset.id = producto.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)

};

const addCarrito = e =>{
    // console.log(e.target);
    // console.log(e.target.classList.contains("btn-dark"));
    if(e.target.classList.contains("btn-dark")){
        setCarrito(e.target.parentElement);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se añadio al carrito',
          showConfirmButton: false,
          timer: 1500
        })
    }
    e.stopPropagation()
};

const setCarrito = objeto => {
    // console.log(objeto);
    const producto = {
        id: objeto.querySelector(".btn-dark").dataset.id,
        title: objeto.querySelector("h5").textContent,
        img: "image",
        descripcion: objeto.querySelector(".btn-dark").dataset.id,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1
    }
    // console.log(producto);
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    };
    carrito[producto.id] = {...producto};
    pintarCarrito()

};

const pintarCarrito = () =>{
    // console.log(carrito);
    items.innerHTML = ""
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector("th").textContent = producto.id;
        templateCarrito.querySelectorAll("td")[0].textContent = producto.title;
        templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
        templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
        templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
        templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);

    });
    items.appendChild(fragment);

    pintarFooter();

    localStorage.setItem("carrito", JSON.stringify(carrito))
};

const pintarFooter = () => {
    footer.innerHTML = "";

    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `;

        return
    };

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad ,0);
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad,precio}) => acc + cantidad * precio ,0)
    
    templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
    templateFooter.querySelector("span").textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment)

    // boton vaciar:
    const btnVaciar = document.getElementById("vaciar-carrito");
    btnVaciar.addEventListener("click", () => {
            // uso de alerta:
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Vacío!',
              showConfirmButton: false,
              timer: 1500
            });
            carrito = {};
            pintarCarrito()  
    })
};

const btnAccion = e => {
    // console.log(e.target);
    // accion de aumentar:
    if(e.target.classList.contains("btn-info")){
        // console.log(carrito[e.target.dataset.id]);
        // carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] = {...producto};
        pintarCarrito()
    };
    // accion de disminuir
    if(e.target.classList.contains("btn-danger")){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;
        
        producto.cantidad === 0 && delete carrito[e.target.dataset.id];
        // if(producto.cantidad === 0){
        //     delete carrito[e.target.dataset.id]
        // };
        pintarCarrito()
    };

    e.stopPropagation();
}

// API MERCADO PAGO:

// const finalizar = document.querySelector(".pagar");
// finalizar.addEventListener("click", ()=>{
//     pagar()
// })

// const pagar = async () =>{
//     const productosMap = Object.values(carrito).map(element =>{
//         let nuevoElemento = 
//         {
//            title: element.title,
//            description: element.descripcion,
//            picture_url: element.img,
//            category_id: element.id,
//            quantity: element.cantidad,
//            currency_id: "ARS",
//            unit_price: element.precio
//         }
//         return nuevoElemento
//     })

//     let response = await fetch('https://api.mercadopago.com/checkout/preferences', {

//        method: "POST",
//        headers: {
//         Authorization: "Bearer TEST-2415153398066479-052719-b115e83753fdb7d1100912530c7ac480-60191006"
//        },
//        body: JSON.stringify({
//            items: productosMap
//        })

//     })
//     let datas = await response.json()
//     console.log(datas);
//     window.open(datas.init_point, "_blank")
    
// }

/*
curl -X POST \
    'https://api.mercadopago.com/checkout/preferences' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
    -H 'Content-Type: application/json' \
    -d '{
  "items": [
    {
      "title": "Dummy Title",
      "description": "Dummy description",
      "picture_url": "http://www.myapp.com/myimage.jpg",
      "category_id": "car_electronics",
      "quantity": 1,
      "currency_id": "U$",
      "unit_price": 10
    }
  ],
  "payer": {
    "phone": {},
    "identification": {},
    "address": {}
  },
  "payment_methods": {
    "excluded_payment_methods": [
      {}
    ],
    "excluded_payment_types": [
      {}
    ]
  },
  "shipments": {
    "free_methods": [
      {}
    ],
    "receiver_address": {}
  },
  "back_urls": {},
  "differential_pricing": {},
  "tracks": [
    {
      "type": "google_ad"
    }
  ],
  "metadata": {}
}'
*/