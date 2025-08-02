const user_info_display = document.querySelector(".dropdown-menu");
const user_session = JSON.parse(localStorage.getItem("user_session")) || null;
const userDisplayButton = document.querySelector(".dropdown-btn");

user_info_display.classList.add("hidden");

if (user_session) {
  const now = new Date().getTime();
  if (now < user_session.expiry) {
    // Hiển thị thông tin người dùng
    user_info_display.innerHTML = `
            <a href="#!">
                <span class="username">${user_session.user.providerData[0].uid}</span>
            </a>

                <a href="./login.html" class="logout-link">Logout</a>

        `;
    // Thêm sự kiện click cho đăng xuất
    document.querySelector("a.logout-link").addEventListener("click", () => {
      localStorage.removeItem("user_session");
      sessionStorage.removeItem("quiz_data");
      window.location.href = "./login.html";
    });
  }
} else {
  userDisplayButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
    </svg>
`;
}
