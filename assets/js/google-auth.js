import {
  signInWithPopup,
  GoogleAuthProvider,
  browserPopupRedirectResolver,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { auth } from "./firebase-config.js";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts");

document.querySelector(".google-reg").addEventListener("click", () => {
  signInWithPopup(auth, provider, browserPopupRedirectResolver)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      alert("Login successful with Google");
      // Tạo đối tượng user session
      const userSession = {
        username: user.providerData[0].uid,
        user: user,
        expiry: new Date().getTime() + 2 * 60 * 60 * 1000, // 2 tiếng
      };
      // Lưu vào localStorage
      localStorage.setItem("user_session", JSON.stringify(userSession));
      window.location.href = "./gallery.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});
