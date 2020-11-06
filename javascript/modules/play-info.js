/* Use the revealing module pattern */
const PlayInfo = (() => {
  /* Data and state variables */
  const state = {
    songsLength: 0,
    isPlaying: false
  }

  /* Cache the DOM  */
  const playerCountEl = document.querySelector(".player__count");
  const playerTriggerEl = document.querySelector(".player__trigger");

  const init = () => {
    render();
  }

  // const setState = (obj) => {
  //   state.songsLength = obj.songsLength;
  //   state.isPlaying = obj.isPlaying;
  // }

  const render = () => {
    playerCountEl.innerHTML = state.songsLength;
    playerTriggerEl.innerHTML = state.isPlaying ? "Pause" : "Play";
  }

  return {
    init
  }
})();

export default PlayInfo;