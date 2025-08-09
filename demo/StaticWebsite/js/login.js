document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector(".login_main form");

    if (!loginForm) return;

    const emailInput = loginForm.querySelector(".account_input");
    const rememberCheckbox = loginForm.querySelector(".remember_checkbox");

    // 自動填入記住的帳號
    const savedAccount = Cookies.get("rememberedAccount");
    if (savedAccount && emailInput) {
        emailInput.value = savedAccount;
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            Swal.fire({
                icon: 'success',
                title: '登入成功',
                text: '親愛的貴賓 歡迎回來！!',
                confirmButtonText: '確定',
                background: '#fffbe6',
                color: '#333333',
                confirmButtonColor: '#ff8e3c',
            }).then(() => {
                sessionStorage.setItem("isLogin", "true");
                updateAuthButtons();
                window.location.href = "member.html";
            });

            if (emailInput && rememberCheckbox) {
                const account = emailInput.value;
                const remember = rememberCheckbox.checked;

                if (remember) {
                    Cookies.set("rememberedAccount", account, { expires: 7 });
                } else {
                    Cookies.remove("rememberedAccount");
                }
            }

        });
    }

});


