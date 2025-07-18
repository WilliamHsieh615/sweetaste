document.addEventListener("DOMContentLoaded", () => {
    // 載入 header
    axios.get("../html/header.html")
        .then(res => {
            document.getElementById("header").innerHTML = res.data;
            setTimeout(() => {
                if (typeof updateCartCount === 'function') updateCartCount();
                if (typeof renderMailchimpForm === 'function') renderMailchimpForm();
            }, 0);
        })
        .catch(err => console.error("載入 header 發生錯誤：", err));

    // 載入 footer
    axios.get("../html/footer.html")
        .then(res => {
            document.getElementById("footer").innerHTML = res.data;
        })
        .catch(err => console.error("載入 footer 發生錯誤：", err));

    // 等 hash anchor 平滑滾動
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }, 100); // 延遲時間視內容載入狀況微調
    }
});