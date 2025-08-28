<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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

    <title>登入｜Sweetaste</title>

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
    <script>
        const contextPath = "${pageContext.request.contextPath}";
    </script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="${pageContext.request.contextPath}/bundle.js" defer></script>

</head>

<body>

    <div class="wrap">

        <div id="header"></div>

        <main class="login_main">

            <form action="login" method="post">

                <h2>會員登入</h2>

                <div class="link">
                    <h3>—— 連結社群帳號 ——</h3>
                    <a href="#"><img src="./assets/images/icon/facebook.svg" alt="facebookIcon"></a>
                    <a href="#"><img src="./assets/images/icon/google.svg" alt="googleIcon"></a>
                    <a href="#"><img src="./assets/images/icon/yahoo.svg" alt="yahooIcon"></a>
                </div>

                <div class="form_input">

                    <div class="account">
                        <input type="email" name="account" id="account" class="account_input" placeholder="請輸入電子信箱" value="${param.account != null ? param.account : ''}" required>
                        <i class="bi bi-person-fill account_icon"></i>
                    </div>

                    <div class="password">
                        <input type="password" name="password" id="password" class="password_input" placeholder="請輸入密碼"
                            required>
                        <i class="bi bi-key-fill key_icon"></i>
                        <a href="#" class="bi bi-eye-slash-fill eye_icon"></a>
                    </div>

                    <div class="other">

                        <div class="remember">
                            <input type="checkbox" name="remember" id="remember" class="remember_checkbox">
                            <label for="remember" class="remember_label">記住我</label>
                        </div>

                        <div class="register_and_retrieve">
                            <a href="register.jsp">會員註冊</a>
                            <span class="line"></span>
                            <a href="retrieve.jsp">忘記密碼</a>
                        </div>
                    </div>

                </div>

                <button type="submit">登入帳號</button>

            </form>

        </main>

        <div id="footer"></div>

    </div>

</body>

</html>