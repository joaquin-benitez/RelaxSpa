document.addEventListener('DOMContentLoaded', () => {
    let carrito = [];
    const DOMitems = document.getElementById('items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonComprar = document.querySelector('#boton-comprar');

    const listaDeProductos = [
        {
            id: 1,
            nombre: "Masaje de Cutis",
            precio: 1000,
            img:'ImgSpa/cutis.jpg'
        },
        {
            id: 2,
            nombre: "Masaje con piedras",
            precio: 1400,
            img:'ImgSpa/piedras.jpg'
        },
        {
            id: 3,
            nombre: "Masaje Espalda",
            precio: 1200,
            img:'ImgSpa/espalda.jpg'
        },
        {
            id: 4,
            nombre: "Masaje de Pies",
            precio: 1300,
            img:'ImgSpa/pies.jpg'
        },
        {
            id: 5,
            nombre: "Masaje de Piernas",
            precio: 1200,
            img:'ImgSpa/piernas.jpg'
        },
        {
            id: 6,
            nombre: "Cuerpo Completo",
            precio: 2000,
            img:'ImgSpa/masaje.jpg'
        },
        {
            id: 7,
            nombre: "Masaje con pindas",
            precio: 1000,
            img:'ImgSpa/pindas.jpg'
        },
        {
            id: 8,
            nombre: "Fangoterapia",
            precio: 1250,
            img:'ImgSpa/fango.jpg'
        },
        {
            id: 9,
            nombre: "Masaje Exfoliante",
            precio: 1500,
            img:'ImgSpa/espalda-exfoliante.webp'
        },
        {
            id: 10,
            nombre: "Ventosas",
            precio: 1250,
            img:'ImgSpa/ventosas.jpg'
        }
        
    ]
    
    function renderizarProductos() {
        listaDeProductos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.innerText = info.nombre;
              // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('imagen');
            miNodoImagen.setAttribute('src', info.img);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.innerText = `${info.precio}`;
            miNodoPrecio.innerText = `$${info.precio}`;
    
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.innerText = 'Agregar al carrito';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.append(miNodoImagen);
            miNodoCardBody.append(miNodoTitle);
            miNodoCardBody.append(miNodoPrecio);
            
            miNodoCardBody.append(miNodoBoton);
            miNodo.append(miNodoCardBody);
            DOMitems.append(miNodo);
        });
    }
    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(e) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(e.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }
    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.innerText = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = listaDeProductos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.innerText = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.innerText = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.innerText = calcularTotal();
    }
    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(e) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = e.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }
    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = listaDeProductos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }
    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.removeItem('carrito');
    }
    function guardarCarritoEnLocalStorage () {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (localStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }
    }
    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();

    DOMbotonComprar.addEventListener('click', vaciarCarrito);
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();

    DOMbotonComprar.addEventListener('click', ()=>
    Swal.fire({
        title:"Muchas Gracias",
        text:"¿Desea finalizar su compra?",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
    }).then((resultado)=> {
        if(resultado.isConfirmed) {
        Swal.fire({
            title:"Felicidades",
            text:"Para confirmar tu turno comunicate a nuestro correo RelaxSpa@gmail.com",
            confirmButtontext: "OK",
            icon:"success",
        })
        } 
    })
    );



    const miNodoBoton =document.getElementsByClassName("btn-primary")
    for (const elemento of miNodoBoton) {
        elemento.addEventListener('click', ()=>
        Toastify({
            text:"Agregaste un masaje al carrito",
            duration:3000,
            gravity:"top",
            position:"right",
            className: 'btn-tostify',
        }).showToast(),
        );
    }



});