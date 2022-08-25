const cotdolar = async () => {
    const response = fetch("https://api.estadisticasbcra.com/usd_of_minorista", {
        headers:{
            Authorization:
            "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI5OTg5MTIsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJqb2FxdWluY2RlbHVAZ21haWwuY29tIn0.kViEpmCZ_3_TFI0_s28zdLo-1CN6dNuAiJ03A8RvCkh6oM7SMhLoJfM4fQxMF93emTxqcEpja_z1ziYRTDPmnw"
        },
    })
    const data = response.json();
    console.log(data);
}
console.log("hola");
console.log(cotdolar);

const cotdolar2 = async () => {
    const response = await fetch("dolar.json")
    const data = await response.json();

    const tipo = document.getElementById("dolar");
    tipo.innerHTML = `
    <h3>Tipo de Cambio : ${data.blue}</h3>
    `
    
    
}

console.log(cotdolar2);

let url = 'https://jsonplaceholder.typicode.com/users/';
        fetch(url)
            .then( response => response.json() )
            .then( data => mostrarData(data) )
            .catch( error => console.log(error) )

        const mostrarData = (data) => {
            console.log(data)
            let body = ""
            for (var i = 0; i < data.length; i++) {      
               body+=`<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].email}</td></tr>`
            }
            document.getElementById('data').innerHTML = body
            //console.log(body)
        }