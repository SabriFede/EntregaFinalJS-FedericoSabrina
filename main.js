
class Producto {
    constructor(id, nombre, precio, img, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.categoria = categoria;
        this.cantidad = 1;
    }
}

const remera = new Producto(1, "Remera", 2500, "img/remera.jpg", "Mujer");
const pantalon = new Producto(2, "Pantalon", 3000, "img/pantalon.jpg", "Hombre");
const sweater = new Producto(3, "Sweater", 4000, "img/sweater.jpg", "Niños");
const pijama = new Producto(4, "Pijama", 1500, "img/pijama.jpg", "Bebes");
const camperaFrancia = new Producto (5, "Campera Azul Francia", 10000, "img/camperaFrancia.jpg", "Niños");
const camperaGris = new Producto (6, "Campera Gris", 12000, "img/camperaGris.jpg", "Niños");
const camperaMarino = new Producto (7, "Campera Azul Marino", 12000, "img/camperaMarino.jpg", "Niños");
const camperaNegra = new Producto (8, "Campera Negra", 10000, "img/camperaNegra.jpg", "Niños");


const productos = [remera, pantalon, sweater, pijama, camperaFrancia, camperaGris, camperaMarino, camperaNegra];


let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                            <div class="card">
                            <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
                            <div class="card-body">
                                <h3>${producto.nombre}</h3>
                                <p>${producto.precio}</p>
                                <button class="btn colorBoton" id="boton${producto.id}"> Agregar al carrito </button>
                            </div>
                        </div>`
        contenedorProductos.appendChild(card);
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })

}

mostrarProductos();

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}


const verCarrito = document.getElementById("verCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                            <div class="card">
                            <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
                            <div class="card-body">
                                <h3>${producto.nombre}</h3>
                                <p>${producto.precio}</p>
                                <p>${producto.cantidad}</p>
                                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                            </div>
                        </div>`
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    let indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})


const eliminarTodoElCarrito = () => {
    carrito = [];
    localStorage.clear();
    mostrarCarrito();
}


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $ ${totalCompra}`;
}




 