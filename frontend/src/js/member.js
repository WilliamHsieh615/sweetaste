import axios from 'axios';
import Swal from 'sweetalert2';

document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);

    // 會員資料修改成功提示
    if (urlParams.get("update") === "success") {
        Swal.fire({
            title: "修改成功",
            text: "會員資料已成功更新！",
            icon: "success",
            confirmButtonText: "確定",
            background: '#fffbe6',
            color: '#333333',
            confirmButtonColor: '#ff8e3c'
        });
    }

    // 密碼變更成功提示
    if (urlParams.get("msg") === "passwordChanged") {
        Swal.fire({
            title: "變更成功",
            text: "密碼已成功更新！",
            icon: "success",
            confirmButtonText: "確定",
            background: '#fffbe6',
            color: '#333333',
            confirmButtonColor: '#ff8e3c'
        });
    }

    // 選單
    const member_menu = document.querySelector(".member_main .menu");
    const infoManagement = document.querySelector(".member_main .infoManagement");
    const changePassword = document.querySelector(".member_main .changePassword")
    const orderInquiry = document.querySelector(".member_main .orderInquiry");

    if (infoManagement && changePassword && orderInquiry) {
        infoManagement.style.display = "flex";
        changePassword.style.display = "none";
        orderInquiry.style.display = "none";
    }

    if (member_menu) {
        member_menu.addEventListener("click", function (e) {
            e.preventDefault();
            if (e.target.textContent === "資料管理") {
                infoManagement.style.display = "flex";
                changePassword.style.display = "none";
                orderInquiry.style.display = "none";
            } else if (e.target.textContent === "密碼變更") {
                changePassword.style.display = "flex";
                infoManagement.style.display = "none";
                orderInquiry.style.display = "none";
            } else if (e.target.textContent === "訂單查詢") {
                orderInquiry.style.display = "flex";
                infoManagement.style.display = "none";
                changePassword.style.display = "none";
            }
        });
    }

    // 生日判斷
    const birthday = document.getElementById("birthday");
    const memberForm = document.querySelector(".member_main form")

    if (memberForm) {
        memberForm.addEventListener("submit", (e) => {
            const today = new Date();
            const inputDate = new Date(birthday.value);

            if (inputDate > today) {
                birthday.setCustomValidity("輸入錯誤");
                birthday.reportValidity(); // 觸發原生表單提示
                e.preventDefault();
            } else {
                birthday.setCustomValidity(""); // 清除錯誤
            }
        });
    }

    //修改按鈕邏輯
    const editBtn = document.querySelector(".member_main .editBtn");
    const saveBtn = document.querySelector(".member_main .saveBtn");
    const formInputs = document.querySelectorAll(".member_main .infoManagement input");

    if (saveBtn) saveBtn.style.display = "none";

    if (editBtn) {
        editBtn.addEventListener("click", () => {
            formInputs.forEach(input => {
                input.removeAttribute("readonly");
                input.removeAttribute("disabled");
            });

            saveBtn.style.display = "inline-block";
            editBtn.style.display = "none";
        });
    }

    // 登出
    const logoutBtn = document.querySelector(".logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();

            Swal.fire({
                title: "即將登出",
                text: '確定要登出嗎？',
                icon: "question",
                confirmButtonText: "確定",
                showCancelButton: true,
                cancelButtonText: "取消",
                background: '#fffbe6',
                color: '#333333',
                confirmButtonColor: '#ff8e3c',
                cancelButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    return Swal.fire({
                        title: "已登出",
                        text: '歡迎再次光臨！',
                        icon: "success",
                        confirmButtonText: "確定",
                        background: '#fffbe6',
                        color: '#333333',
                        confirmButtonColor: '#ff8e3c',
                    });
                }
                return Promise.reject('cancelled');
            }).then((result) => {
                if (result.isConfirmed) {
                    sessionStorage.removeItem("isLogin");

                    const contextPath = '/' + window.location.pathname.split('/')[1];
                    window.location.href = contextPath + "/logout";
                }
            });
        });
    }

    // 密碼確認
    const changePasswordForm = document.querySelector(".member_main .changePassword form");

    if (changePasswordForm) {
        const passwordInput = changePasswordForm.querySelector(".setPassword");
        const confirmInput = changePasswordForm.querySelector(".confirmPassword");
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
        const titleMessage = "請輸入 6~12 碼英數字混合密碼";

        changePasswordForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!passwordInput.value) {
                alert("尚未輸入新密碼");
                passwordInput?.focus();
                return;
            } else if (!confirmInput.value) {
                alert("尚未再次輸入新密碼");
                confirmInput?.focus();
                return;
            } else if (!passwordPattern.test(passwordInput.value)) {
                alert(titleMessage);
                passwordInput?.focus();
                return;
            } else if (!passwordPattern.test(confirmInput.value)) {
                alert(titleMessage);
                confirmInput?.focus();
                return;
            } else if (passwordInput.value !== confirmInput.value) {
                alert("密碼輸入不一致");
                confirmInput?.focus();
                return;
            } else {
                Swal.fire({
                    title: "變更成功",
                    text: "密碼已成功更新！",
                    icon: "success",
                    confirmButtonText: "確定",
                    background: '#fffbe6',
                    color: '#333333',
                    confirmButtonColor: '#ff8e3c'
                }).then(() => {
                    window.location.href = "member.jsp";
                });
            }
        });
    }

    // 訂單
    const orderInquiryContainer = document.querySelector(".orderInquiry");
    const memberId = Number(sessionStorage.getItem("memberId"));

    if (!orderInquiryContainer || !memberId) return;

    axios.get(`/Sweetast/order-list?memberId=${memberId}`)
        .then(res => {
            const orders = res.data;

            const statusMap = {
                pending: "待出貨",
                shipped: "已出貨",
                delivered: "已送達",
                canceled: "已取消"
            };

            orders.forEach(order => {
                const table = document.createElement("table");

                const itemsHTML = order.items.map(item =>
                    `<li>${item.productName} x${item.quantity}｜NT$ ${item.price * item.quantity}</li>`
                ).join("");

                const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const freight = subtotal > 0 ? 60 : 0;
                const total = subtotal + freight;

                table.innerHTML = `
                    <tr><th>訂單日期</th><td>${order.orderDate.split("T")[0]}</td></tr>
                    <tr><th>訂單編號</th><td>ST${order.orderDate.replace(/[-:\s]/g, "").slice(0, 12)}</td></tr>
                    <tr><th>收貨人</th><td>${order.recipientName}</td></tr>
                    <tr><th>電話</th><td>${order.recipientPhone}</td></tr>
                    <tr><th>地址</th><td>${order.address}</td></tr>
                    <tr>
                        <th>明細</th>
                        <td class="item_container">
                            <div class="orderSummary">
                                <h4>訂單摘要</h4>
                                <ul>
                                    <li>小計：NT$ ${subtotal}</li>
                                    <li>運費：NT$ ${freight}</li>
                                    <li>總計：NT$ ${total}</li>
                                </ul>
                            </div>
                            <div class="shoppingList">
                                <h4>購物清單</h4>
                                <ul class="item_container">${itemsHTML}</ul>
                            </div>
                        </td>
                    </tr>
                    <tr><th>訂單狀態</th><td>${statusMap[order.shippingStatus] || "未知"}</td></tr>
                `;

                orderInquiryContainer.appendChild(table);
            });
        })
        .catch(err => {
            console.error(err);
            orderInquiryContainer.innerHTML = "<p style='magin: 100px auto; font-size: 20px;'>查詢失敗，請稍後再試。</p>";
        });

});