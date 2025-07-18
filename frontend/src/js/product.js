import axios from "axios";

// 供 index.js 使用
export let allProductStr = "";
export let selectProductStr = "";
export let referralProductStr = "";
export let newProductStr = "";
export const loadProducts = () =>
    axios.get("assets/data/products.json").then(({ data }) => {
        console.log("產品資料載入成功", data);
        buildLists(data);
        if (document.querySelector(".product_main")) {
            mountProductPage(data);
        }
        return data;
    });

// index.js 與 priduct.js 共用
const ITEMS_PER_PAGE = 10;
const getRandomGroups = (src, size, groups) => {
    const copied = [...src];
    return Array.from({ length: groups }, () =>
        Array.from({ length: size }, () => copied.splice(Math.random() * copied.length | 0, 1)[0])
    );
};
const productTpl = (item, label = "") => `
<li class="product">
  ${label ? `<span class="tag">${label}</span>` : ""}
  <img src="/Sweetaste/assets/images/products/${item.photo}" alt="${item.name}">
  <ul>
    <li class="name">${item.name}</li>
    <li class="price">NT$ ${item.price}</li>
  </ul>
  <a href="#" class="add_to_cart">加入購物車</a>
</li>`;

// 產生四個商品字串給 index.html 使用
function buildLists(products) {
    const [todayPicks, bestSellers, newArrivals] = getRandomGroups(products, 5, 3);
    const getLabel = (i) =>
        todayPicks.includes(i) ? "本日精選" :
            bestSellers.includes(i) ? "人氣精選" :
                newArrivals.includes(i) ? "新品上市" : "";

    allProductStr = products.map((i) => productTpl(i, getLabel(i))).join("");
    selectProductStr = todayPicks.map((i) => productTpl(i, "本日精選")).join("");
    referralProductStr = bestSellers.map((i) => productTpl(i, "人氣精選")).join("");
    newProductStr = newArrivals.map((i) => productTpl(i, "新品上市")).join("");
}

function mountProductPage(products) {

    const mealsEl = document.querySelector(".product_main .meals");
    const menuEl = document.querySelector(".product_main .menu");
    const pagerEl = document.querySelector(".pagenation");

    // 分類商品
    const [todayPicks, bestSellers, newArrivals] = getRandomGroups([...products], 5, 3);
    const lists = {
        all: products,
        select: todayPicks,
        referral: bestSellers,
        newOne: newArrivals,
    };

    // 動態更新 menu 上的數字
    menuEl.querySelector(".all").textContent = `所有甜點 (${lists.all.length})`;
    menuEl.querySelector(".select").textContent = `本日精選 (${lists.select.length})`;
    menuEl.querySelector(".referral").textContent = `人氣精選 (${lists.referral.length})`;
    menuEl.querySelector(".new").textContent = `新品上市 (${lists.newOne.length})`;

    // 分頁核心
    let currentCategory = "all";
    let currentPage = 1;

    const renderPage = () => {
        const list = lists[currentCategory];
        const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);

        // 切 10 筆
        const slice = list.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
        mealsEl.innerHTML = slice
            .map((i) => {
                const label =
                    currentCategory === "select" ? "本日精選" :
                        currentCategory === "referral" ? "人氣精選" :
                            currentCategory === "newOne" ? "新品上市" : "";
                return productTpl(i, label);
            })
            .join("");

        // 重新產生分頁
        let pagerHTML = `<a href="#" class="bi bi-caret-left-fill eft_arrow"></a>`;
        for (let p = 1; p <= totalPages; p++) {
            pagerHTML += `<a href="#" class="${p === currentPage ? "active" : ""}">${p}</a>`;
        }
        pagerHTML += `<a href="#" class="bi bi-caret-right-fill right_arrow"></a>`;
        pagerEl.innerHTML = pagerHTML;
    };

    //監聽 menu：換分類就從第 1 頁開始
    menuEl.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.matches(".all, .select, .referral, .new")) {
            currentCategory =
                e.target.classList.contains("all") ? "all" :
                    e.target.classList.contains("select") ? "select" :
                        e.target.classList.contains("referral") ? "referral" : "newOne";
            currentPage = 1;
            renderPage();
        }
    });

    // 監聽分頁
    pagerEl.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("eft_arrow")) {
            currentPage = Math.max(1, currentPage - 1);
        } else if (e.target.classList.contains("right_arrow")) {
            const total = Math.ceil(lists[currentCategory].length / ITEMS_PER_PAGE);
            currentPage = Math.min(total, currentPage + 1);
        } else if (/^\d+$/.test(e.target.textContent)) {
            currentPage = Number(e.target.textContent);
        } else {
            return;
        }
        renderPage();
    });

    // 首次渲染
    renderPage();
}

// index.html 需要立即載入資料
loadProducts();







