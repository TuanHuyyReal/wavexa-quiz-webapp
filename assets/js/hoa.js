async function handleApiResponse(category, difficulty) {
  const QUIZ_API_URL = `https://68a046366e38a02c58183626.mockapi.io/api/hoa-wavexa/lienKetIon`;

  try {
    fetch(QUIZ_API_URL)
      .then((response) => response.json())
      .then((question_data) => {
        const categories = ["Liên kết Ion"];
        const categoryIndex = parseInt(category) - 9; // Adjust index based on API categories
        const categoryContext = categories[categoryIndex];
        let score = 0; // Initialize score
        const displayNewQuestion = (question) => {
          const questionText = document.querySelector(".question-text");
          const categoryText = document.querySelector(".category-text");
          const optionsContainer = document.querySelector(".answers-list");
          const scoreElement = document.querySelector(".score");
          const soundEffect = document.querySelector(".sound-effect");
          const cover = document.querySelector("div.cover");

          soundEffect.volume = 1;

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

            let isChangingTheQuestion = false;

            // Add click event listener to each option

            optionElement.addEventListener("click", () => {
              isChangingTheQuestion = true;
              console.log(isChangingTheQuestion);
              if (option === correctAnswer) {
                score += 10; // Increment score for correct answer
                scoreElement.textContent = `Score: ${score}`;
                optionElement.classList.add("correct");

                soundEffect.src = "./assets/audio/answer-correct.mp3";
                soundEffect.play();

                cover.style.display = "block";

                setTimeout(() => {
                  nextQuestion();
                }, 2000);
              } else {
                // Minus the score by 5
                score = score > 5 ? score - 5 : 0; // Ensure score doesn't go below 0
                // Update the score display
                scoreElement.textContent = `Score: ${score}`;
                optionElement.classList.add("incorrect");
                soundEffect.src = "./assets/audio/answer-wrong.mp3";
                soundEffect.play();

                cover.style.display = "block";
                setTimeout(() => {
                  nextQuestion();
                }, 2000);
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
            const cover = document.querySelector("div.cover");
            cover.style.display = "none";
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
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
}
handleApiResponse(9, "easy");
