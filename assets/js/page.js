var dropdown = document.querySelector(".dropdown-menu");
dropdown.classList.add("hidden");

document
  .querySelector(".btn-copy.dropdown-btn.reg-btn")
  .addEventListener("click", function () {
    dropdown.classList.toggle("hidden");
  });

const audio = document.querySelector("audio.bg-track");
audio.volume = 0.2;
audio.play();
