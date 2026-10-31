/* LIBRARY DATA — edit demo tracks here; imported files stay in memory for this session. */
(() => {
  const demos = [
    {id:"demo-1",title:"Velvet Skies",artist:"The Paper Moons",album:"After Hours",duration:224,art:"art-a",demo:true},
    {id:"demo-2",title:"Slow Motion",artist:"June Harbor",album:"Easy Sunday",duration:198,art:"art-b",demo:true},
    {id:"demo-3",title:"Golden Hourglass",artist:"Mira Sol",album:"New Frequencies",duration:246,art:"art-c",demo:true},
    {id:"demo-4",title:"Little by Little",artist:"Northbound",album:"Soft Focus",duration:213,art:"art-d",demo:true},
    {id:"demo-5",title:"City Lights",artist:"Aster Bloom",album:"Night Drive",duration:187,art:"art-e",demo:true}
  ];
  window.HarmonixLibrary = {
    tracks: window.HARMONIX_CONFIG.demoTracks ? demos : [],
    playlists: [],
    addFiles(files) {
      const added = [...files].filter(f=>f.type.startsWith("audio/")).map((file,index)=>({
        id:"local-"+Date.now()+"-"+index,title:file.name.replace(/\.[^.]+$/,""),artist:"Local file",album:"Your device",duration:0,art:["art-a","art-b","art-c","art-d","art-e"][index%5],file,url:URL.createObjectURL(file),demo:false
      }));
      this.tracks.push(...added); return added;
    },
    clear() { this.tracks=this.tracks.filter(t=>t.demo); }
  };
})();