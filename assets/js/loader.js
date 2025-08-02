const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  loader.classList.add("hidden"); // Show the loader when the page starts loading
});

window.addEventListener("onload", () => {
  loader.classList.remove("hidden"); // Hide the loader when the page is fully loaded
});
