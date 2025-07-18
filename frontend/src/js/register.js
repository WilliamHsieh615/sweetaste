import axios from "axios";
import Swal from 'sweetalert2';

document.addEventListener("DOMContentLoaded", () => {

    const policyAndTermsContent = document.querySelector(".policyAndTerms_content");
    const privacyPolicyLink = document.querySelector(".privacy-policy_link");
    const termsOfServiceLink = document.querySelector(".terms-of-service_link");
    const privacyTermsCheckbox = document.querySelector(".privacyTerms_checkbox")
    const mamberTermsCheckbox = document.querySelector(".mamberTerms_checkbox");

    if (privacyPolicyLink && termsOfServiceLink && policyAndTermsContent) {

        policyAndTermsContent.style.opacity = 0;
        policyAndTermsContent.style.zIndex = -1;
        privacyTermsCheckbox.disabled = true;
        mamberTermsCheckbox.disabled = true;

        privacyPolicyLink.addEventListener("click", (e) => {
            e.preventDefault();
            policyAndTermsContent.innerHTML =
                `<h1>隱私政策</h1>
                <p>歡迎您使用本網站（以下簡稱「本網站」）。為保障您的個人資料與隱私權益，請詳細閱讀以下隱私政策。</p>
                <h2>一、個人資料的蒐集</h2>
                <p>當您註冊會員、訂閱電子報、或使用本網站服務時，我們可能會蒐集下列資訊：</p>
                <ul>
                    <li>姓名、電子郵件、電話號碼、地址等基本資料</li>
                    <li>登入帳號與密碼</li>
                    <li>交易紀錄、瀏覽行為、IP位址</li>
                </ul>
                <h2>二、資料使用目的</h2>
                <p>我們將您的個人資料用於以下目的：</p>
                <ul>
                    <li>提供商品或服務</li>
                    <li>行銷與活動通知</li>
                    <li>統計與資料分析（僅使用匿名資訊）</li>
                    <li>回應使用者諮詢或客服需求</li>
                </ul>
                <h2>三、資料分享與第三方</h2>
                <p>除非法律規定或經您同意，我們不會將您的個人資料揭露予第三方。但下列情況除外：</p>
                <ul>
                    <li>法律或政府機關要求</li>
                    <li>與合作之第三方供應商協助提供服務（如物流、金流）</li>
                </ul>
                <h2>四、Cookie 使用</h2>
                <p>本網站可能使用 Cookie 來記錄您的偏好設定與網站操作行為，以改善使用體驗。您可以在瀏覽器中選擇停用 Cookie。</p>
                <h2>五、資料保護</h2>
                <p>我們採取合理的技術與管理措施，保障您的個人資料安全，防止未經授權之存取或洩漏。</p>
                <h2>六、隱私權政策修改</h2>
                <p>我們保留隨時修改本政策之權利，更新後將公告於網站。</p>
                <h2>七、聯絡方式</h2>
                <p>若您對本隱私政策有任何問題，請來信聯絡我們：<a href="mailto:sweetaste@email.com">sweetaste@email.com</a></p>
                <a href="#" class="bi bi-x-square close"></a>`;

            policyAndTermsContent.style.opacity = 1;
            policyAndTermsContent.style.zIndex = 1;
            privacyTermsCheckbox.disabled = false;

            bindCloseEvent();
        });

        termsOfServiceLink.addEventListener("click", (e) => {
            e.preventDefault();
            policyAndTermsContent.innerHTML =
                `<h1>會員條款</h1>
                <p>本會員條款（以下簡稱「本條款」）係您（以下簡稱「會員」）與本網站之間所訂立，請您在註冊或使用服務前詳閱以下內容。</p>
                <h2>一、會員資格</h2>
                <p>註冊成為會員者，須年滿 18 歲，或經法定代理人同意後方可使用本網站之相關服務。</p>
                <h2>二、帳號與密碼管理</h2>
                <ul>
                    <li>會員須妥善保管帳號與密碼，不得轉讓或借予第三人使用。</li>
                    <li>若帳號遭他人未經授權使用，請立即通知本站客服。</li>
                </ul>
                <h2>三、會員義務</h2>
                <p>會員承諾不從事以下行為：</p>
                <ul>
                    <li>提供不實資料或冒用他人身份註冊</li>
                    <li>違反法律或公共秩序善良風俗</li>
                    <li>干擾網站正常運作或侵害他人權益</li>
                </ul>
                <h2>四、服務變更與終止</h2>
                <p>本網站有權隨時調整、暫停或終止全部或部分服務，無須另行通知。</p>
                <h2>五、智慧財產權</h2>
                <p>本網站所有內容，包括但不限於文字、圖片、商標、程式等，均為本站或合法授權人所有。未經授權，不得擅自使用。</p>
                <h2>六、責任限制</h2>
                <p>對於任何因使用本網站而導致的直接或間接損害，本網站不承擔任何賠償責任。</p>
                <h2>七、條款修改</h2>
                <p>本網站保留隨時修改本條款之權利，更新後將公布於網站上，會員應定期查閱。</p>
                <h2>八、準據法與管轄法院</h2>
                <p>本條款依中華民國法律解釋與適用，若有爭議，雙方同意以台灣台北地方法院為第一審管轄法院。</p>
                <a href="#" class="bi bi-x-square close"></a>`;
            policyAndTermsContent.style.opacity = 1;
            policyAndTermsContent.style.zIndex = 1;
            mamberTermsCheckbox.disabled = false;

            bindCloseEvent();
        });

        function bindCloseEvent() {
            const close = document.querySelector(".close");

            if (close) {
                close.addEventListener("click", (e) => {
                    e.preventDefault();
                    policyAndTermsContent.style.opacity = 0;
                    policyAndTermsContent.style.zIndex = -1;
                    policyAndTermsContent.innerHTML = "";
                });
            }
        }
    }

    const registerForm = document.querySelector(".register_main form");

    if (!registerForm) return;

    const passwordInput = registerForm.querySelector(".setPassword");
    const confirmInput = registerForm.querySelector(".confirmPassword");
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    const titleMessage = "請輸入 6~12 碼英數字混合密碼";

    registerForm.addEventListener("submit", (e) => {

        e.preventDefault();

        if (!privacyTermsCheckbox.checked) {
            alert("請閱讀並勾選同意隱私政策");
            return;
        }

        if (!mamberTermsCheckbox.checked) {
            alert("請閱讀並勾選同意會員條款");
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

        if (!confirmInput.value) {
            alert("尚未再次輸入密碼");
            confirmInput?.focus();
            return;
        }

        if (passwordInput.value !== confirmInput.value) {
            alert("密碼輸入不一致");
            confirmInput?.focus();
            return;
        }

        // 驗證碼檢查
        const account = registerForm.querySelector("#account")?.value.trim();
        const password = registerForm.querySelector("#password")?.value.trim();
        const promotionalInfoChecked = registerForm.querySelector("#promotionalInfo")?.checked;

        if (!account || !password) {
            alert("帳號與密碼不得為空");
            return;
        }

        const codeInputs = registerForm.querySelectorAll(".codeInput");
        const code = Array.from(codeInputs).map(input => input.value.trim()).join('');
        if (code.length !== 4) {
            alert("請輸入完整四位數驗證碼");
            return;
        }

        // 準備表單資料
        const formData = new FormData(registerForm);
        formData.set("promotionalInfo", promotionalInfoChecked ? "1" : "0");

        const urlEncodedData = new URLSearchParams([...formData]);

        // 發送資料到 RegisterServlet
        axios.post(registerForm.action, urlEncodedData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
            .then((response) => {
                console.log("後端回傳 data:", response.data);
                const res = response.data;
                if (res.success) {
                    Swal.fire({
                        title: "註冊成功",
                        text: "請立即登入！",
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
                        title: "註冊失敗",
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
