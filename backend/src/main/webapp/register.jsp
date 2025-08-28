<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

    <!DOCTYPE html>
    <html lang="zh-Hant">

    <head>

        <meta charset="UTF-8">
        <meta http-equiv="Content-language" content="zh-tw">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <meta name="author" content="Sweetaste">
        <meta name="copyright" content="Sweetaste">

        <title>註冊｜Sweetaste</title>

        <link rel="shortcut icon" href="./assets/images/logo/logo-1000x1000.svg" type="image/x-icon">

        <meta name="description"
            content="甜點，是生活的藝術, 優雅每一口，精緻每一味, 不只是甜點，是一場味蕾的饗宴, 一口甜蜜，滿滿幸福, 用甜點說愛你, 讓每一天，都有被寵愛的感覺, 甜到心裡，萌到心動！, 夢幻甜點，專屬妳的魔法時光, 不吃甜點，怎麼做仙女？, 卡路里不會背叛你，甜點會, 人生苦短，甜點要多, 今天不快樂？來點糖吧！">
        <meta name="keywords" content="甜點, 甜點店, 法式甜點, 蛋糕, 蛋糕店, 下午茶, 奶油, 餅乾, 麵包, 水果, 冰淇淋, 馬卡龍, 戚風蛋糕, 司康, 蛋塔, 三明治">
        <meta property="og:title" content="Sweetaste">
        <meta property="og:description" content="Sweetaste — 用甜點寵愛你的生活，優雅每一口，精緻每一味。">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://github.com/WilliamHsieh615/Front-end">
        <meta property="og:image" content="../image/logo-1000x1000.svg">
        <meta property="og:site_name" content="Sweetaste">
        <meta property="og:locale" content="zh_TW">
        <meta property="og:image:width" content="1000">
        <meta property="og:image:height" content="1000">
        <meta property="og:image:alt" content="Sweetaste甜點店">

        <link rel="stylesheet" href="${pageContext.request.contextPath}/style.css" />
        <script src="${pageContext.request.contextPath}/bundle.js" defer></script>

    </head>

    <body>

        <div class="wrap">

            <div id="header"></div>

            <main class="register_main">

                <form method="post" action="${pageContext.request.contextPath}/register">

                    <h2>會員註冊</h2>

                    <div class="form_input">

                        <div class="account">
                            <input type="email" name="account" id="account" class="account_input emailInput"
                                placeholder="請輸入電子信箱" required>
                            <i class="bi bi-person-fill account_icon"></i>
                        </div>

                        <div class="password">
                            <input type="password" name="password" id="password" class="password_input setPassword"
                                placeholder="請輸入密碼" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$"
                                title="請輸入 6~12 碼英數字混合密碼" required>
                            <i class="bi bi-key-fill key_icon"></i>
                            <a href="#" class="bi bi-eye-slash-fill eye_icon"></a>
                        </div>

                        <ul class="tips"></ul>

                        <div class="password">
                            <input type="password" name="confirmPassword" id="confirmPassword"
                                class="password_input confirmPassword" placeholder="請再次輸入密碼"
                                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$" title="請輸入 6~12 碼英數字混合密碼" required>
                            <i class="bi bi-key-fill key_icon"></i>
                            <a href="#" class="bi bi-eye-slash-fill eye_icon"></a>
                        </div>

                        <p class="matchTip"></p>

                        <div class="terms">

                            <div class="privacyTerms">
                                <input type="checkbox" name="privacyTerms" id="privacyTerms"
                                    class="privacyTerms_checkbox" required>
                                <label for="privacyTerms" class="privacyTerms_label">我已仔細閱讀<a
                                        href="#" class="privacy-policy_link">『隱私政策』</a>，並同意</label>
                            </div>

                            <div class="mamberTerms">
                                <input type="checkbox" name="mamberTerms" id="mamberTerms" class="mamberTerms_checkbox"
                                    required>
                                <label for="mamberTerms" class="mamberTerms_label">我已仔細閱讀<a
                                        href="#" class="terms-of-service_link">『會員條款』</a>，並同意</label>
                            </div>

                            <div class="promotionalInfo">
                                <input type="checkbox" name="promotionalInfo" id="promotionalInfo"
                                    class="promotionalInfo_checkbox">
                                <label for="promotionalInfo" class="promotionalInfo_label">我願意接收優惠訊息</label>
                            </div>

                        </div>

                    </div>

                    <button type="button" class="sentVerify_button">發送驗證碼</button>

                    <div class="verify">
                        <h3>請輸入四位數驗證碼</h3>
                        <div class="code">
                            <input type="text" id="code1" name="code1" class="codeInput" maxlength="1"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 1)">
                            <input type="text" id="code2" name="code2" class="codeInput" maxlength="1"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 1)">
                            <input type="text" id="code3" name="code3" class="codeInput" maxlength="1"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 1)">
                            <input type="text" id="code4" name="code4" class="codeInput" maxlength="1"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 1)">
                        </div>
                        <button type="submit" class="register_button">立即註冊</button>
                    </div>

                </form>

            </main>

            <div id="footer"></div>

            <div class="policyAndTerms_content"></div>

        </div>

    </body>

    </html>