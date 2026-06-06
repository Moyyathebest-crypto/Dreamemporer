const animeList = [
  { name: "A Silent Voice", poster: "images/image 15.jpg", link: "#" },
  { name: "A Whisker Away", poster: "images/image 19.jfif", link: "#" },
  { name: "A3! Act! Addict! Actors!", poster: "images/image 21.jfif", link: "#" },
  { name: "A.I.C.O. Incarnation", poster: "images/image 20.jfif", link: "#" }
];

// Renders anime list into a container
function renderAnime(list, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  list.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${anime.poster}" alt="${anime.name}">
      <p class="title">${anime.name}</p>
    `;
    
    card.addEventListener('click', () => {
      addToContinueWatching(anime);
      // Only redirect if the link is not "#"
      if (anime.link && anime.link !== "#") {
        window.location.href = anime.link;
      }
    });

    container.appendChild(card);
  });
}

// Retrieve Continue Watching from localStorage
function getContinueWatching() {
  try {
    return JSON.parse(localStorage.getItem('continueWatching') || '[]');
  } catch {
    return [];
  }
}

// Add anime to Continue Watching (no duplicates)
function addToContinueWatching(anime) {
  const list = getContinueWatching();
  if (!list.some(a => a.name === anime.name)) {
    list.push(anime);
    localStorage.setItem('continueWatching', JSON.stringify(list));
    renderAnime(list, 'continueWatching');
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderAnime(animeList, 'weeklyAnime');
  renderAnime(getContinueWatching(), 'continueWatching');
});
let hoverTimer = null;

document.querySelectorAll(".card").forEach(card => {
  const poster = card.querySelector(".poster");
  const trailer = card.querySelector(".trailer");
  const trailerURL = card.dataset.trailer;

  card.addEventListener("mouseenter", () => {
    hoverTimer = setTimeout(() => {
      poster.style.display = "none";
      trailer.style.display = "block";
      trailer.src = trailerURL + "&autoplay=1&mute=1";
    }, 1000);
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
    trailer.src = "";
    trailer.style.display = "none";
    poster.style.display = "block";
  });
});
const hoverTime = 1000; // 1 second
document.querySelectorAll(".card").forEach(card => {
  let timer;
  const trailer = card.querySelector(".trailer");
  const poster = card.querySelector(".poster");
  card.addEventListener("mouseenter", () => {
    timer = setTimeout(() => {
      card.classList.add("show-trailer");
      trailer.src = card.dataset.trailer + "?autoplay=1&controls=0&modestbranding=1";
    }, hoverTime);
  });
  card.addEventListener("mouseleave", () => {
    clearTimeout(timer);
    card.classList.remove("show-trailer");
    trailer.src = "";
  });
});
