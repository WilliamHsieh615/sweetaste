import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

Swiper.use([Swiper.Navigation, Swiper.Autoplay, Swiper.Mousewheel]);

import {
    allProductStr,
    selectProductStr,
    referralProductStr,
    newProductStr,
    loadProducts
} from './product.js';

let swiperInstance = null;

function renderSwiper(str) {
    const index_meals = document.querySelector(".index_main .meals");
    if (!index_meals) return;

    index_meals.innerHTML = str.replace(/class="product"/g, 'class="product swiper-slide"');

    // 重複點擊不同分類前，銷毀原本的 Swiper，避免記憶體堆疊
    if (swiperInstance) swiperInstance.destroy(true, true);

    swiperInstance = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        mousewheel: true,
        breakpoints: {
            550: { slidesPerView: 2 },
            850: { slidesPerView: 3 },
        },
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const index_list = document.querySelector(".index_banner .list");

    await loadProducts();
    renderSwiper(allProductStr);

    if (index_list) {
        index_list.addEventListener("click", (e) => {
            if (e.target.textContent === "本日精選") {
                renderSwiper(selectProductStr);
            } else if (e.target.textContent === "人氣推薦") {
                renderSwiper(referralProductStr);
            } else if (e.target.textContent === "新品上市") {
                renderSwiper(newProductStr);
            }
        });
    }
});