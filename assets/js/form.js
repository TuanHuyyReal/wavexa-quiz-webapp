const quizForm = document.querySelector(".quiz-form");
const categorySelect = document.querySelector("#category-inp");
const difficultySelect = document.querySelector("#difficulty-inp");

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedCategory = categorySelect.value;
  const selectedDifficulty = difficultySelect.value;

  const quiz_data = {
    category: selectedCategory,
    difficulty: selectedDifficulty,
    expiry: false, // Set expiry to false initially
    timestamp: new Date().toISOString(), // Store the current timestamp
  };

  sessionStorage.setItem("quiz_data", JSON.stringify(quiz_data));
  alert("Quiz data saved successfully!");
  // Redirect to the quiz page
  window.location.href = "./index.html";
});
