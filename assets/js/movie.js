const id=new URLSearchParams(location.search).get("id");

fetch("data/movies.json")
.then(r=>r.json())
.then(movies=>{
const m=movies.find(x=>x.id===id);
movieTitle.textContent=m.title;
movieDesc.textContent=m.description;
moviePoster.src=m.poster;
moviePlayer.src=m.watchUrl;
downloadBtn.href=m.downloadUrl;
});
