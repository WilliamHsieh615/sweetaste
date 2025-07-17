import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("error") === "1") {
        Swal.fire({
            title: "登入失敗",
            text: "帳號或密碼錯誤，請重新輸入！",
            icon: "error",
            confirmButtonText: "確定",
            background: '#fffbe6',
            color: '#333333',
            confirmButtonColor: '#ff8e3c'
        });
    } else if (params.get("error") === "2") {
        Swal.fire({
            title: "系統錯誤",
            text: "請稍後再試",
            icon: "warning",
            confirmButtonText: "確定",
            background: '#fffbe6',
            color: '#333333',
            confirmButtonColor: '#ff8e3c'
        });
    }

    const emailInput = document.getElementById("account");
    const rememberCheckbox = document.getElementById("remember");
    const form = document.querySelector("form");

    // 自動填入記住的帳號
    const savedAccount = Cookies.get("rememberedAccount");
    if (savedAccount && emailInput) {
        emailInput.value = savedAccount;
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }

    // 表單送出時處理記住帳號
    if (form && emailInput && rememberCheckbox) {
        form.addEventListener("submit", () => {
            const account = emailInput.value;
            const remember = rememberCheckbox.checked;

            if (remember) {
                Cookies.set("rememberedAccount", account, { expires: 7 });
            } else {
                Cookies.remove("rememberedAccount");
            }
        });
    }
});

