const AudioContext = window.AudioContext || window.webkitAudioContext;
 const audioCtx = new AudioContext();


  // store references to our HTML elements
 const audioElement = document.querySelector("audio");
 const playBtn = document.querySelector("button");
 const volumeSlider = document.querySelector(".volume");
// load the audio source into our audio graph
 const audioSource = audioCtx.createMediaElementSource(audioElement);
function (){
 const songs=["Chann Mereya Mereya - Arijit Singh.mp3","Agar Tum Saath Ho - Tamasha - Arijit Singh ! Hindi Song.mp3"];

 const altText=["chann mereya","agar tum saath ho"];
let i=0;
 for(i=0; i < songs.length;i++){
    

}
