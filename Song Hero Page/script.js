let musicData = {};

// Fetch the music data from the JSON file
fetch('../musicData.json')
    .then(response => response.json())
    .then(data => {
        musicData = data;
    })
    .catch(error => console.error('Error fetching music data:', error));

function searchArtists() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resultsDropdown = document.getElementById('resultsDropdown');
    const closeIcon = document.getElementById('closeIcon');
    const searchIcon = document.getElementById('searchIcon');

    // Clear previous results
    resultsDropdown.innerHTML = '';

    if (searchInput === '') {
        resultsDropdown.style.display = 'none';
        closeIcon.style.display = 'none';
        searchIcon.style.display = 'block';
        return;
    } else {
        closeIcon.style.display = 'block';
        searchIcon.style.display = 'none';
    }

    if (musicData.artists && musicData.artists.length > 0) {
        const results = musicData.artists.filter(artist => 
            artist.name.toLowerCase().includes(searchInput) || 
            artist.songs.some(song => song.toLowerCase().includes(searchInput)) ||
            (artist.genre && artist.genre.toLowerCase().includes(searchInput)) ||
            artist.country.toLowerCase().includes(searchInput) ||
            (artist.playlists && artist.playlists.some(playlist => playlist.toLowerCase().includes(searchInput)))
        );

        if (results.length > 0) {
            results.forEach(artist => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `
                    <h3>${artist.name} (${artist.country}) - ${artist.genre || 'N/A'}</h3>
                    <ul class="song-list">
                        ${artist.songs.map(song => `<li>${song}</li>`).join('')}
                    </ul>
                    ${artist.playlists ? `<ul class="playlist-list">Playlists: ${artist.playlists.map(playlist => `<li>${playlist}</li>`).join('')}</ul>` : ''}
                `;
                resultsDropdown.appendChild(resultItem);
            });
            resultsDropdown.style.display = 'block';
        } else {
            resultsDropdown.style.display = 'none';
        }
    } else {
        console.error('Music data is not available.');
    }
}

function clearSearch() {
    document.getElementById('searchInput').value = ''; // Clear the input field
    document.getElementById('closeIcon').style.display = 'none'; // Hide the close icon
    document.getElementById('searchIcon').style.display = 'block'; // Show the search icon
    
    // Clear the search results
    document.getElementById('resultsDropdown').innerHTML = '';
    document.getElementById('resultsDropdown').style.display = 'none'; // Hide the dropdown
}


//searchBTN
function SearchIcon() {
  gsap.fromTo(
    "#toggleSearchBar",
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      display: "flex",
      duration: 0.5,
      scrub: 1,
      ease: "power4.out",
    }
);
document.getElementById("SearchIcon").style.display = "none";
document.getElementById("CloseIcon").style.display = "block";
}

function closeSearchBar() {
  gsap.to("#toggleSearchBar", {
    scaleX: 0,
    opacity: 0,
    duration: 0.5,
    scrub:1,
    ease: "power4.in",
    onComplete: () => {
      document.getElementById("toggleSearchBar").style.display = "none";
      document.getElementById("SearchIcon").style.display = "block";
      document.getElementById("CloseIcon").style.display = "none";
    },
  });
}


function searchSongsByGenre(genre) {
    const resultsDropdown = document.getElementById('resultsDropdown');
    const results = musicData.artists.flatMap(artist =>
        artist.songs.map(song => ({ artist: artist.name, song, genre: artist.genre, country: artist.country }))
    ).filter(song => song.genre && song.genre.toLowerCase() === genre.toLowerCase());

    resultsDropdown.innerHTML = '';
    if (results.length > 0) {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3>${result.artist} (${result.country}) - ${result.genre}</h3>
                <ul class="song-list">
                    <li>${result.song}</li>
                </ul>`;
            resultsDropdown.appendChild(resultItem);
        });
        resultsDropdown.style.display = 'block';
    } else {
        resultsDropdown.style.display = 'none';
    }
}

function searchSongsByCountry(country) {
    const resultsDropdown = document.getElementById('resultsDropdown');
    const results = musicData.artists.flatMap(artist =>
        artist.songs.map(song => ({ artist: artist.name, song, country: artist.country }))
    ).filter(song => song.country.toLowerCase() === country.toLowerCase());

    resultsDropdown.innerHTML = '';
    if (results.length > 0) {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3>${result.artist} (${result.country})</h3>
                <ul class="song-list">
                    <li>${result.song}</li>
                </ul>`;
            resultsDropdown.appendChild(resultItem);
        });
        resultsDropdown.style.display = 'block';
    } else {
        resultsDropdown.style.display = 'none';
    }
}