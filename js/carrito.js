window.onload = function(){
    /***** AJAX CON JQUERY *****/
    $.ajax({
        url: 'js/productos.json',
        success: function (data) {
            console.log("La base de datos se cargo con éxito")
            baseDeDatos= data;
            baseDeDatosFiltrada = baseDeDatos.filter(itemSection => itemSection['section'] == paginaActual);
            cargarStorage(data);
            definirPagina(data);
            renderizarProductos(data);
            renderizarItemsModals(data);
            renderizarCarrito(data);
        },
        error: function () {
            console.log("Error en carga de la base de datos")
        }
    });
};
 
/***** VARIABLES Y SELECTORES *****/   
let paginaActual = definirPagina(window.location.pathname);
let carrito = [];
let total = 0;
let shipping = 1500;

let $carrito = document.querySelector('#carrito');
let $total = document.querySelector('#total');
let $gallery = document.querySelector('#gallery');
let $modals = document.querySelector('#products-modals');
let $botonVaciar = document.querySelector('#boton-vaciar');
let $botonConfirmarCompra = document.querySelector('#confirmar-compra');
let $cantProductos = document.querySelector('.cantidad-productos');
let $listadoPrecios = document.querySelector('#listado-precios');
let $shipping = document.querySelector('#shipping');
let $weacept = document.querySelector('#weacept');
let $payment = document.querySelector('#payment');
let $discount = document.querySelector('#discount');
let $purchaseDelay = document.querySelector('#purchase-delay');

/***** LISTENERS *****/
$botonVaciar.addEventListener('click', vaciarCarrito);
$botonConfirmarCompra.addEventListener('click', confirmarCompra);

/***** FUNCIONES *****/
/** Funciones que aportan Funcionalidad **/
function agregarUnidadCarrito() {
    let item = this.getAttribute('marcador');
    let contador = 0;
    for (i = 0; i < carrito.length; i++ ) {
        carrito[i] == item ? contador++ : null ; 
    };
    // Antes de agregar, analizamos si hay stock del producto
    if (contador < this.getAttribute('stock')) {
        // Aniadimos el Nodo a nuestro carrito
        carrito.push(item)
        // Calculo del envio
        shippingPrice();
        // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();
        // Imprimimos en consola los ID de los productos del carrito
        console.log(carrito);
    } else {
        alert('No hay mas stock del producto');
    } 
};             
function quitarUnidadCarrito() {
    let item = this.getAttribute('marcador');
    let itemPosition = carrito.indexOf(item);
    if (itemPosition > -1) {
        // Quitamos el nodo a nuesto carrito
        carrito.splice(itemPosition, 1);
        // Calculo el total
        calcularTotal();
        // Calculo del envio
        shippingPrice();
        // Renderizamos el carrito 
        renderizarCarrito();
        // Imprimimos en consola los ID de los productos del carrito
        console.log(carrito);
    } 
};      
function borrarItemCarrito() {
    // Obtenemos el producto ID que hay en el boton pulsado
    let id = this.getAttribute('marcador');
    // Borramos todos los productos
    carrito = carrito.filter(function (carritoId) {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Calculamos de nuevo el precio e imprimos en consola
    console.log(carrito);
}                                                                              
function vaciarCarrito() {
    if(confirm('¿Está seguro que desea vaciar el carrito?')) {
        carrito = [];
        console.log(carrito);
    }
    // Renderizamos los cambios
    renderizarCarrito();
};
function cantidadProductos() {
    cantProductos = carrito.length;
    if(cantProductos == 0) {
        $cantProductos.classList.add('text-muted');
        localStorage.clear();
    } else {
        $cantProductos.classList.remove('text-muted');
    }
    $cantProductos.textContent = `${cantProductos}`;
};
function shippingPrice() {
    // Compras mayores a $15000, envio gratis
    total > 15000 ? shipping = 0 : shipping = 1500;
    
    let cartModalShippingPrice = document.createElement('li');
    cartModalShippingPrice.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-0', 'px-0', 'pb-0');
    cartModalShippingPrice.innerHTML = `1 x Envío a domicilio <span> $ ${Intl.NumberFormat(032).format(shipping)}</span>`;
    $listadoPrecios.appendChild(cartModalShippingPrice);
}
function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    for (let item of carrito) {
        // De cada elemento obtenemos su precio
        let miItem = baseDeDatos.filter(function(itemBaseDatos) {
            return itemBaseDatos['id'] == item;
        });
        total = total + miItem[0]['price']
    }
    
    // Renderizamos el precio en el HTML
    let totalPrice = document.createElement('li');
    totalPrice.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-bottom-0', 'border-right-0', 'border-left-0', 'px-0', 'mb-3');
    totalPrice.innerHTML = `
        <p class="mb-0"><strong>PRECIO TOTAL </strong><small>(IVA incluido)</small></p>
        <span><strong>$ ${Intl.NumberFormat(032).format(total)}</strong></span>`;
    $listadoPrecios.appendChild(totalPrice);
};
function confirmarCompra(){
    alert('¡Gracias por tu compra!')
};
function limpiarCarrito () {
    $carrito.textContent = '';
}
function limpiarListadoPrecios () {
    $listadoPrecios.innerHTML = '';
}
function mostrarDivs() {
    $purchaseDelay.classList.remove('d-none');
    $shipping.classList.remove('d-none');
    $payment.classList.remove('d-none'); 
    $discount.classList.remove('d-none'); 
};
function ocultDivs() {
    $purchaseDelay.classList.add('d-none');
    $shipping.classList.add('d-none'); 
    $payment.classList.add('d-none'); 
    $discount.classList.add('d-none'); 
};
function guardarStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};
function cargarStorage() {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito == null ? carrito = [] : null;
};
function definirPagina() {
    if (window.location.pathname == '/index.html') {
        let pagina = 'index'
        return pagina;
    } else if (window.location.pathname == '/productos.html'){
        let pagina = 'productos';
        return pagina;
} }

