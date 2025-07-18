import axios from "axios";
import Swal from 'sweetalert2';

document.addEventListener("DOMContentLoaded", () => {
    const retrieveForm = document.querySelector(".retrieve_main form");

    if (!retrieveForm) return;

    const passwordInput = retrieveForm.querySelector(".setPassword");
    const confirmInput = retrieveForm.querySelector(".confirmPassword");
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    const titleMessage = "請輸入 6~12 碼英數字混合密碼";

    retrieveForm.addEventListener("submit", (e) => {

        e.preventDefault();

        if (!passwordInput.value) {
            alert("尚未輸入新密碼");
            passwordInput?.focus();
            return;
        }

        if (!confirmInput.value) {
            alert("尚未再次輸入新密碼");
            confirmInput?.focus();
            return;
        }

        if (!passwordPattern.test(passwordInput.value)) {
            alert(titleMessage);
            passwordInput?.focus();
            return;
        }

        if (!passwordPattern.test(confirmInput.value)) {
            alert(titleMessage);
            confirmInput?.focus();
            return;
        }

        if (passwordInput.value !== confirmInput.value) {
            alert("密碼輸入不一致");
            confirmInput?.focus();
            return;
        }

        // 取得欄位值
        const account = retrieveForm.querySelector("#account")?.value.trim();
        const password = retrieveForm.querySelector("#password")?.value.trim();

        if (!account || !password) {
            alert("請輸入帳號與新密碼");
            return;
        }

        // 檢查驗證碼是否完整
        const codeInputs = retrieveForm.querySelectorAll(".codeInput");
        const code = Array.from(codeInputs).map(input => input.value.trim()).join('');
        if (code.length !== 4) {
            alert("請輸入完整四位數驗證碼");
            return;
        }

        // 準備送出資料
        const formData = new FormData(retrieveForm);
        formData.set("code", code); // 合併後的驗證碼

        const urlEncodedData = new URLSearchParams([...formData]);

        axios.post(retrieveForm.action, urlEncodedData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
            .then((response) => {
                let res = response.data;
                if (typeof res === "string") {
                    try {
                        res = JSON.parse(res);
                    } catch {
                        console.log("伺服器回傳格式錯誤");
                        return;
                    }
                }
                if (res.success) {
                    Swal.fire({
                        title: "密碼重設成功",
                        text: "請重新登入！",
                        icon: "success",
                        confirmButtonText: "確定",
                        background: '#fffbe6',
                        color: '#333333',
                        confirmButtonColor: '#ff8e3c'
                    }).then(() => {
                        window.location.href = "login.jsp";
                    });
                } else {
                    Swal.fire({
                        title: "密碼重設失敗",
                        text: `${res.message || "未知錯誤，請聯絡客服"}`,
                        icon: "error",
                        confirmButtonText: "確定",
                        background: '#fffbe6',
                        color: '#333333',
                        confirmButtonColor: '#ff8e3c'
                    });
                }
            })
            .catch((error) => {
                console.error("提交發生錯誤", error);
                Swal.fire({
                    title: "系統錯誤",
                    text: "請稍後再試",
                    icon: "warning",
                    confirmButtonText: "確定",
                    background: '#fffbe6',
                    color: '#333333',
                    confirmButtonColor: '#ff8e3c'
                });
            });
    });
});
