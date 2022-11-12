function renderProductosCarrito(){
    const productos = cargarProductosCarrito()
    let contenido = ''

    if(productos.length == 0){
        contenido = `<div class="alert alert-secondary text-center" role="alert">
                        No se encontraron productos en el carrito
                    </div>`
    }else{
        contenido += `<table class='table'>
        <tr>
        <td class='text-end' colspan='6'><a href="#" class = "btn btn-warning" title='Vaciar carrito' onclick='vaciarCarrito()'>Vaciar carrito</a></td>
        </tr>`
        productos.forEach((producto) => {
            contenido += `<tr>
            <td><img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" width="48"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td><a href="#" class = "btn btn-warning rounded-circle" title='Eliminar item' onclick='eliminarItem(${producto.id})'>-</a> ${producto.cantidad} <a href="#" class = "btn btn-warning rounded-circle" title='agregar item' onclick='agregarItem(${producto.id})'>+</a></td>
            <td>$${producto.precio * producto.cantidad}</td>
            <td><a href='#' class= "btn btn-warning" onclick='eliminarProducto(${producto.id})'><img src="../img/png/trash.png" alt="Eliminar" width="24"></a></td>
            </tr>`;
        });

        contenido += `<tr>
        <td colspan='4'>Total a pagar:</td>
        <td><b>$${totalAPagar()}</b></td>
        <td>&nbsp;</td>
        </tr>
        <tr>
        <td class='text-end' colspan='5'><a href="#" class = "btn btn-success" onclick='finalizarCompra()' title='Finalizar compra'>Finalizar compra</a></td>
        <td>&nbsp;</td>
        </tr>
        </table>`
    }
    
    document.getElementById('productos').innerHTML = contenido

};

function finalizarCompra(){
    swal("¡Gracias por tu compra!", "En breve me pondré en contacto contigo", "success");
}

renderProductosCarrito()
actualizarBotonCarrito()