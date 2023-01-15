//se asegura de cargar la pagina para luego llamar a la funcion que llena el select.
window.addEventListener('load', function() {
    addOptionsMensajeros();   
}); 

function addOptionsMensajeros(idmensajero){
    const mensajero = ["Antonio Salas", "Andres Mejía" , "Ana Maria Velez", "Carlos Muñoz", "Fabio Carmona","Diana Barco"];
    let select = document.getElementById('idmensajero');

    for(i=1;i<=mensajero.length;i++){
        select.options[i] = new Option(mensajero[i-1]);
    }
}

let formulario = document.getElementById('formularioasigna');

formulario.addEventListener('submit',function(e){
    e.preventDefault();

    let data = new FormData(formulario);

    fetch('validacion.php',{
        method: 'POST',
        body: data
    })
        .then( res => res.json())
        .then( data => {
            if(data === 'proccess'){
                Swal.fire({
                    title: 'Quieres asignar esta guia?',
                    showDenyButton: true,
                    confirmButtonText: 'Si',
                    denyButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed){
                        formulario.reset();
                        guardaguia();
                    } else if (result.isDenied){
                         formulario.reset();
                    }
                })
            } else if (data === 'error'){
                Swal.fire({
                    title: 'Validar los datos ingresados',
                })
            }
        });
});

function crearArrayObj(nuevaguia){
    let guiaList = JSON.parse(localStorage.getItem("guiaList")) || [];
    guiaList.push(nuevaguia);
    localStorage.guiaList =  JSON.stringify(guiaList);
    localStorage.counter = parseInt(guiaList.length);
    document.querySelector('.count').textContent = parseInt(localStorage.counter);
}

function guardaguia(){
    function asignaGuia(mensajero,idguia){
        this.mensajero=mensajero;
        this.idguia=idguia;
    }
    let mensajero = document.getElementById('idmensajero').value;
    let guia = document.getElementById('idguia').value;
    nuevaguia = new asignaGuia(mensajero,guia)
    crearArrayObj(nuevaguia);
}

const restartButton = document.querySelector('.btn-restart');
restartButton.addEventListener('click', deleteLocalStorage); 

function deleteLocalStorage(){
    localStorage.clear();
    document.querySelector('.count').textContent = parseInt(localStorage.counter);
}

//crear el archivo.
function crearArchivo(contenido,nombre){
    const a = document.createElement("a");
    const archivo = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
}

function generarArchivo(){
    let date = new Date();
    let dateNotFormat = date.toLocaleDateString();
    let dateFormat = dateNotFormat.replaceAll('/','')
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    let nombrearchivo = 'ASIGNACION_' + dateFormat + hours + minutes;
    let contenido = JSON.stringify(localStorage.getItem(formulario));
    console.log(contenido);
    crearArchivo(contenido,nombrearchivo);
}

const $botonDescargar = document.querySelector("#descargar");
$botonDescargar.addEventListener('click', generarArchivo);