/** Funciones de Renderizado **/

function renderizarProductos() {
    for (const datosProducto of baseDeDatosFiltrada) {
        // Estructura
        const card = document.createElement('div');
        card.classList.add('card', datosProducto['subcategory'], 'col-lg-3', 'col-md-4', 'col-sm-6', 'col-12');
        // Imagen
        const cardImagen = document.createElement('img');
        cardImagen.classList.add('card-img-top');
        cardImagen.setAttribute('src', datosProducto['image']);
        // Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Titulo
        const cardTitulo = document.createElement('p');
        cardTitulo.classList.add('card-title');
        cardTitulo.textContent = `${datosProducto['brand'].toUpperCase()} ${datosProducto['name']}`;
        // Precio
        const cardPrecio = document.createElement('p');
        cardPrecio.classList.add('card-price');
        const precioFormateado = Intl.NumberFormat(032).format(datosProducto['price']);
        cardPrecio.textContent = `$ ${precioFormateado}`;
        // Boton Info
        const cardInfoBoton = document.createElement('button');
        cardInfoBoton.setAttribute('type', 'button');
        cardInfoBoton.classList.add('btn', 'btn-secondary');
        cardInfoBoton.setAttribute('data-toggle', 'modal');
        cardInfoBoton.setAttribute('data-target', `#modal${datosProducto['id']}`);
        cardInfoBoton.textContent = 'Mas Informacion';
        // Boton Agregar al Carrito
        const cardAgregarBoton = document.createElement('button');
        cardAgregarBoton.classList.add('btn', 'btn-primary', 'mt-1');
        cardAgregarBoton.setAttribute('marcador', datosProducto['id']);
        cardAgregarBoton.setAttribute('stock', datosProducto['stock']);
        cardAgregarBoton.textContent = 'Agregar al Carrito ';
        cardAgregarBoton.addEventListener('click', agregarUnidadCarrito);
        // Simbolo Carrito Font Awesome 
        const fontAwesomeCart = document.createElement('i');
        fontAwesomeCart.classList.add('fas', 'fa-cart-plus');
        // Insertamos
        $gallery.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(cardImagen);
        cardBody.appendChild(cardTitulo);
        cardBody.appendChild(cardPrecio);
        cardBody.appendChild(cardInfoBoton);
        cardBody.appendChild(cardAgregarBoton);
        cardAgregarBoton.appendChild(fontAwesomeCart);
    };
};

