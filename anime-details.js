document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');
    const animeDetails = document.getElementById('anime-details');

    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
        .then(response => response.json())
        .then(data => {
            const anime = data.data;
            animeDetails.innerHTML = `
                <h2>${anime.title}</h2>
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <p><strong>Genres:</strong> ${anime.genres.map(genre => genre.name).join(', ')}</p>
                <p><strong>Episodes:</strong> ${anime.episodes ? anime.episodes : 'N/A'}</p>
                <p><strong>Release Date:</strong> ${anime.aired ? anime.aired.string : 'N/A'}</p>
                <p><strong>Rating:</strong> ${anime.score ? anime.score : 'N/A'}</p>
                <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
            `;
        })
        .catch(error => console.error('Error fetching anime details:', error));
});
