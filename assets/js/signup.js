import { db, auth } from "./firebase-config.js";
const signupForm = document.querySelector(".reg-form");
const usn_input = document.querySelector("input[name='username']");
const email_input = document.querySelector("input[name='email']");
const password_input = document.querySelector("input[name='pw']");
const cf_password_input = document.querySelector("input[name='cfpw']");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const usn = usn_input.value;
  const email = email_input.value.trim();
  const password = password_input.value.trim();
  const cf_password = cf_password_input.value.trim();

  if (!usn || !email || !password || !cf_password) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== cf_password) {
    alert("Passwords do not match.");
    return;
  }

  const userData = {
    username: usn,
    displayName: usn,
    email,
    role_id: 2,
    created_at: new Date().toISOString(), // Thêm thời gian tạo tài khoản
  }; // Mặc định là quyền của guest (1: Admin, 2: User)
  // Tạo tài khoản với Firebase Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log(userCredential);
      const user = userCredential.user;

      // Thêm thông tin người dùng vào Firestore
      db.collection("users")
        .add(userData)
        .then(() => {
          alert("Registration successful");
          window.location.href = "/login.html"; // Redirect to login page after successful registration
        })
        .catch((error) => {
          alert("Registration failed: " + error.message);
          console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(`Lỗi: ${errorMessage}`);
      console.error("Error during registration:", errorMessage);
    });
});