function renderizarItemsModals() {
    for (const datosProducto of baseDeDatosFiltrada) {
        // Estructura Modal 
        const itemModal = document.createElement('div');
        itemModal.id = `modal${datosProducto['id']}`;
        itemModal.classList.add('modal', 'fade');
        itemModal.setAttribute('tabindex', '-1');
        itemModal.setAttribute('role','dialog');
        itemModal.setAttribute('aria-labelledby','myHugeModalLabel');
        itemModal.setAttribute('aria-hidden', 'true');
        // Modal Dialog
        const itemModalDialog = document.createElement('div');
        itemModalDialog.classList.add('modal-dialog','modal-xl');
        // Modal Content
        const itemModalContent = document.createElement('div');
        itemModalContent.classList.add('modal-content');
        // Modal Container
        const itemModalContainer = document.createElement('div');
        itemModalContainer.classList.add('container');
        // Modal Row
        const itemModalRow = document.createElement('div');
        itemModalRow.classList.add('row');
        // Modal Responsive Left
        const itemModalResponsiveLeft = document.createElement('div');
        itemModalResponsiveLeft.classList.add('col-12', 'col-lg-6', 'p-4');
        // Modal Image
        const itemModalImage = document.createElement('img');
        itemModalImage.classList.add('w-100');
        itemModalImage.setAttribute('src', datosProducto['imagelg']);
        // Modal Responsive Right
        const itemModalResponsiveRight = document.createElement('div');
        itemModalResponsiveRight.classList.add( 'd-flex', 'flex-column', 'col-12', 'col-lg-6', 'p-4');
        // Modal Title
        const itemModalTitle = document.createElement('h3');
        itemModalTitle.classList.add('text-center');
        itemModalTitle.textContent = `${datosProducto['brand'].toUpperCase()} ${datosProducto['name']}`;
        // Modal Body
        const itemModalBody = document.createElement('div');
        itemModalBody.classList.add('description');
        
        // Modal Description <p>
            const itemModalDescription = document.createElement('p');
            itemModalDescription.textContent = `${datosProducto['description']}`;
            // Titulo Caracteristicas Principales
            const itemPrincipalCarTitle = document.createElement('h5');
            itemPrincipalCarTitle.textContent = 'Características Principales';
            // Lista de Caracterìsticas
            const itemListCar = document.createElement('ul');
            const itemListCarIl = document.createElement('li');
            // Botones
            const itemModalButtonsDiv = document.createElement('div');
            itemModalButtonsDiv.classList.add('container', 'd-flex', 'align-items-end','flex-grow-1');
            const itemModalButtonsContainer = document.createElement('div');
            itemModalButtonsContainer.classList.add('container');
            const itemModalButtons = document.createElement('div');
            itemModalButtons.classList.add('row', 'align-content-end', 'justify-content-center');
            // Boton Agregar al Carrito
            const itemModalAgregarBoton = document.createElement('button');
            itemModalAgregarBoton.classList.add('btn', 'btn-primary', 'm-2', 'col-12', 'col-xl-5', 'agregar-boton');
            itemModalAgregarBoton.setAttribute('marcador', datosProducto['id']);
            itemModalAgregarBoton.setAttribute('stock', datosProducto['stock']);
            itemModalAgregarBoton.textContent = 'Agregar al Carrito ';
            itemModalAgregarBoton.addEventListener('click', agregarUnidadCarrito);
            // Simbolo Carrito Font Awesome 
            const fontAwesomeCart = document.createElement('i');
            fontAwesomeCart.classList.add('fas', 'fa-cart-plus');
            // Boton Cerrar Modal
            const itemModalCerrarBoton = document.createElement('button');
            itemModalCerrarBoton.classList.add('btn', 'btn-secondary', 'm-2', 'col-12', 'col-xl-5');
            itemModalCerrarBoton.setAttribute('data-dismiss', 'modal');
            itemModalCerrarBoton.textContent = 'Cerrar Ventana';
            // Renderizamos Modal
            $modals.appendChild(itemModal);
            itemModal.appendChild(itemModalDialog);
            itemModalDialog.appendChild(itemModalContent);
            itemModalContent.appendChild(itemModalContainer);
            itemModalContainer.appendChild(itemModalRow);
            itemModalRow.appendChild(itemModalResponsiveLeft);
            itemModalResponsiveLeft.appendChild(itemModalImage);
            itemModalRow.appendChild(itemModalResponsiveRight);
            itemModalResponsiveRight.appendChild(itemModalTitle);
            itemModalResponsiveRight.appendChild(itemModalBody);
            itemModalBody.appendChild(itemModalDescription);
            itemModalBody.appendChild(itemPrincipalCarTitle);
            itemModalBody.appendChild(itemListCar);
            datosProducto.list.forEach(elem =>  {
                let itemListCarLi = document.createElement('li');
                itemListCarLi.textContent = elem;
                itemListCar.appendChild(itemListCarLi)
            });
            itemModalResponsiveRight.appendChild(itemModalButtonsDiv);
            itemModalButtonsDiv.appendChild(itemModalButtonsContainer);
            itemModalButtonsContainer.appendChild(itemModalButtons);
            itemModalButtons.appendChild(itemModalAgregarBoton);
            itemModalAgregarBoton.appendChild(fontAwesomeCart);
            itemModalButtons.appendChild(itemModalCerrarBoton);
        }      
    }                  
