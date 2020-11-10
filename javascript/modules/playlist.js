import { songsList } from "../data/songs.js"; // grabs the songlist array object from songs.js
import PlayInfo from "./play-info.js";
import TrackBar from "./track-bar.js";

/* Use the revealing module pattern*/
const PlayList = (() => {
  /* Data and State Variables */
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  // We're using a built-in web API from the browser to play audio and get various audio file information
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);
  let featuredImg = "../../images/aftergold_big_wild.jpg";

 /* Cache the DOM */
 const playlistEl = document.querySelector(".playlist");
 const playerImgEl = document.querySelector(".player__img");

  const init = () => {
    render();
    listeners();
    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused
    });
  }

  const flip = () => {
    togglePlayPause();
    render();
  }

  const changeAudioSrc = () => {
    /* Use built in src property for Audio API object */
    currentSong.src = songs[currentlyPlayingIndex].url;
  }

  const changeFeaturedImg = () => {
    featuredImg = songs[currentlyPlayingIndex].image;
  }

  const togglePlayPause = () => {
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  }

  const mainPlay = (clickedIndex) => {
    /* If the clicked index is the same as the currentlyPlayingIndex: toggle play or pause
       else change the currentlyPlayingIndex to new index and changeAudioSrc */
    if (currentlyPlayingIndex === clickedIndex) {
      togglePlayPause();
    } else {
      currentlyPlayingIndex = clickedIndex;
      changeAudioSrc();
      togglePlayPause();
      changeFeaturedImg();
    }

    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused
    });
  }

  const playNext = () => {
    /* If the next song exists, go to it */
    if (songs[currentlyPlayingIndex + 1]) {
      currentlyPlayingIndex++;
      changeAudioSrc();
      togglePlayPause();
      render();
    }
  }

  const listeners = () => {
    playlistEl.addEventListener("click", function(event) {
      if (event.target && event.target.matches(".pp-icon")) {
        /* Walk up the DOM from icon to li element */
        const listEl = event.target.parentNode.parentNode;
        
        /* Get the HTML collection (ul children) */
        const playlistHTMLCollection = listEl.parentElement.children;

        /* Since you cannot run indexOf on HTML collection, we need to use es6 spread operator and turn it into an array */
        const listElIndex = [...playlistHTMLCollection].indexOf(listEl);
        mainPlay(listElIndex);
        render();
      }
    })

    currentSong.addEventListener("ended", function() {
      playNext();
    })

    currentSong.addEventListener("timeupdate", function() {
      TrackBar.setState(currentSong);
    })
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
    playerImgEl.src = featuredImg;
  }

  return {
    init,
    flip
  }
})();

export default PlayList;