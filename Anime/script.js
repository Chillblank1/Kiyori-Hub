document.addEventListener('DOMContentLoaded', () => {
    const animeList = document.getElementById('anime-list');

    // Fetch anime data
    fetch('https://api.jikan.moe/v4/top/anime?type=movie')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(anime => {
                const animeItem = document.createElement('div');
                animeItem.classList.add('anime-item', 'tilt');
                animeItem.innerHTML = `
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                    <h2>${anime.title}</h2>
                    <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'No synopsis available.'}</p>
                    <p>Rating: ${anime.score ? anime.score : 'N/A'}</p>
                    <a href="anime.html?id=${anime.mal_id}" class="button">More Info</a>

                `;
                animeList.appendChild(animeItem);
            });

            // Add tilt animation
            const animeCards = document.querySelectorAll('.tilt');
            animeCards.forEach(card => {
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left; // X-axis position of cursor within the element
                    const y = e.clientY - rect.top; // Y-axis position of cursor within the element
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((y - centerY) / centerY) * 10; // Adjust rotation intensity
                    const rotateY = ((x - centerX) / centerX) * -10;

                    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
                });
            });
        })
        .catch(error => console.error('Error fetching anime data:', error));
});
