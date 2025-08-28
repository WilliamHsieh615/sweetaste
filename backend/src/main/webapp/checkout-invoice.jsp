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

        <title>發票｜Sweetaste</title>

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

        <script src="https://cdn.jsdelivr.net/npm/tw-city-selector@2.1.0/dist/tw-city-selector.min.js"></script>

        <link rel="stylesheet" href="${pageContext.request.contextPath}/style.css" />
        <script src="${pageContext.request.contextPath}/bundle.js" defer></script>

    </head>

    <body>

        <div class="wrap">

            <div id="header"></div>

            <main class="checkout-invoice_main">

                <form class="invoiceForm">
                    <div class="title">
                        <h2>發票</h2>
                        <div class="step">
                            <i class="bi bi-check-circle step_point step1"></i>
                            <i class="bi bi-check-circle step_point step2"></i>
                            <i class="bi bi-record-circle step_point step3"></i>
                        </div>
                    </div>
                    <div class="input_container">
                        <input type="hidden" class="recipientName" name="recipientName" />
                        <input type="hidden" class="recipientPhone" name="recipientPhone" />
                        <div class="invoice">
                            <a href="#" class="e_invoice">電子發票</a>
                            <a href="#" class="paper_invoice">郵寄發票</a>
                        </div>
                        <div class="e_invoice_setup">
                            <div class="email">
                                <label for="email">電子郵件信箱</label>
                                <input type="email" name="email" id="email" placeholder="請輸入電子信箱">
                            </div>
                            <div class="carrier">
                                <label for="carrier">載具號碼</label>
                                <input type="text" name="carrier" id="carrier" pattern="^\/[A-Z0-9]{7}$"
                                    placeholder="請輸入載具號碼，開頭請加 / ">
                            </div>
                        </div>
                        <div class="paper_invoice_setup">
                            <div id="tw-selector" class="address">
                                <div class="address_label">
                                    <label for="address">地址</label>
                                    <div class="address_checkBox_container">
                                        <input type="checkbox" name="address_checkBox" id="address_checkBox"
                                            class="address_checkBox">
                                        <label for="address_checkBox">同運送地址</label>
                                    </div>
                                </div>
                                <div class="address_select">
                                    <input id="zipcode" type="text" class="zipcode" name="zipcode" placeholder="郵遞區號"
                                        readonly />
                                    <select id="county" class="county" name="county"></select>
                                    <select id="district" class="district" name="district"></select>
                                </div>
                                <input id="address" type="text" name="address_detail" class="address_detail"
                                    placeholder="幸福路 520 號" required />
                            </div>
                        </div>
                        <div class="UBN">
                            <label>統一編號<span>(選填)</span></label>
                            <input type="text" name="UBN" id="UBN" pattern="^\d{8}$" placeholder="請輸入統一編號">
                        </div>
                    </div>

                    <button type="button" class="nextButton submitOrderBtn">完成訂單</button>
                </form>

                <aside class="transactionDetail">
                    <div class="order">
                        <h3>訂單摘要</h3>
                        <div class="order_container">
                            <div class="subtotal">
                                <h5>小計</h5>
                                <p>NT$ 0</p>
                            </div>
                            <div class="freight">
                                <h5>運費</h5>
                                <p>NT$ 0</p>
                            </div>
                            <div class="total">
                                <h4>總計</h4>
                                <p>NT$ 0</p>
                            </div>
                        </div>
                    </div>
                    <div class="list">
                        <h3>購物清單</h3>
                        <ul class="item_container"></ul>
                    </div>
                </aside>

                <a href="#" class="bi bi-chevron-down readList"></a>

            </main>

            <div id="footer"></div>

        </div>

        <script>
            new TwCitySelector({
                el: '#tw-selector',
                elCounty: '.county',
                elDistrict: '.district',
                elZipcode: '.zipcode'
            });
        </script>

    </body>

    </html>