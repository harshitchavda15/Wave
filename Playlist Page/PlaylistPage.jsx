import React from 'react';
import './Wave.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowTrendUp from '@fortawesome/free-solid-svg-icons/faArrowTrendUp';
import faLayerGroup from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import faHeart from '@fortawesome/free-solid-svg-icons/faHeart';
import faHome from '@fortawesome/free-regular-svg-icons/faHome';

class Wave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      playlist: {}
    };
  }

  componentDidMount() {
    fetch('songs.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ songs: data });
      })
      .catch(error => console.error('Error fetching songs:', error));
  }

  createSongCard(song) {
    return React.createElement('div', { className: 'songCard' },
      React.createElement('div', { className: 'imageHolder' },
        React.createElement('img', { src: song.image, alt: 'Song Image', className: 'songImage' })
      ),
      React.createElement('div', { className: 'songInfo' },
        React.createElement('div', { className: 'songName' }, song.songName),
        React.createElement('div', { className: 'artistName' }, song.artistName)
      ),
      React.createElement('div', { className: 'songDetails' },
        React.createElement('div', { className: 'duration songCardPlay' },
          song.duration,
          React.createElement(FontAwesomeIcon, { icon: faPlay })
        )
      )
    );
  }

  render() {
    return React.createElement('div', { className: 'Wave' },
      React.createElement('nav', { className: 'sideBar' },
        React.createElement('div', { className: 'logo' },
          React.createElement('h1', { className: 'WAVE' }, 'Wave')
        ),
        React.createElement('div', { className: 'navigation' },
          React.createElement('ul', { className: 'navLinks' },
            React.createElement('li', { className: 'link' },
              React.createElement('a', { href: '#' },
                React.createElement(FontAwesomeIcon, { icon: faArrowTrendUp }),
                ' Trending Songs'
              )
            ),
            React.createElement('li', { className: 'link' },
              React.createElement('a', { href: '#' },
                React.createElement(FontAwesomeIcon, { icon: faLayerGroup }),
                ' Your Waves'
              )
            ),
            React.createElement('li', { className: 'link' },
              React.createElement('a', { href: '#' },
                React.createElement(FontAwesomeIcon, { icon: faHeart }),
                ' Liked Songs'
              )
            )
          )
        ),
        React.createElement('div', { className: 'policies' },
          React.createElement('ul',
            React.createElement('li', null,
              React.createElement('a', { href: '#' }, 'Cookies')
            ),
            React.createElement('li', null,
              React.createElement('a', { href: '#' }, 'Privacy')
            )
          )
        )
      ),
      React.createElement('main', { className: 'mainContainer' },
        React.createElement('header', { className: 'topNav' },
          React.createElement('a', { href: '../Home Page/Home.html' },
            React.createElement(FontAwesomeIcon, { icon: faHome })
          ),
          React.createElement('span', { className: 'fa fa-search' })
        ),
        React.createElement('section', { className: 'wavePlaylist' },
          React.createElement('div', { className: 'heroSection' },
            React.createElement('div', { className: 'playlistImg' },
              React.createElement('img', { src: '../Playlist Page/images/Peaceful Piano.jpg', alt: 'Peaceful Piano' })
            ),
            React.createElement('div', { className: 'playlistInfo' },
              React.createElement('p', { className: 'playlistTitle' }, 'TOP Songs'),
              React.createElement('p', { className: 'playlistDesc' }, 'Your weekly update of the most played tracks right now - USA.')
            )
          ),
          React.createElement('div', { className: 'playlistSongs' },
            this.state.songs.map(this.createSongCard)
          )
        ),
        React.createElement('section', { className: 'wavePlaylist' },
          React.createElement('h2', null, 'Top India'),
          React.createElement('div', { className: 'list' },
            React.createElement('div', { className: 'item' },
              React.createElement('img', { src: './images/The Sound of Bengaluru.jpg', alt: 'The Sound of Bengaluru' }),
              React.createElement('h4', null, 'The Sound of Bengaluru'),
              React.createElement('p', null, 'Experience the vibrant music scene of Bengaluru')
            ),
            // ...
          )
        )
      )
    );
  }
}

export default Wave;