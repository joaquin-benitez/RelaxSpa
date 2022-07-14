let nombreServicio1 = "MasajeEspalda"
let precioServicio1 = 1400
let stockServicio1 = 10

let nombreServicio2 = "MasajePiernas"
let precioServicio2 = 1200
let stockServicio2 = 10

let cantidadCompras = prompt("Ingrese la cantidad de servicios distintos que desea comprar:\n- MasajeEspalda\n- MasajePiernas");
let precioTotal = 0;


for (let i = 0; i < cantidadCompras; i++){
    let compra1 = prompt("Ingrese el nombre del servicio que desea comprar: \n- MasajeEspalda\n- MasajePiernas");
    let cantidad1 = prompt("Ingrese la cantidad de servicios que quiere comprar");

    if( compra1 === "MasajeEspalda"){
        if(stockServicio1 >= cantidad1){
            precioTotal += cantidad1 * precioServicio1
            alert("El precio total es de: $" +  (cantidad1 * precioServicio1))
        }
        else {
            alert("No es posible brindarle tantos servicio, selecione una cantidad menor")
        }
    }
    else if( compra1 === "MasajePiernas"){
        if(stockServicio1 >= cantidad1){
            precioTotal += cantidad1 * precioServicio2
            alert("El precio total es de: $" +  (cantidad1 * precioServicio2))
        }
        else {
            alert("No es posible brindarle tantos servicio, selecione una cantidad menor")
        }
    }
    else{
        alert("no disponemos ese servicio")
    }
}
if(cantidadCompras>=1){
    alert("Adquiriste servicios por: $" + precioTotal);
}