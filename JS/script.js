const API_KEY = "21b071cbc13b91c11efd5cd4184bdf56";
const buscador = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

buscador.addEventListener('input', async () => {
    const query = buscador.value;

    if(query === ''){
        resultado.innerHTML = '';
        return;
    }

    const respuesta = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=es-MX`
    );

    const datos = await respuesta.json();

    mostrarPeliculas(datos.results)
});

const mostrarPeliculas = (peliculas) => {
    
    resultado.innerHTML = '';
    peliculas.forEach(pelicula => {
        const card = document.createElement("div");
    card.classList.add("card");

    const imagen = pelicula.poster_path
            ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
            : 'https://via.placeholder.com/200x300?text=Sin+imagen';

    card.innerHTML = `
        <img src="${imagen}" alt = "${pelicula.title}">
        <div class = "info">
            <h3>${pelicula.title}</h3>
            <p>⭐ ${pelicula.vote_average.toFixed(1)}</p>
            <p>📅 ${pelicula.release_date?.split('-')[0] || 'N/A'}</p>
        </div>
    `;
    resultado.appendChild(card);
    });

}