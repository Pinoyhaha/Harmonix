/* PLAYER ENGINE — HTMLAudioElement playback and transport controls. */
(() => {
  const audio=document.getElementById("audio-element");
  const state={index:-1,shuffle:false,repeat:false,liked:new Set()};
  const $=id=>document.getElementById(id);
  const fmt=s=>{if(!Number.isFinite(s)||s<0)return "0:00";return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")};
  function current(){return HarmonixLibrary.tracks[state.index]}
  function render(){
    const t=current();$("now-title").textContent=t?.title||"Choose a song";$("now-artist").textContent=t?.artist||"Your library is waiting";
    $("now-art").className="mini-art "+(t?.art||"art-a");$("now-art").textContent=t?"♫":"♪";
    $("play-button").textContent=audio.paused?"▶":"Ⅱ";$("like-button").textContent=t&&state.liked.has(t.id)?"♥":"♡";
    $("duration").textContent=fmt(audio.duration||t?.duration||0);
  }
  function playAt(index){
    const tracks=HarmonixLibrary.tracks;if(!tracks.length)return toast("Add an audio file to play it.");
    state.index=(index+tracks.length)%tracks.length;const t=current();
    if(t.url){audio.src=t.url;audio.play().catch(()=>toast("Your browser couldn't play this audio file."));}
    else {audio.pause();audio.removeAttribute("src");audio.load();toast("Demo track selected — add a local audio file to hear playback.");}
    render();document.querySelectorAll("[data-track-id]").forEach(row=>row.classList.toggle("playing",row.dataset.trackId===t.id));
  }
  function toggle(){if(state.index<0){playAt(0);return}if(!current()?.url){toast("Import an audio file to enable playback.");return}if(audio.paused)audio.play().catch(()=>toast("Playback needs a user action."));else audio.pause();render()}
  function next(){if(!HarmonixLibrary.tracks.length)return;playAt(state.shuffle?Math.floor(Math.random()*HarmonixLibrary.tracks.length):(state.index+1)%HarmonixLibrary.tracks.length)}
  function previous(){if(audio.currentTime>3){audio.currentTime=0;return}playAt((state.index-1+HarmonixLibrary.tracks.length)%HarmonixLibrary.tracks.length)}
  $("play-button").addEventListener("click",toggle);$("next-button").addEventListener("click",next);$("previous-button").addEventListener("click",previous);
  $("shuffle-button").addEventListener("click",()=>{state.shuffle=!state.shuffle;$("shuffle-button").classList.toggle("selected",state.shuffle);toast(state.shuffle?"Shuffle on":"Shuffle off")});
  $("repeat-button").addEventListener("click",()=>{state.repeat=!state.repeat;$("repeat-button").classList.toggle("selected",state.repeat);toast(state.repeat?"Repeat current track":"Repeat off")});
  $("like-button").addEventListener("click",()=>{const t=current();if(!t)return;state.liked.has(t.id)?state.liked.delete(t.id):state.liked.add(t.id);render()});
  $("seek-bar").addEventListener("input",e=>{if(audio.duration)audio.currentTime=(e.target.value/100)*audio.duration});
  $("volume-bar").value=HARMONIX_CONFIG.defaultVolume;audio.volume=HARMONIX_CONFIG.defaultVolume;
  $("volume-bar").addEventListener("input",e=>audio.volume=Number(e.target.value));
  audio.addEventListener("timeupdate",()=>{if(audio.duration){$("seek-bar").value=audio.currentTime/audio.duration*100;$("current-time").textContent=fmt(audio.currentTime)}});
  audio.addEventListener("loadedmetadata",render);audio.addEventListener("play",render);audio.addEventListener("pause",render);
  audio.addEventListener("ended",()=>{if(state.repeat){audio.currentTime=0;audio.play()}else next()});
  window.HarmonixPlayer={playAt,render};
})();