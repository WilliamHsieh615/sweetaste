document.addEventListener("DOMContentLoaded", () => {
  const isRegisterPage = !!document.querySelector(".register_main");
  const isRetrievePage = !!document.querySelector(".retrieve_main");

  const verifyForm = document.querySelector("form");
  if (!verifyForm) return;

  const emailInput = verifyForm.querySelector(".emailInput");
  const passwordInput = verifyForm.querySelector(".setPassword");
  const sentVerifyBtn = verifyForm.querySelector(".sentVerify_button");
  const verifySection = verifyForm.querySelector(".verify");
  const codeInputs = verifyForm.querySelectorAll(".codeInput");

  if (verifySection) verifySection.style.display = "none";
  if (verifyForm.querySelector(".retrieve_input")) verifyForm.querySelector(".retrieve_input").style.display = "none";
  if (verifyForm.querySelector(".retrieve_button")) verifyForm.querySelector(".retrieve_button").style.display = "none";

  // 驗證碼輸入跳格與退格
  codeInputs.forEach((input, idx) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "").slice(0, 1);
      if (input.value && idx < codeInputs.length - 1) {
        codeInputs[idx + 1].focus();
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && idx > 0) {
        codeInputs[idx - 1].focus();
      }
    });
  });

  codeInputs[3]?.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const btn = verifyForm.querySelector(".verify_button") || verifyForm.querySelector(".register_button");
      if (btn) btn.click();
    }
  });

  // 發送驗證碼
  sentVerifyBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailInput?.value.trim();
    const password = passwordInput?.value.trim();

    if (!email) {
      alert("請輸入電子信箱");
      emailInput?.focus();
      return;
    }

    if (isRegisterPage && !password) {
      alert("請輸入密碼");
      passwordInput?.focus();
      return;
    }

    setTimeout(() => {
      Swal.fire({
        title: "驗證碼已發送",
        text: "請檢查電子信箱！",
        icon: "success",
        confirmButtonText: "確定",
        background: '#fffbe6',
        color: '#333333',
        confirmButtonColor: '#ff8e3c'
      });
      verifySection.style.display = "flex";
      startCountdown(180, sentVerifyBtn);
    }, 500);
  });

  // 驗證驗證碼
  const verifyBtn = verifyForm.querySelector(".verify_button");
  verifyBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    const code = Array.from(codeInputs).map((input) => input.value.trim()).join("");
    if (code.length !== 4) {
      alert("請輸入完整四位數驗證碼");
      codeInputs[0].focus();
      return;
    } else {
      Swal.fire({
        title: "驗證成功！",
        icon: "success",
        confirmButtonText: "確定",
        background: '#fffbe6',
        color: '#333333',
        confirmButtonColor: '#ff8e3c'
      });

      if (isRegisterPage) {
        verifyForm.querySelector("#account").value = account;
        verifyForm.querySelector("#password").value = localStorage.getItem("verifyPassword") || "";
        localStorage.removeItem("verifyEmail");
        localStorage.removeItem("verifyPassword");
        verifyForm.querySelector(".register_button").disabled = false;
      } else if (isRetrievePage) {
        verifyForm.querySelector(".sentVerify_input").style.display = "none";
        verifyForm.querySelector(".sentVerify_button").style.display = "none";
        verifyForm.querySelector(".verify").style.display = "none";
        verifyForm.querySelector(".retrieve_input").style.display = "flex";
        verifyForm.querySelector(".retrieve_button").style.display = "block";
      }


    }
});

function startCountdown(seconds, button) {
  let remaining = seconds;
  button.disabled = true;
  button.style.pointerEvents = 'none';
  button.style.opacity = '0.5';
  button.textContent = `重新發送 (${remaining}s)`;

  const timer = setInterval(() => {
    remaining--;
    button.textContent = `重新發送 (${remaining}s)`;

    if (remaining <= 0) {
      clearInterval(timer);
      button.disabled = false;
      button.style.pointerEvents = 'auto';
      button.style.opacity = '1';
      button.textContent = "發送驗證碼";

    }
  }, 1000);
}

});
