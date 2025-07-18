document.addEventListener("DOMContentLoaded", () => {

    let shoppingCart = [];

    // 加入商品事件
    [...document.querySelectorAll(".meals")].forEach(container => {
        container.addEventListener("click", function (e) {
            if (e.target.classList.contains("add_to_cart")) {
                e.preventDefault();
                const productItem = e.target.closest(".product");
                const name = productItem.querySelector(".name").textContent;
                const price = Number(productItem.querySelector(".price").textContent.replace("NT$ ", ""));
                const photo = productItem.querySelector("img").src;

                const productData = { name, price, photo, quantity: 1 };
                addToCart(productData);
            }
        });
    });

    // 加入購物車
    function addToCart(productData) {
        const index = shoppingCart.findIndex(item => item.name === productData.name);
        if (index > -1) {
            shoppingCart[index].quantity++;
        } else {
            shoppingCart.push(productData);
        }
        saveCartToLocalStorage();
        renderCart();
        renderTransactionDetail();
        updateCartCount();
    }

    function saveCartToLocalStorage() {
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }

    function loadCartFromLocalStorage() {
        const data = localStorage.getItem("shoppingCart");
        shoppingCart = data ? JSON.parse(data) : [];
    }

    loadCartFromLocalStorage();

    const cart_list = document.querySelector(".cart_main .cart .list");

    function renderCart() {
        if (!cart_list) return;
        cart_list.innerHTML = shoppingCart.length === 0 ? `<li class="cart_is_empty">您尚未加入任何商品</li>` : "";

        shoppingCart.forEach((item, index) => {
            const sum = item.price * item.quantity;
            const li = document.createElement("li");
            li.className = "item";
            li.innerHTML = `
            <img src="${item.photo}" alt="${item.name}">
            <div class="info">
                <div class="name">
                    <h3>${item.name}</h3>
                    <p class="price">NT$ ${item.price}</p>
                </div>
                <div class="amount">
                    <a href="#" class="minus" data-index="${index}">-</a>
                    <p class="number">${item.quantity}</p>
                    <a href="#" class="plus" data-index="${index}">+</a>
                </div>
            </div>
            <p class="sum">NT$ ${sum}</p>
            <a href="#" class="bi bi-trash3-fill trashIcon" data-index="${index}"></a>`;
            cart_list.appendChild(li);
        });

        // 判斷購物車是否為空，設定結帳按鈕狀態
        const checkoutBtn = document.querySelector('.checkoutButton');
        if (checkoutBtn) {
            if (shoppingCart.length === 0) {
                checkoutBtn.classList.add('disabled');
                checkoutBtn.style.pointerEvents = 'none'; 
                checkoutBtn.style.opacity = '0.5';
                checkoutBtn.href = '#'; 
            } else {
                checkoutBtn.classList.remove('disabled');
                checkoutBtn.style.pointerEvents = 'auto';
                checkoutBtn.style.opacity = '1';
                checkoutBtn.href = 'checkout-delivery.jsp';
            }
        }

        bindCartEvents();
        renderCheckoutSummary();
        bindSwipeEvents();
    }


    function bindCartEvents() {
        cart_list.querySelectorAll(".minus").forEach(btn => btn.addEventListener("click", updateQty));
        cart_list.querySelectorAll(".plus").forEach(btn => btn.addEventListener("click", updateQty));
        cart_list.querySelectorAll(".trashIcon").forEach(btn => btn.addEventListener("click", removeItem));
    }

    function updateQty(e) {
        e.preventDefault();
        const idx = e.target.dataset.index;
        if (e.target.classList.contains("minus")) {
            shoppingCart[idx].quantity--;
            if (shoppingCart[idx].quantity <= 0) shoppingCart.splice(idx, 1);
        } else {
            shoppingCart[idx].quantity++;
        }
        saveCartToLocalStorage();
        renderCart();
        renderTransactionDetail();
        updateCartCount();
    }

    function removeItem(e) {
        e.preventDefault();
        const idx = e.target.dataset.index;
        shoppingCart.splice(idx, 1);
        saveCartToLocalStorage();
        renderCart();
        renderTransactionDetail();
        updateCartCount();
    }

    function renderCheckoutSummary() {
        const container = document.querySelector('.transactionSummary');
        if (!container) return;
        const subtotal = shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const freight = subtotal > 0 ? 60 : 0;
        const total = subtotal + freight;
        container.querySelector('.subtotal p').textContent = `NT$ ${subtotal}`;
        container.querySelector('.freight p').textContent = `NT$ ${freight}`;
        container.querySelector('.total p').textContent = `NT$ ${total}`;
    }

    function renderTransactionDetail() {
        const container = document.querySelector(".transactionDetail");
        if (!container) return;

        const subtotal = shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const freight = subtotal > 0 ? 60 : 0;
        const total = subtotal + freight;

        container.querySelector(".subtotal p").textContent = `NT$ ${subtotal}`;
        container.querySelector(".freight p").textContent = `NT$ ${freight}`;
        container.querySelector(".total p").textContent = `NT$ ${total}`;

        const ul = container.querySelector(".item_container");
        ul.innerHTML = shoppingCart.length === 0 ? `<li>購物車是空的</li>` : "";

        shoppingCart.forEach(item => {
            const sum = item.price * item.quantity;
            const li = document.createElement("li");
            li.className = "item";
            li.innerHTML = `
        <img src="${item.photo}" alt="${item.name}">
        <div class="info">
          <h4>${item.name}</h4>
          <p class="price">NT$ ${item.price}</p>
          <p class="amount">${item.quantity} 件</p>
          <div class="sum">NT$ ${sum}</div>
        </div>`;
            ul.appendChild(li);
        });
    }

    function updateCartCount() {
        const cartCountEl = document.querySelector(".cart_count");
        const totalCount = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);

        if (cartCountEl) {
            cartCountEl.textContent = totalCount;
            cartCountEl.style.display = totalCount > 0 ? "inline-block" : "none";
        }
    }

    function bindSwipeEvents() {
        document.querySelectorAll('.cart_main .item').forEach(item => {
            let startX = 0;

            // 避免重複綁定：先移除舊的 listener
            item.ontouchstart = null;
            item.ontouchend = null;

            item.addEventListener('touchstart', e => {
                startX = e.touches[0].clientX;
            });

            item.addEventListener('touchend', e => {
                const endX = e.changedTouches[0].clientX;
                const diffX = startX - endX;

                if (diffX > 50) {
                    document.querySelectorAll('.cart_main .item').forEach(el => {
                        el.classList.remove('show-trash');
                    });
                    item.classList.add('show-trash');
                }

                if (diffX < -30) {
                    item.classList.remove('show-trash');
                }
            });
        });
    }

    renderCart();
    renderTransactionDetail();
    updateCartCount();
});
