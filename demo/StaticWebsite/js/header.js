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

function isUserLoggedIn() {
  return sessionStorage.getItem("isLogin") === "true";
}

// 登入與登出
function updateAuthButtons() {
  const loginLink = document.querySelector(".loginLink");
  const memberLink = document.querySelector(".memberLink");

  if (!loginLink || !memberLink) return;

  if (isUserLoggedIn()) {
    loginLink.style.display = "none";
    memberLink.style.display = "block";
  } else {
    loginLink.style.display = "block";
    memberLink.style.display = "none";
  }
}
window.updateAuthButtons = updateAuthButtons;

