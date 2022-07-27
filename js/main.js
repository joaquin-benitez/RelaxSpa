function servicio(nombre, precio, stock){
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
    
  }
  
  const servicio1 = new servicio("MasajeEspalda", 1400, 10)
  const servicio2 = new servicio("MasajePiernas", 1200, 10)
  const servicio3 = new servicio("MasajeCara", 1400, 10)
  const servicio4 = new servicio("MasajePiedras", 1000, 10)
  

let listaServicios = [servicio1, servicio2, servicio3, servicio4]
let nombresServicios = listaServicios.map((servicio) => servicio.nombre)
let cantidadCompras = prompt("Ingrese la cantidad de servicios distintos que desea comprar:\n " + nombresServicios.join("\n "))

let precioTotal = 0;

function calculoPrecio(cantidad, precio){
    precioTotal += cantidad * precio
}

function calculoStock(cantidad, servicio){
    if(servicio.stock >= cantidad){
        calculoPrecio(cantidad, servicio.precio)
        alert("El precio total es de: $" + (cantidad * servicio.precio))
    }
    else{
        alert("No es posible brindarle tantos servicio, selecione una cantidad menor")
    }
}

for(let i = 0; i < cantidadCompras; i++){
    let compra1 = prompt("Ingrese el nombre del servicio que quiere comprar:\n " + nombresServicios.join("\n ")).toLowerCase()
    let cantidad1 = prompt("ingrese la cantidad del servicios que quiere comprar:");
    if(compra1 == servicio1.nombre.toLowerCase()){
        calculoStock(cantidad1, servicio1)
    }
    else if(compra1 == servicio2.nombre.toLowerCase()){
        calculoStock(cantidad1, servicio2)
    }
    else if(compra1 == servicio3.nombre.toLowerCase()){
        calculoStock(cantidad1, servicio3)
    }
    else if(compra1 == servicio4.nombre.toLowerCase()){
        calculoStock(cantidad1, servicio4)
    }

    else{
    alert("No tenemos ese servicio")
    }
}

switch(true){
    case precioTotal < 3000 && precioTotal > 1000:
        precioTotal = precioTotal * 0.95
        alert("Recibiste un descuento del 5% por tu compra")
        break;
    case precioTotal >= 3000 && precioTotal <6000:
        precioTotal = precioTotal * 0.90
        alert("Recibiste un descuento del 10% por tu compra")
        break;
    case precioTotal >= 6000:
        alert("Recibiste un descuento del 30% por tu compra")
        precioTotal = precioTotal * 0.70
        break;
    default:
        console.log(precioTotal)
        alert("No ingresaste un precio en numeros");
        break;
}


alert("Este es el precio total final de tu compra: $" + precioTotal) 
