import { songsList } from '../data/songs.js'; // grabs the songlist array object from songs.js

/* Use the revealing module pattern*/
const Playlist = (() => {
  /* Data or State */
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  // We're using a built-in web API from the browser to play audio and get various audio file information
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);
  let isPlaying = false;

 /* Cache the DOM */
 const playlistEl = document.querySelector(".playlist");

  const init = () => {
    render();
  }

  const render = () => {
    let markup = '';

    songs.forEach((songObj, index) => {
      markup += `
        <li class="playlist__song">
          <div class="play-pause">
            <i class="fa fa-play pp-icon"></i>
          </div>
          <div class="playlist__song-details">
            <span class="playlist__song-name">${songObj.title}</span>
            <br>
            <span class="playlist__song-artist">${songObj.artist}</span>
          </div>
          <div class="playlist__song-duration">
            <span>${songObj.time}</span>
          </div>
        </li>
      `;
    })

    playlistEl.innerHTML = markup;
  }

  return {
    init
  }
})();

export default Playlist;