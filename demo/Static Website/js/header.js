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

