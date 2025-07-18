document.addEventListener("DOMContentLoaded", () => {

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

    //修改資料邏輯
    const infoManagementForm = document.querySelector(".member_main .infoManagement form");
    const formInputs = document.querySelectorAll(".member_main .infoManagement input");
    const editBtn = document.querySelector(".member_main .editBtn");
    const saveBtn = document.querySelector(".member_main .saveBtn");


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

    if (formInputs) {
        formInputs.forEach(input => {
            const savedValue = localStorage.getItem(input.name);
            if (savedValue !== null) {
                input.value = savedValue;
            }

            input.addEventListener("input", () => {
                localStorage.setItem(input.name, input.value);
            });
        });
    }

    if (infoManagementForm) {
        infoManagementForm.addEventListener("submit", (e) => {
            e.preventDefault();
            Swal.fire({
                title: "修改成功",
                text: "會員資料已成功更新！",
                icon: "success",
                confirmButtonText: "確定",
                background: '#fffbe6',
                color: '#333333',
                confirmButtonColor: '#ff8e3c'
            }).then(() => {
                window.location.href = "member.html";
            });
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
            }).then(() => {
                window.location.href = "login.html";
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
                    window.location.href = "member.html";
                });
            }

        });
    }

});