function renderizarCarrito() {
    // Vaciamos todo el html
    limpiarCarrito();
    limpiarListadoPrecios();
    //Cantidad de Productos
    cantidadProductos();
    // Quitamos los duplicados
    let carritoSinDuplicados = [...new Set(carrito)];
    if (carrito.length !== 0) { 
        // Mostramos divs ocultos
        mostrarDivs();
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach(function (item, indice) {
            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = baseDeDatos.filter(itemBaseDatos => itemBaseDatos['id'] == item);
            console.log(`Producto ${miItem[0]['brand']} ${miItem[0]['name']} (ID: ${miItem[0]['id']})`);
            // Cuenta el número de veces que se repite el producto
            let numeroUnidadesItem = carrito.reduce(((total, itemId) => itemId === item ? total += 1 : total), 0);
            console.log(`Cantidad: ${numeroUnidadesItem}`);           
            /** Armado del HTML del Cart **/
            // Creamos Div Row para cada Item del carrito
            let cartModalRow = document.createElement('div');
            cartModalRow.classList.add('row', 'mb-5');         
            // Imagen del Cart
            let cartModalImage = document.createElement('div');
            cartModalImage.classList.add('col-md-5', 'col-lg-3', 'col-xl-3');
            cartModalImage.innerHTML = `
                <div id = "cart-product-image" class=>
                    <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                        <img class="img-fluid w-100" src= ${miItem[0]['image']} alt='${miItem[0]['brand']} ${miItem[0]['name']}'>
                    </div>
                </div>
            `          
            let cartModalItemAttributes = document.createElement('div');
            cartModalItemAttributes.classList.add('col-md-7', 'col-lg-9', 'col-xl-9');
            let cartModalItemAttributesDiv = document.createElement('div');
            cartModalItemAttributesDiv.classList.add('d-flex', 'justify-content-between');      
            let cartModalItemDescription = document.createElement('div');
            cartModalItemDescription.innerHTML = `
                    <h4>${miItem[0]['brand'].toUpperCase()}</h4>
                    <h5 class='mt-1 mb-0'>${miItem[0]['name']}</h5>
                    <p class="mt-2 mb-0 text-muted text-uppercase small">Codigo Art: ${miItem[0]['id']}</p>
                    <p class="mt-2 mb-0 text-muted text-uppercase small">Tipo: ${miItem[0]['subcategory']}</p>
            `
            let cartModalItemQuantity = document.createElement('div');  
            let cartModalItemInputDiv = document.createElement('div');
            cartModalItemInputDiv.classList.add('def-number-input', 'number-input', 'mb-0', 'w-100', 'justify-content-center', 'align-content-start',)
            let cartModalItemInputDiv2 = document.createElement('div');
            cartModalItemInputDiv2.classList.add('d-flex');
            let cartModalItemInputDiv3 = document.createElement('div');
            let cartModalItemInputMinusButton = document.createElement('btn');
            cartModalItemInputMinusButton.classList.add('btn', 'btn-primary', 'mt-0', 'quantity-button');
            cartModalItemInputMinusButton.textContent ='-';
            cartModalItemInputMinusButton.setAttribute('marcador', `${miItem[0]['id']}`);
            cartModalItemInputMinusButton.setAttribute('stock', `${miItem[0]['stock']}`);
            cartModalItemInputMinusButton.addEventListener('click', quitarUnidadCarrito);
            let cartModalItemInputField = document.createElement('input');
            cartModalItemInputField.readOnly = true;
            cartModalItemInputField.type = 'number';
            cartModalItemInputField.classList.add('mx-1', 'mt-0', 'quantity-input');
            cartModalItemInputField.min = 1;
            cartModalItemInputField.name = 'quantity';
            cartModalItemInputField.value = `${numeroUnidadesItem}`;
            let cartModalItemInputPlusButton = document.createElement('btn');
            cartModalItemInputPlusButton.classList.add('btn', 'btn-primary', 'mt-0', 'quantity-button', 'agregar-unidad');
            cartModalItemInputPlusButton.textContent = '+';
            cartModalItemInputPlusButton.setAttribute('marcador', `${miItem[0]['id']}`);
            cartModalItemInputPlusButton.setAttribute('stock', `${miItem[0]['stock']}`);
            cartModalItemInputPlusButton.addEventListener('click', agregarUnidadCarrito);
            let cartModalItemStock = document.createElement('small');
            cartModalItemStock.classList.add('form-text', 'text-muted', 'text-center');
            cartModalItemStock.textContent = `(Stock, ${miItem[0]['stock']} unidades)`
            let cartModalItemFooter = document.createElement('div');
            cartModalItemFooter.classList.add('d-flex', 'mt-2', 'justify-content-between', 'align-items-center')
            let cartModalItemDeleteItem = document.createElement('a');
            cartModalItemDeleteItem.type = 'button';
            cartModalItemDeleteItem.href = '#!';
            cartModalItemDeleteItem.classList.add('card-link-secondary', 'small', 'text-uppercase', 'text-decoration-none', 'mr-3');
            cartModalItemDeleteItem.setAttribute('marcador', `${miItem[0]['id']}`);
            cartModalItemDeleteItem.innerHTML = `<i class="fas fa-trash-alt mt-2 mr-1"></i> Eliminar item`;
            cartModalItemDeleteItem.addEventListener('click', borrarItemCarrito); 
            let cartModalItemSubtotal = document.createElement('p');
            cartModalItemSubtotal.classList.add('mb-0');
            cartModalItemSubtotal.innerHTML = `<span><strong>Subtotal: $ ${Intl.NumberFormat(032).format(miItem[0]['price']*numeroUnidadesItem)}</strong></span>`;
            let cartModalPriceList = document.createElement('li');
            cartModalPriceList.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-0', 'px-0', 'pb-0');
            cartModalPriceList.innerHTML = `${numeroUnidadesItem} x ${miItem[0]['brand']} ${miItem[0]['name']} <span>$ ${Intl.NumberFormat(032).format(miItem[0]['price']*numeroUnidadesItem)}</span>`;
            // Mezclamos nodos
            $carrito.appendChild(cartModalRow);
            cartModalRow.appendChild(cartModalImage);
            cartModalRow.appendChild(cartModalItemAttributes);
            cartModalItemAttributes.appendChild(cartModalItemAttributesDiv);
            cartModalItemAttributesDiv.appendChild(cartModalItemDescription);
            cartModalItemAttributesDiv.appendChild(cartModalItemQuantity); //OK
            cartModalItemQuantity.appendChild(cartModalItemInputDiv); 
            cartModalItemInputDiv.appendChild(cartModalItemInputDiv2); 
            cartModalItemInputDiv2.appendChild(cartModalItemInputMinusButton);
            cartModalItemInputDiv2.appendChild(cartModalItemInputField);
            cartModalItemInputDiv2.appendChild(cartModalItemInputPlusButton); 
            cartModalItemInputDiv.appendChild(cartModalItemInputDiv3);
            cartModalItemInputDiv3.appendChild(cartModalItemStock);
            cartModalItemAttributes.appendChild(cartModalItemFooter);
            cartModalItemFooter.appendChild(cartModalItemDeleteItem);
            cartModalItemFooter.appendChild(cartModalItemSubtotal);
            $listadoPrecios.appendChild(cartModalPriceList);
        });
        // Guardamos en localStorage
        guardarStorage();
        // Calculamos el costo de envio
        shippingPrice();
        // Calculamos el total
        calcularTotal();
    } else {
        $carrito.innerHTML = `
        <p> No hay productos en el carrito </p>
        `;
        ocultDivs();
    };
};



