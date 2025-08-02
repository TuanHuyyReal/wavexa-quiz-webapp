var dropdown = document.querySelector(".dropdown-menu");
dropdown.classList.add("hidden");

document
  .querySelector(".btn-copy.dropdown-btn.reg-btn")
  .addEventListener("click", function () {
    dropdown.classList.toggle("hidden");
  });
