# Sweetaste

Sweetaste 是一個甜點購物網站，結合現代化前端技術與 Java 後端架構，提供完整的商品瀏覽、訂閱、購物車與結帳流程、訂單管理、會員資料維護，並整合多種第三方服務提升使用體驗。

🔗 [專案連結](https://github.com/WilliamHsieh615/Sweetaste/tree/main/Sweetaste)

---

## 專案介紹

Sweetaste 是一個甜點購物網站，結合現代化前端技術與 Java 後端架構，提供完整的商品瀏覽、訂閱、購物車與結帳流程、訂單管理、會員資料維護，並整合多種第三方服務提升使用體驗。
此專案的前端採用模組化架構與 Webpack 打包，並透過 Axios 與後端 Jakarta Servlet API 進行通訊，後端則基於 Jakarta Servlet 與 JSP 技術，使用 MySQL 作為資料庫，搭配 Gmail SMTP 發信服務，並使用多種第三方 Java 套件提升安全性與資料處理效率。

---

## 技術棧與套件

### 前端技術

- HTML5 / CSS3 / SCSS：語意化標記與模組化樣式，使用 SCSS 撰寫，Webpack 編譯
- JavaScript (ES6+)：現代化語法與模組化  
- Webpack：模組打包，整合 JS、SCSS、圖片等資源  
- Axios：非同步 HTTP 請求  
- SweetAlert2：提示框與訊息視覺化 
- Swiper.js：商品輪播滑動效果 
- AOS (Animate On Scroll)：滾動動畫效果  
- Mailchimp：訂閱電子報服務整合

### 後端技術

- Jakarta Servlet / JSP：負責處理登入、註冊、訂單建立、購物車管理等邏輯
- MySQL：資料庫存放會員資訊、商品資料、訂單紀錄  
- JDBC：資料庫連接與操作  
- JakartaMail API (Jakarta.mail)：搭配 Gmail SMTP 發送註冊驗證信郵件
- Gson：進行 JSON 字串與物件互轉，方便前後端資料交換 
- jBCrypt：加密會員密碼，確保安全性
- Apache Tomcat / TomEE：Java Web 容器與伺服器  

---

## 頁面預覽

說明：GitHub Pages 僅支援 HTML、CSS、JavaScript 等前端靜態資源的部署，無法運行 Java 後端程式，以下提供靜態網站預覽，其他後端功能會以圖片方式說明

🔗 [靜態網站預覽](https://williamhsieh615.github.io/Sweetaste/Sweetaste-Static%20Website/html/index.html)

### 首頁



 
- 訂閱表單（整合 Mailchimp）  
- 電子郵件寄送（使用 Gmail SMTP）  
- 密碼加密保護（使用 jBCrypt）  
- JSON 處理（使用 Gson）  
- 多頁面 SPA-like 使用體驗，搭配 Swiper.js、AOS 動畫效果  

