import axios from 'axios';
import Swal from 'sweetalert2';

$(document).on('click', '.hamburgerMenu', function (e) {
  e.preventDefault();
  $('header .list').toggleClass('showMenu');
});

// 購物車
function updateCartCount() {
  const cartCount = document.querySelector(".cart_count");
  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  const totalCount = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCount) {
    cartCount.textContent = totalCount;
    cartCount.style.display = totalCount > 0 ? "inline-block" : "none";
  }
}

window.updateCartCount = updateCartCount;

// 登入與會員按鈕切換
function updateLoginStatusUI() {
  // 動態取得 contextPath（專案名稱）
  const contextPath = '/' + window.location.pathname.split('/')[1];

  axios.get(`${contextPath}/login-status`)
    .then(res => {
      const isLogin = res.data.isLogin;
      const loginLink = document.querySelector('.loginLink');
      const memberLink = document.querySelector('.memberLink');

      const prevLogin = sessionStorage.getItem("isLogin") === "true";

      if (loginLink && memberLink) {
        loginLink.style.display = isLogin ? "none" : "block";
        memberLink.style.display = isLogin ? "block" : "none";
      }

      if (!prevLogin && isLogin) {
        const urlParams = new URLSearchParams(window.location.search);
        const justLoggedIn = urlParams.get("justLoggedIn") === "true";

        if (justLoggedIn) {
          Swal.fire({
            icon: 'success',
            title: '登入成功',
            text: '親愛的貴賓 歡迎回來！!',
            confirmButtonText: '確定',
            background: '#fffbe6',
            color: '#333333',
            confirmButtonColor: '#ff8e3c',
          }).then(() => {
            // 清掉網址上的 justLoggedIn 參數，避免重新整理又跳
            const cleanURL = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, cleanURL);
          });
        }
      }

      // 控制購物車點擊
      const cartLink = document.querySelector('.cartLink');
      if (cartLink) {
        cartLink.addEventListener("click", (e) => {
          if (!isLogin) {
            e.preventDefault();
            window.location.href = "login.jsp";
          }
        });
      }

      // 更新 sessionStorage
      sessionStorage.setItem("isLogin", isLogin.toString());
    })
    .catch(err => {
      console.error("無法取得登入狀態：", err);
    });
}

window.updateLoginStatusUI = updateLoginStatusUI;

