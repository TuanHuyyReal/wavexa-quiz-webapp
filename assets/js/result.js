import { db, auth } from "./firebase-config.js";

const renderScoreAndInfos = (score, category, difficulty) => {
  const scoreEle = document.querySelector("span.score-text");
  const categoryEle = document.querySelector("span.category-text");
  const difficultyEle = document.querySelector("span.diff-text");

  scoreEle.innerHTML += `${score}`;
  categoryEle.innerHTML += `${category}`;
  difficultyEle.innerHTML += `${difficulty}`;
};

const categories = [
  "General Knowledge",
  "Entertainment: Books",
  "Entertainment: Film",
  "Entertainment: Music",
  "Entertainment: Musicals & Theatres",
  "Entertainment: Television",
  "Entertainment: Video Games",
  "Entertainment: Board Games",
  "Science & Nature",
  "Science: Computers",
  "Science: Mathematics",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Politics",
  "Art",
  "Celebrities",
  "Animals",
];
const finalScore = sessionStorage.getItem("final_score");
const category =
  categories[JSON.parse(sessionStorage.getItem("quiz_data")).category - 9];
const difficulty = JSON.parse(sessionStorage.getItem("quiz_data")).difficulty;

const scoreData = {
  score: finalScore,
  category: category,
  difficulty: difficulty,
};

sessionStorage.setItem("scoreData", JSON.stringify(scoreData));

renderScoreAndInfos(finalScore, category, difficulty);
const renderLeaderboard = (leaderboard) => {
  const leaderboardElement = document.querySelector("ul.leaderboard-list");
  leaderboardElement.innerHTML = ""; // Clear previous leaderboard

  leaderboard.forEach((entry) => {
    const entryElement = document.createElement("li");
    entryElement.className = "leaderboard-entry";
    entryElement.textContent = `${leaderboard.indexOf(entry) + 1}. ${
      entry.username
    }: ${entry.score} - ${entry.categories}`;
    leaderboardElement.appendChild(entryElement);
  });
};
const fetchLeaderboard = () => {
  db.collection("leaderboard")
    .orderBy("score", "desc")
    .limit(10)
    .get()
    .then((querySnapshot) => {
      const leaderboard = [];
      querySnapshot.forEach((doc) => {
        leaderboard.push(doc.data());
      });
      renderLeaderboard(leaderboard);
    })
    .catch((error) => {
      console.error("Error fetching leaderboard:", error);
    });
};
const saveUserScore = (email, scoreData) => {
  const userScore = {
    username: email,
    score: scoreData.score,
    timestamp: new Date().toISOString(),
    categories: scoreData.category,
    difficulty: scoreData.difficulty,
  };

  db.collection("leaderboard")
    .add(userScore)
    .then(() => {
      console.log("User score saved successfully");
      fetchLeaderboard();
    })
    .catch((error) => {
      console.error("Error saving user score:", error);
    });

  // Clear the score data from sessionStorage after saving
  sessionStorage.removeItem("scoreData");
};

const saveScoreBtn = document.querySelector("button.save-score");

saveScoreBtn.addEventListener("click", () => {
  const user_session = JSON.parse(localStorage.getItem("user_session")) || null;
  const scoreData = JSON.parse(localStorage.getItem("scoreData")) || null;
  if (user_session && scoreData) {
    const userData = {
      username: user_session.user.providerData[0].uid,
      scoreData: scoreData,
    };

    saveUserScore(userData.username, userData.scoreData);
    alert("Your score has been saved successfully!");
  } else {
    location.href = "./login.html";
    alert("Please log in to save your score.");
  }
});

// const saveScoreForm = document.querySelector(".save-score");
// saveScoreForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const usernameInput = document.querySelector("#username-inp");
//   const emailInput = document.querySelector("#email-inp");

//   const username = usernameInput.value.trim();
//   const email = emailInput.value.trim();

//   if (username && email) {
//     saveUserScore(username, email, finalScore);
//     alert("Your score has been saved successfully!");
//     // Clear the input fields after saving
//     usernameInput.value = "";
//     emailInput.value = "";

//     document.querySelector(".restart-quiz").textContent = "Try new quizzes!";
//   } else {
//     alert("Please enter both username and email.");
//   }
// });
fetchLeaderboard();

// searching for user's score from database
const searchInp = document.querySelector("#search-input");
searchInp.addEventListener("input", (event) => {
  const searchValue = event.target.value.toLowerCase();
  const leaderboardEntries = document.querySelectorAll(".leaderboard-entry");

  db.collection("leaderboard")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          data.username.toLowerCase().includes(searchValue) ||
          data.email.toLowerCase().includes(searchValue)
        ) {
          leaderboardEntries.forEach((entry) => {
            if (
              entry.textContent
                .toLowerCase()
                .includes(data.username.toLowerCase()) ||
              entry.textContent.toLowerCase().includes(data.email.toLowerCase())
            ) {
              entry.style.display = "block";
            } else {
              entry.style.display = "none";
            }
          });
        }
      });
    })
    .catch((error) => {
      console.error("Error searching leaderboard:", error);
    });

  if (searchValue === "") {
    fetchLeaderboard(); // Reset leaderboard if search input is empty
  }
});
