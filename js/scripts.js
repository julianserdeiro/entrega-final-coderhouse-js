/*!
* Start Bootstrap - Freelancer v7.0.5 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//-----------------------------------------------------------------------------------------------------------------------------------

const productos = [
    {id:1, nombre: 'Interpretación básica', descripcion: 'Interpretación de sol + luna + ascendente', imagen: '/img/Astrologia/primera.jpg', precio: 800},
    {id:2, nombre: 'Interpretación total', descripcion: 'Interpretación de sol + luna + ascendente con análisis de elementos, modalidades y polaridades', imagen: '/img/Astrologia/segunda.jpg', precio: 1200},
    {id:3, nombre: 'Carta natal básica', descripcion: 'Análisis de la carta natal con aspectos mayores', imagen: '/img/Astrologia/tercera.jpg', precio: 1900},
    {id:4, nombre: 'Carta natal media', descripcion: 'Análisis de la carta natal con aspectos mayores y configuraciones planetarias', imagen: '/img/Astrologia/cuarta.jpg', precio: 2300},
]

function guardarProductosLS(productos){
    localStorage.setItem('productos', JSON.stringify(productos))
}

function cargarProductosLS(){
    return JSON.parse(localStorage.getItem('productos')) || []
}

function guardarProductosCarrito(productos){
    localStorage.setItem('productos_carrito', JSON.stringify(productos))
}

function cargarProductosCarrito(){
    return JSON.parse(localStorage.getItem('productos_carrito')) || []
}

function buscarProducto(id){
    const productos = cargarProductosLS()
    return productos.find(item => item.id === id)
}

function agregarProducto(id){
    const productos_carrito = cargarProductosCarrito()
    let pos = productos_carrito.findIndex(item => item.id === id)

    if(pos > -1){
        productos_carrito[pos].cantidad += 1
    }else{
        const producto = buscarProducto(id)
        producto.cantidad = 1
        productos_carrito.push(producto)
    }

    guardarProductosCarrito(productos_carrito)
    actualizarBotonCarrito()

}

function eliminarProducto(id){
    const productos_carrito = cargarProductosCarrito()
    let pos = productos_carrito.findIndex(item => item.id === id)
    productos_carrito[pos].cantidad -= 1

    if(productos_carrito[pos].cantidad == 0){
        productos_carrito.splice(pos, 1)
    }

    guardarProductosCarrito(productos_carrito)
    renderProductosCarrito()
    actualizarBotonCarrito()

}

function agregarItem(id){
    agregarProducto(id)
    renderProductosCarrito()
}

function eliminarItem(id){
    eliminarProducto(id)
    renderProductosCarrito()
}

function actualizarBotonCarrito(){
    let contenido = `<button type="button" class="btn btn-primary position-relative">
                        <img src="/img/png/cart.png" alt="Carrito" width="24">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${totalProductos()}</span>
                    </button>`
    document.getElementById('boton_carrito').innerHTML = contenido
}

function vaciarCarrito(){
    localStorage.removeItem("productos_carrito")
    renderProductosCarrito()
    actualizarBotonCarrito()
}

function totalProductos(){
    const productos_carrito = cargarProductosCarrito()
    
    return productos_carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0)
}

function totalAPagar(){
    const productos_carrito = cargarProductosCarrito()
    
    return productos_carrito.reduce((acumulador, item) => acumulador + item.cantidad * item.precio, 0)
}


guardarProductosLS(productos)