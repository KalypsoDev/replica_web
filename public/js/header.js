const observer = new IntersectionObserver(trackingScroll, { //le paso la función que va a llamar y la configuración
    root: null, //null significa que no tiene valor; usa el viewport
    rootMargin: '0px',
    threshold: 0.50 //con la mitad de la sección dentro vale
});

function trackingScroll (entries) { //función que se llama cuando una sección entre o sale según el threshold
    const element = entries.filter(a => a.isIntersecting)     //entries es un array de objetos y filter coge los elementos para los que la función devuelve true (los que intersectan)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)?.[0] //ordenamos los elementos que hayan quedado y nos quedamos con el que esté más dentro
        ?.target; //sólo coge target si hay un elemento que coger

    if (!element) {
        return;
    }

    document.querySelectorAll('#header__navbar a.active').forEach(a => { //busca los activos 
        //coge todos los elementos y los recorre uno a uno y ejecuta la arrow función para ellos
        a.classList.remove('active'); //y elimina la clase active
    })

    document.querySelector(`#header__navbar a[href="#${element.id}"]`)?.classList.add('active'); //seleccionamos el enlace que hay que poner rojo y le pone la clase; si no hay enlace no hace nada (?.)
}

document.addEventListener('DOMContentLoaded', () => { //este archivo se carga en el header en paralelo de forma asíncrona, puede ser que todas las secciones no estén en el DOM; cuando se ha cargado todo, llama a la función; () no cogemos ningún parámetro aún
    const sections = [ //definimos un array con las ids de las secciones
        'home',
        'description',
        'features',
        'screens',
    ]

    for (const id of sections) {
        const element = document.getElementById(id); //recorremos el array y cogemos la sección que coincide con el id

        observer.observe(element); //se la pasamos al observer
    }
})
