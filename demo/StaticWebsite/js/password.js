document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.querySelector(".register_main form");
    const retrieveForm = document.querySelector(".retrieve_main form");
    const memberForm = document.querySelector(".member_main .changePassword form");
    const loginForm = document.querySelector(".login_main form");

    const allPasswordForms = [registerForm, retrieveForm, memberForm];

    if (allPasswordForms) {

        allPasswordForms.forEach((form) => {
            if (!form) return;

            const passwordInput = form.querySelector(".setPassword");
            const confirmInput = form.querySelector(".confirmPassword");
            const tips = form.querySelector(".tips");
            const matchTip = form.querySelector(".matchTip");

            if (!passwordInput || !confirmInput || !tips || !matchTip) return;

            // 建立提示區塊
            tips.innerHTML = `
                <li class="length-tip"><i class="bi bi-exclamation-circle-fill exclamation-circle"></i> 長度需為 6~12 碼</li>
                <li class="letter-tip"><i class="bi bi-exclamation-circle-fill exclamation-circle"></i> 至少 1 個英文字母</li>
                <li class="digit-tip"><i class="bi bi-exclamation-circle-fill exclamation-circle"></i> 至少 1 個數字</li>
            `;

            // 即時檢查格式
            passwordInput.addEventListener("input", () => {

                const val = passwordInput.value;

                if (val === "") {
                    tips.innerHTML = `
                        <li class="length-tip"><i class="bi bi-exclamation-circle-fill exclamation-circle"></i> 長度需為 6~12 碼</li>
                        <li class="letter-tip"><i class="bi bi-exclamation-circle-fill exclamation-circle"></i> 至少 1 個英文字母</li>
                        <li class="digit-tip"><i class="bi bi-exclamation-circle-fill exclamation-circle"></i> 至少 1 個數字</li>
                    `;
                } else {
                    tips.querySelector(".length-tip").innerHTML = val.length >= 6 && val.length <= 12
                        ? `<i class="bi bi-check-circle-fill check-circle"></i> 長度符合`
                        : `<i class="bi bi-x-circle-fill x-circle"></i> 長度需為 6~12 碼`;

                    tips.querySelector(".letter-tip").innerHTML = /[A-Za-z]/.test(val)
                        ? `<i class="bi bi-check-circle-fill check-circle"></i> 含有英文字母`
                        : `<i class="bi bi-x-circle-fill x-circle"></i> 至少 1 個英文字母`;

                    tips.querySelector(".digit-tip").innerHTML = /\d/.test(val)
                        ? `<i class="bi bi-check-circle-fill check-circle"></i> 含有數字`
                        : `<i class="bi bi-x-circle-fill x-circle"></i> 至少 1 個數字`;
                }
            });

            matchTip.innerHTML = `<i class="bi bi-exclamation-circle-fill exclamation-circle"></i> 尚未再次輸入密碼`;

            // 即時驗證密碼一致性
            confirmInput.addEventListener("input", () => {
                if (confirmInput.value === "") {
                    matchTip.innerHTML = `<i class="bi bi-exclamation-circle-fill exclamation-circle"></i> 尚未再次輸入密碼`;
                } else if (passwordInput.value === confirmInput.value) {
                    matchTip.innerHTML = `<i class="bi bi-check-circle-fill check-circle"></i> 密碼一致`;
                } else {
                    matchTip.innerHTML = `<i class="bi bi-x-circle-fill x-circle"></i> 密碼不一致`;
                }
            });

            // 顯示密碼/隱藏密碼
            const allPasswordSection = form.querySelectorAll(".password");
            allPasswordSection.forEach((passwordSection) => {
                const input = passwordSection.querySelector(".password_input");
                const eyeIcon = passwordSection.querySelector(".eye_icon");

                if (!input || !eyeIcon) return;

                eyeIcon.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (input.type === "password") {
                        input.type = "text";
                        eyeIcon.classList.remove("bi-eye-slash-fill");
                        eyeIcon.classList.add("bi-eye-fill");
                    } else if (input.type === "text") {
                        input.type = "password";
                        eyeIcon.classList.remove("bi-eye-fill");
                        eyeIcon.classList.add("bi-eye-slash-fill");
                    }
                });
            });

        });
    }

    // login 的 顯示密碼與隱藏密碼
    if (loginForm) {

        const loginPasswordSection = loginForm.querySelector(".password");
        const loginInput = loginPasswordSection.querySelector(".password_input");
        const loginEyeIcon = loginPasswordSection.querySelector(".eye_icon");
        loginEyeIcon.addEventListener("click", (e) => {
            e.preventDefault();
            if (loginInput.type === "password") {
                loginInput.type = "text";
                loginEyeIcon.classList.remove("bi-eye-slash-fill");
                loginEyeIcon.classList.add("bi-eye-fill");
            } else if (loginInput.type === "text") {
                loginInput.type = "password";
                loginEyeIcon.classList.remove("bi-eye-fill");
                loginEyeIcon.classList.add("bi-eye-slash-fill");
            }
        });
    }

});