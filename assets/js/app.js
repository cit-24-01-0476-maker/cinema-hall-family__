/* =====================================================
   CINEMA HALL FAMILY – FINAL app.js
   Safe, non-breaking, GitHub Pages ready
===================================================== */

/* ================= MODALS ================= */

function openModal(id){
  const modal = document.getElementById(id);
  if(!modal) return;

  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeModal(){
  document.querySelectorAll(".modal").forEach(m=>{
    m.classList.remove("active");
  });
  document.body.classList.remove("modal-open");
}

/* Close modal when clicking outside box */
document.addEventListener("click",e=>{
  if(e.target.classList.contains("modal")){
    closeModal();
  }
});

/* Close modal on ESC key */
document.addEventListener("keydown",e=>{
  if(e.key === "Escape"){
    closeModal();
  }
});


/* ================= MOBILE MENU ================= */
/* (future expandable – now safe placeholder) */

function toggleMenu(){
  const nav = document.querySelector(".nav-links");
  if(!nav) return;

  nav.classList.toggle("active");
}


/* ================= MOVIES LOAD (HOME PAGE) ================= */

document.addEventListener("DOMContentLoaded",()=>{

  const grid = document.getElementById("movieGrid");
  if(!grid) return;

  fetch("data/movies.json")
    .then(res => res.json())
    .then(movies => {
      grid.innerHTML = "";

      movies.forEach(movie=>{
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <span>${movie.year}</span>
          <a class="btn outline small"
             href="movie.html?id=${movie.id}">
             Details
          </a>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err=>{
      console.error("Movie load error:",err);
      grid.innerHTML = "<p class='muted'>Movies unavailable</p>";
    });

});


/* ================= SEARCH FILTER ================= */

document.addEventListener("DOMContentLoaded",()=>{

  const search = document.querySelector(".search-bar");
  if(!search) return;

  search.addEventListener("input",()=>{
    const query = search.value.toLowerCase();

    document.querySelectorAll(".movie-card").forEach(card=>{
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? "" : "none";
    });
  });

});


/* ================= SHARE (SAFE FALLBACK) ================= */

function sharePage(){
  if(navigator.share){
    navigator.share({
      title:document.title,
      url:location.href
    });
  }else{
    navigator.clipboard.writeText(location.href);
    alert("Link copied to clipboard");
  }
}


/* ================= GOOGLE LOGIN PLACEHOLDER ================= */
/* Real logic handled inside HTML Firebase module */

function googleLogin(){
  alert("Google Login loading…");
}


/* ================= GLOBAL SAFETY ================= */

window.addEventListener("error",e=>{
  console.warn("Handled JS error:",e.message);
});
