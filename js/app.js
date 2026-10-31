/* APP CONTROLLER — navigation, rendering, search, file import, and playlists. */
(() => {
  const $=id=>document.getElementById(id);
  const views=["home","search","library","playlists","settings"];
  window.toast=message=>{const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>el.classList.remove("show"),2400)};
  function showView(name){views.forEach(v=>$("view-"+v).classList.toggle("hidden",v!==name));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===name));if(name==="search")$("global-search").focus();renderAll()}
  document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
  document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.goto)));
  $("settings-button").addEventListener("click",()=>showView("settings"));
  $("back-button").addEventListener("click",()=>showView("home"));$("forward-button").addEventListener("click",()=>showView("library"));
  const artSymbols={"art-a":"✳","art-b":"◒","art-c":"✺","art-d":"✦","art-e":"❋"};
  function trackRow(t){return `<div class="track-row" data-track-id="${t.id}"><div class="track-art ${t.art}">${artSymbols[t.art]||"♫"}</div><div class="track-info"><strong>${escapeHtml(t.title)}</strong><span>${escapeHtml(t.artist)} · ${escapeHtml(t.album)}</span></div><span class="track-duration">${t.duration?Math.floor(t.duration/60)+":"+String(t.duration%60).padStart(2,"0"):"LOCAL"}</span><button class="track-play" data-play-id="${t.id}" title="Play">▶</button></div>`}
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function renderTracks(target,tracks){$(target).innerHTML=tracks.length?tracks.map(trackRow).join(""):`<div class="empty-state">No tracks here yet. Add audio files to get started.</div>`;$(target).querySelectorAll("[data-play-id]").forEach(b=>b.addEventListener("click",()=>HarmonixPlayer.playAt(HarmonixLibrary.tracks.findIndex(t=>t.id===b.dataset.playId))))}
  function renderPlaylists(){const side=$("sidebar-playlists"),grid=$("playlist-grid");side.innerHTML=HarmonixLibrary.playlists.length?HarmonixLibrary.playlists.map(p=>`<button>${escapeHtml(p.name)}</button>`).join(""):'<span class="muted small">Your playlists will appear here.</span>';grid.innerHTML=HarmonixLibrary.playlists.map(p=>`<div class="playlist-card"><div class="playlist-cover">♫</div><strong>${escapeHtml(p.name)}</strong><p>Created just now</p></div>`).join("")||'<div class="empty-state">Your playlists will show up here.</div>'}
  function renderAll(){renderTracks("home-tracks",HarmonixLibrary.tracks.slice(0,4));renderTracks("library-tracks",HarmonixLibrary.tracks);$("library-count").textContent=HarmonixLibrary.tracks.length+" tracks";renderPlaylists();HarmonixPlayer.render()}
  function addFiles(fileList){const added=HarmonixLibrary.addFiles(fileList);if(!added.length){toast("Choose audio files such as MP3, WAV, or M4A.");return}renderAll();showView("library");toast("Added "+added.length+" audio file"+(added.length===1?"":"s"))}
  $("upload-trigger").addEventListener("click",()=>$("file-picker").click());$("upload-callout-button").addEventListener("click",()=>$("file-picker").click());$("library-upload").addEventListener("click",()=>$("file-picker").click());$("file-picker").addEventListener("change",e=>addFiles(e.target.files));
  $("global-search").addEventListener("input",e=>{showView("search");const q=e.target.value.toLowerCase().trim();renderTracks("search-results",HarmonixLibrary.tracks.filter(t=>(t.title+" "+t.artist+" "+t.album).toLowerCase().includes(q)))});
  document.querySelectorAll("[data-play-demo]").forEach(b=>b.addEventListener("click",()=>{const index=Number(b.dataset.playDemo);HarmonixPlayer.playAt(index);toast("Selected a featured mix. Import a local file to listen.")}));
  function createPlaylist(){ $("playlist-name").value="";$("playlist-dialog").showModal(); }
  $("new-playlist").addEventListener("click",createPlaylist);$("create-playlist-main").addEventListener("click",createPlaylist);
  $("playlist-form").addEventListener("submit",e=>{e.preventDefault();const name=$("playlist-name").value.trim();if(!name)return;HarmonixLibrary.playlists.push({id:"pl-"+Date.now(),name});$("playlist-dialog").close();renderPlaylists();toast("Playlist created")});
  $("accent-picker").addEventListener("input",e=>document.documentElement.style.setProperty("--accent",e.target.value));
  $("clear-library").addEventListener("click",()=>{HarmonixLibrary.clear();renderAll();toast("Imported tracks cleared")});
  $("queue-button").addEventListener("click",()=>toast(HarmonixLibrary.tracks.length+" tracks in your library"));
  renderAll();
})();