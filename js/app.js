8//VARIABLES
import autos from "./db.js";

const results = document.querySelector('#resultado');

//Selects
const year = document.querySelector('#year');
const selects = document.querySelectorAll('.filter');


//Eventos
document.addEventListener('DOMContentLoaded',()=>{
    //mostrar autos
    showCars(autos);
    //Llenar Select
    inputYears();
    
});

//FUNCIONES
function showCars (autos){
    //limpiar HTML
    limpiarHtml();

    autos.forEach(auto =>{
        const {marca, modelo, year, precio, puertas, transmision, color} = auto;

        const autoHtml = document.createElement('p');
        autoHtml.textContent = `Auto :${marca} ${modelo} | Año :${year} | Precio :${precio} | Puertas: ${puertas} | Transmision :${transmision} | Color :${color}`;
        
        results.appendChild(autoHtml);
    })
};

function limpiarHtml() {
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
}

function inputYears() {
    const max = new Date().getFullYear();
    for(let i = max; i >= (max-10); i--){
        const options = document.createElement('option');
        options.value = i;
        options.textContent = i;
        year.appendChild(options);
    };
};

selects.forEach(select=>{

    select.addEventListener('change',e =>{
        collectData(e.target);
    })
});

//datos de busqueda
const buscador = { 
    marca: '', 
    year: '', 
    minimo: '',
    maximo:'',
    puertas: '', 
    color: '', 
    transmision: '' 
}

function collectData(select){
    for(let i in buscador){
        if( i == select.id){
            buscador[i] = select.value;
        }
    };
    filterCar();
}

function filterCar() {
    const result = autos.filter(filtrarMarca)
                            .filter(filtrarYears)
                                .filter(filtrarPrecio)
                                    .filter(filtrarPuertas)
                                        .filter(filtrarTransmision)
                                            .filter(filtrarColor);
    
    if(result.length){
        showCars(result);
    } else {
        limpiarHtml();
        const alerta = document.createElement('div');
        alerta.classList.add('alerta','error');
        alerta.textContent = 'No hay resultados, intenta con otra busqueda';
        results.appendChild(alerta)
    }
}

function filtrarMarca(auto) {
    if(buscador.marca){
        return auto.marca == buscador.marca
    }
    return auto;
};
function filtrarYears(auto) {
    if(buscador.year){
        return auto.year == parseInt(buscador.year);
    }
    return auto;
}
function filtrarPrecio(auto) {
    if(buscador.minimo && buscador.maximo){
        return auto.precio >= parseInt(buscador.minimo) && auto.precio <= parseInt(buscador.maximo);
    } else if(buscador.minimo || buscador.maximo){
        return auto.precio >= parseInt(buscador.minimo) || auto.precio <= parseInt(buscador.maximo);
    }
    return auto;
}
function filtrarPuertas(auto) {
    if(buscador.puertas){
        return auto.puertas === parseInt(buscador.puertas)
    }
    return auto;
}
function filtrarTransmision(auto) {
    if(buscador.transmision){
        return auto.transmision == buscador.transmision
    }
    return auto;
}

function filtrarColor(auto) {
    if(buscador.color){
        return auto.color == buscador.color
    }
    return auto;
}

