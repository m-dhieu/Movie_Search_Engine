/*
TVmaze Show Search Engine:
Function to search for and fetch TV shows using the TVmaze API.

Main program flow:
1. Get user's input (show name)
2. Show loading spinner
4. Fetch data from TVmaze API
5. Display fetched data or show an error message if fetch fails
6. Clear previous results and search new input if applicable.
*/ 


function searchShow() {
    const name = document.getElementById('showName').value.trim();
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.getElementById('loading');
    resultsDiv.innerHTML = '';
    loadingDiv.style.display = 'flex';
    if (!name) {
        loadingDiv.style.display = 'none';
        resultsDiv.textContent = "Please enter a show name.";
        return;
    }
    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
            loadingDiv.style.display = 'none';
            if (data.length === 0) {
                resultsDiv.textContent = "No shows found for the given name.";
                return;
            }
            data.forEach(item => {
                const show = item.show;
                const rating = show.rating && show.rating.average ? show.rating.average : "N/A";
                const image = show.image && show.image.medium ? show.image.medium : 'https://via.placeholder.com/120x170?text=No+Image';
                const genres = show.genres.length
                    ? show.genres.map(g => `<span class="genre-badge">${g}</span>`).join(' ')
                    : "None";
                const showDiv = document.createElement('div');
                showDiv.className = 'show';
                showDiv.innerHTML = `
                    <img src="${image}" alt="${show.name}">
                    <div class="show-details">
                        <h2><a href="${show.officialSite || show.url}" target="_blank">${show.name}</a></h2>
                        <div class="desc">${show.summary ? show.summary : "No description available"}</div>
                        <div class="genres"><strong>Genres:</strong> ${genres}</div>
                        <div class="rating"><strong>Rating:</strong> ${rating}</div>
                    </div>
                `;
                resultsDiv.appendChild(showDiv);
            });
        })
        .catch(err => {
            loadingDiv.style.display = 'none';
            resultsDiv.textContent = "Error occurred: " + err.message;
        });
}
