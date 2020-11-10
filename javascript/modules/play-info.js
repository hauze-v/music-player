import PlayList from './playlist.js';

/* Use the revealing module pattern */
const PlayInfo = (() => {
  /* Data and state variables */
  const state = {
    songsLength: 0,
    isPlaying: false,
  }

  /* Cache the DOM  */
  const playerCountEl = document.querySelector(".player__count");
  const playerTriggerEl = document.querySelector(".player__trigger");

  const init = () => {
    render();
    listeners();
  }

  const listeners = () => {
    playerTriggerEl.addEventListener("click", function() {
      // 1. Change our own state (isPlaying) 
      // 2. render it
      // 3. toggle the playpause song functionalty from playlist.js
      state.isPlaying = state.isPlaying ? false : true; // just flip it
      render();
      PlayList.flip();
      
    })
  }

  const setState = (obj) => {
    state.songsLength = obj.songsLength;
    state.isPlaying = obj.isPlaying;
    render();
  }

  const render = () => {
    playerCountEl.innerHTML = state.songsLength;
    playerTriggerEl.innerHTML = state.isPlaying ? "Pause" : "Play";
  }

  return {
    init,
    setState
  }
})();

export default PlayInfo;