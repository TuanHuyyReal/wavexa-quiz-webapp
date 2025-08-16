import { db, auth } from "./firebase-config.js";

async function handleApiResponse(category_id, difficulty) {
  const QUIZ_API_URL = `https://68a046366e38a02c58183626.mockapi.io/api/nguvan-wavexa/${category_id}_questions`;

  try {
    fetch(QUIZ_API_URL)
      .then((response) => response.json())
      .then((question_data) => {
        if (question_data) {
          console.log("Get data successfully");
          console.log(question_data);

          const categoryContext = "Ngữ văn";
          let score = 0; // Initialize score
          const displayNewQuestion = (question) => {
            const questionText = document.querySelector(".question-text");
            const categoryText = document.querySelector(".category-text");
            const optionsContainer = document.querySelector(".answers-list");
            const scoreElement = document.querySelector(".score");

            scoreElement.textContent = `Score: ${score}`;

            questionText.textContent = question.question;
            categoryText.textContent = `Category: ${categoryContext}, Difficulty: ${difficulty}`;

            optionsContainer.innerHTML = "";
            const options = [
              ...question.incorrect_answers,
              question.correct_answer,
            ];
            options.sort(() => Math.random() - 0.5); // Shuffle options

            options.forEach((option) => {
              // Create a new list item for each option
              const optionElement = document.createElement("li");
              optionElement.classList.add("option");
              optionElement.textContent = option;
              optionsContainer.appendChild(optionElement);

              const correctAnswer = question.correct_answer;
              // Add click event listener to each option
              optionElement.addEventListener("click", () => {
                if (option === correctAnswer) {
                  score += 10; // Increment score for correct answer
                  scoreElement.textContent = `Score: ${score}`;
                  nextQuestion();
                } else {
                  // Minus the score by 5
                  score = score > 5 ? score - 5 : 0; // Ensure score doesn't go below 0
                  // Update the score display
                  scoreElement.textContent = `Score: ${score}`;
                  nextQuestion();
                }
              });
            });
          };

          function renderQuestionIndex(q_index) {
            const questionIndexElement =
              document.querySelector(".question-index");
            questionIndexElement.textContent = `Question ${q_index + 1} of ${
              questions.length
            }`;
          }

          let questionIndex = 0;
          const questions = question_data;
          console.log(questions);
          let isAnswering = false;
          // Shuffle questions
          questions.sort(() => Math.random() - 0.5);
          const nextQuestion = () => {
            if (questionIndex < questions.length) {
              displayNewQuestion(questions[questionIndex]);
              questionIndex++;

              renderQuestionIndex(questionIndex - 1);
              isAnswering = true; // Allow answering for the next question
            } else {
              setTimeout(() => {
                const finalScore = score;
                alert(
                  `Quiz completed! Your final score is: ${finalScore}. We are directing you to the result page.`
                );
                // Save the score to sessionStorage
                sessionStorage.setItem("final_score", finalScore);
                window.location.href = "./result.html";
              }, 1000);
            }
          };
          nextQuestion();
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
}
const startQuiz = () => {
  const quiz_data = {
    category_id: parseInt(
      prompt("Nhap category_id (0: disanmatdat, 1: cuoctubocacgiongvat)")
    ),
    difficulty: "Easy",
  };
  if (quiz_data) {
    const categories = ["diSanMatDat", "cuocTuBoCacGiongVat"];

    const { category_id, difficulty } = quiz_data;

    handleApiResponse(categories[category_id], difficulty);
  } else {
    console.error("No quiz data found in sessionStorage.");
  }
};
startQuiz();
