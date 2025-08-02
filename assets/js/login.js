import { db, auth } from "./firebase-config.js";

const inpEmail = document.querySelector("input[type='email']");
const inpPwd = document.querySelector("input[type='password']");
const loginForm = document.querySelector("form");

const now = new Date().getTime();
const userSession = JSON.parse(localStorage.getItem("user_session")) || null;

if (userSession != null || userSession) {
  if (now < userSession?.expiry) {
    window.location.href = "/index.html";
  }
}

function handleLogin(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  let email = inpEmail.value;
  let password = inpPwd.value;

  // Kiểm tra các trường có trống không
  if (!email || !password) {
    alert("Vui lòng điền đủ thông tin");
    return;
  }

  // Đăng nhập với Firebase Auth
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert("Đăng nhập thành công");

      // Thiết lập phiên hoặc lưu thông tin đăng nhập
      // Tạo đối tượng user session
      const userSession = {
        username: user.displayName,
        user: user,
        expiry: new Date().getTime() + 2 * 60 * 60 * 1000, // 2 tiếng
      };

      // Lưu vào localStorage
      localStorage.setItem("user_session", JSON.stringify(userSession));

      // Chuyển hướng tới trang chủ
      window.location.href = "/index.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Mật khẩu không đúng");
    });
}

loginForm.addEventListener("submit", handleLogin);
