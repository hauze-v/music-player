import { songsList } from '../data/songs.js'; // grabs the songlist array object from songs.js

/* Use the revealing module pattern*/
const Playlist = (() => {
  /* Data and State Variables */
  let songs = songsList;
  let currentlyPlayingIndex = 4;
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

    const togglePlayPauseIcon = (itemIndex) => {
      /* If current index matches index argument, check if song is paused and return icon based on its' state 
         If the current index does not match, simply return the play button. */
      if (currentlyPlayingIndex === itemIndex) {
        return currentSong.paused ? "fa-play" : "fa-pause";
      } else {
        return "fa-play";
      }
    }

    /* Loop through the songs and render each one appropriately */
    songs.forEach((songObj, index) => {
      /* We use two JavaScript ternary operators right off the bat here to check if the index of the forEach loop is equal to the currentlyPlayingIndex
         If it is, we add an additional CSS class that will style that list item differently. */
      markup += `
        <li class="playlist__song ${index === currentlyPlayingIndex ? "playlist__song--active" : ""}">
          <div class="play-pause">
            <i class="fa ${togglePlayPauseIcon(index)} pp-icon"></i>
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