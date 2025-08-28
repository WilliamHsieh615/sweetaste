<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <% if (session==null || session.getAttribute("account")==null) { response.sendRedirect("login.jsp"); return; } %>
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

                <title>會員｜Sweetaste</title>

                <link rel="shortcut icon" href="./assets/images/logo/logo-1000x1000.svg" type="image/x-icon">

                <meta name="description"
                    content="甜點，是生活的藝術, 優雅每一口，精緻每一味, 不只是甜點，是一場味蕾的饗宴, 一口甜蜜，滿滿幸福, 用甜點說愛你, 讓每一天，都有被寵愛的感覺, 甜到心裡，萌到心動！, 夢幻甜點，專屬妳的魔法時光, 不吃甜點，怎麼做仙女？, 卡路里不會背叛你，甜點會, 人生苦短，甜點要多, 今天不快樂？來點糖吧！">
                <meta name="keywords"
                    content="甜點, 甜點店, 法式甜點, 蛋糕, 蛋糕店, 下午茶, 奶油, 餅乾, 麵包, 水果, 冰淇淋, 馬卡龍, 戚風蛋糕, 司康, 蛋塔, 三明治">
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
                <script src="${pageContext.request.contextPath}/bundle.js" defer></script>

            </head>

            <body>

                <c:if test="${not empty sessionScope.member}">
                    <script>
                        sessionStorage.setItem("memberId", "${sessionScope.member.id}");
                    </script>
                </c:if>

                <div class="wrap">

                    <div id="header"></div>

                    <div class="member_banner">
                        <h2><img src="./assets/images/quote/直式-想吃甜點是不需要理由的.svg" alt="想吃甜點是不需要理由的"></h2>
                        <p>親愛的 ${sessionScope.member.name != null ? sessionScope.member.name : '會員'} 貴賓 您好！</p>
                    </div>

                    <main class="member_main">

                        <aside>
                            <h3>會員管理</h3>
                            <ul class="menu">
                                <li><a href="#" class="infoManagementLink">資料管理</a></li>
                                <li><a href="#" class="changePasswordLink">密碼變更</a></li>
                                <li><a href="#" class="orderInquiryLink">訂單查詢</a></li>
                                <li><a href="${pageContext.request.contextPath}/logout" class="logout">登出</a></li>
                            </ul>
                        </aside>

                        <div class="infoManagement">
                            <form action="${pageContext.request.contextPath}/member" method="post">
                                <h2>會員資料</h2>
                                <div class="input_container">
                                    <div class="name">
                                        <label for="name">姓名</label>
                                        <input type="text" name="name" id="name"
                                            value="${sessionScope.member.name != null ? sessionScope.member.name : ''}"
                                            required readonly>
                                    </div>
                                    <div class="phone">
                                        <label for="phone">電話</label>
                                        <input type="tel" name="phone" id="phone"
                                            pattern="^(09\d{8}|09\d{2}-\d{3}-\d{3}|0\d{1,2}-\d{6,8}|0\d{7,10})$"
                                            value="${sessionScope.member.phone != null ? sessionScope.member.phone : ''}"
                                            required readonly>
                                    </div>
                                    <div class="birthday">
                                        <label for="birthday">生日</label>
                                        <input type="date" name="birthday" id="birthday"
                                            value="${sessionScope.member.birthday != null ? sessionScope.member.birthday : ''}"
                                            required readonly>
                                    </div>
                                    <div class="promotionalInfo">
                                        <input type="checkbox" name="promotionalInfo" id="promotionalInfo"
                                            class="promotionalInfo_checkbox" disabled
                                            ${sessionScope.member.promotionalInfo ? "checked" : "" }>
                                        <label for="promotionalInfo" class="promotionalInfo_label">是否願意接收優惠訊息</label>
                                    </div>
                                </div>
                                <button type="button" class="editBtn">修改</button>
                                <button type="submit" class="saveBtn">確定修改</button>
                            </form>
                        </div>

                        <div class="changePassword">
                            <form action="${pageContext.request.contextPath}/member" method="post">
                                <h2>密碼變更</h2>
                                <div class="input_container">
                                    <div class="account">
                                        <label for="account">帳號</label>
                                        <input type="email" name="account" id="account" class="account_input"
                                            value="${sessionScope.member.account}" required readonly>
                                    </div>
                                    <label for="password">密碼</label>
                                    <div class="password">
                                        <input type="password" name="password" id="setPassword"
                                            class="password_input setPassword" placeholder="請輸入新密碼"
                                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$" title="請輸入 6~12 碼英數字混合密碼"
                                            required>
                                        <a href="#" class="bi bi-eye-slash-fill eye_icon"></a>
                                    </div>
                                    <ul class="tips"></ul>
                                    <div class="password">
                                        <input type="password" name="confirmPassword" id="confirmPassword"
                                            class="password_input confirmPassword" placeholder="請再次輸入新密碼"
                                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$" title="請輸入 6~12 碼英數字混合密碼"
                                            required>
                                        <a href="#" class="bi bi-eye-slash-fill eye_icon"></a>
                                    </div>
                                    <p class="matchTip"></p>

                                </div>
                                <button type="submit" class="changePasswordBtn">確定變更</button>
                            </form>
                        </div>

                        <div class="orderInquiry"></div>

                    </main>

                    <div id="footer"></div>

                </div>

            </body>

            </html>