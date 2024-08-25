document.addEventListener('DOMContentLoaded', () => {
  showSection('artists');
  loadArtists();
  loadAlbums();
  loadTracks();
  loadPlaylists();
  populateTrackCheckboxes();
});

function showSection(sectionId) {
  const sections = document.querySelectorAll('.admin-section');
  sections.forEach(section => {
    section.style.display = section.id === sectionId ? 'block' : 'none';
  });
}

function showModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function hideModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Mock data storage
const dataStore = {
  artists: [],
  albums: [],
  tracks: [],
  playlists: []
};

function loadArtists() {
  const artistList = document.getElementById('artistList');
  artistList.innerHTML = dataStore.artists
    .map(
      artist => `<div><strong>${artist.name}</strong> - ${artist.genre}</div>`
    )
    .join('');
}

function loadAlbums() {
  const albumList = document.getElementById('albumList');
  albumList.innerHTML = dataStore.albums
    .map(
      album => `<div><strong>${album.title}</strong> - ${album.artist}</div>`
    )
    .join('');
}

function loadTracks() {
  const trackList = document.getElementById('trackList');
  trackList.innerHTML = dataStore.tracks
    .map(
      track => `<div><strong>${track.title}</strong> - ${track.album}</div>`
    )
    .join('');
}

function loadPlaylists() {
  const playlistList = document.getElementById('playlistList');
  playlistList.innerHTML = dataStore.playlists
    .map(
      playlist => `<div><strong>${playlist.name}</strong></div>`
    )
    .join('');
}

// Populate track checkboxes
function populateTrackCheckboxes() {
  const trackCheckboxes = document.getElementById('trackCheckboxes');
  trackCheckboxes.innerHTML = dataStore.tracks
    .map(
      (track, index) => `
      <div class="track-checkbox">
        <input type="checkbox" id="trackCheckbox${index}" name="trackCheckbox" value="${track.title}" />
        <label for="trackCheckbox${index}">${track.title}</label>
      </div>`
    )
    .join('');
}

// Filter tracks based on search input
function filterTracks() {
  const searchQuery = document.getElementById('playlistSearch').value.toLowerCase();
  const trackCheckboxes = document.querySelectorAll('.track-checkbox');
  trackCheckboxes.forEach(trackCheckbox => {
    const trackTitle = trackCheckbox.querySelector('label').textContent.toLowerCase();
    trackCheckbox.style.display = trackTitle.includes(searchQuery) ? 'block' : 'none';
  });
}

// Form submission handling
document.getElementById('artistForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.artistName.value;
  const bio = e.target.artistBio.value;
  const genre = e.target.artistGenre.value;
  dataStore.artists.push({ name, bio, genre });
  loadArtists();
  hideModal('artistModal');
  showToast('Artist added successfully!');
});

document.getElementById('albumForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.albumTitle.value;
  const releaseDate = e.target.albumReleaseDate.value;
  const artist = e.target.albumArtist.value;
  dataStore.albums.push({ title, releaseDate, artist });
  loadAlbums();
  hideModal('albumModal');
  showToast('Album added successfully!');
});

document.getElementById('trackForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.trackTitle.value;
  const duration = e.target.trackDuration.value;
  const album = e.target.trackAlbum.value;
  dataStore.tracks.push({ title, duration, album });
  loadTracks();
  populateTrackCheckboxes(); // Update track checkboxes
  hideModal('trackModal');
  showToast('Track added successfully!');
});

document.getElementById('playlistForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.playlistName.value;
  const description = e.target.playlistDescription.value;
  const selectedTracks = Array.from(e.target.trackCheckbox)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  dataStore.playlists.push({ name, description, tracks: selectedTracks });
  loadPlaylists();
  hideModal('playlistModal');
  showToast('Playlist added successfully!');
});

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
