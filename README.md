![banner](https://github.com/WilliamHsieh615/sweetaste/blob/main/demo/%E9%A6%96%E9%A0%81/index.png)

# Sweetaste

Sweetaste 是一個甜點購物網站，結合現代化前端技術與 Java 後端架構，提供完整的商品瀏覽、訂閱、購物車與結帳流程、訂單管理、會員資料維護，並整合多種第三方服務提升使用體驗。

🔗 [靜態網站預覽](https://williamhsieh615.github.io/sweetaste/demo/StaticWebsite/html/index.html)

---

## 專案介紹

本專案的前端採用模組化架構與 Webpack 打包，並透過 Axios 與後端 Jakarta Servlet API 進行通訊，後端則基於 Jakarta Servlet 與 JSP 技術，使用 MySQL 作為資料庫，搭配 Gmail SMTP 發信服務，JSON 解析與密碼加密等功能並使用多種第三方 Java 套件提升安全性與資料處理效率。

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
- js-cookie：簡化 Cookie 存取操作，管理登入狀態與使用者資料
- tw-city-selector：台灣縣市選單產生器，自動產生縣市/鄉鎮/郵遞區號欄位，用於地址填寫
- Mailchimp：訂閱電子報服務整合

### 後端技術

- Jakarta Servlet / JSP：負責處理登入、註冊、訂單建立、購物車、會員資料管理等邏輯
- MySQL：資料庫存放會員資訊、商品資料、訂單紀錄  
- JDBC：資料庫連接與操作  
- JakartaMail API (Jakarta.mail)：搭配 Gmail SMTP 發送驗證郵件
- Gson：進行 JSON 字串與物件互轉，方便前後端資料交換 
- jBCrypt：加密會員密碼，確保安全性
- Apache Tomcat / TomEE：Java Web 容器與伺服器  

---

## 頁面預覽

說明：GitHub Pages 僅支援 HTML、CSS、JavaScript 等前端靜態資源的部署，無法運行 Java 後端程式，以下提供靜態網站預覽，其他後端功能會以檔案方式說明

🔗 [註冊](https://github.com/WilliamHsieh615/sweetaste/blob/main/demo/%E8%A8%BB%E5%86%8A/%E8%A8%BB%E5%86%8A.pdf)

🔗 [登入/登出](https://github.com/WilliamHsieh615/sweetaste/blob/main/demo/%E7%99%BB%E5%85%A5%3A%E7%99%BB%E5%87%BA/%E7%99%BB%E5%85%A5%3A%E7%99%BB%E5%87%BA.pdf)

🔗 [密碼重設](https://github.com/WilliamHsieh615/sweetaste/blob/main/demo/%E5%AF%86%E7%A2%BC%E9%87%8D%E8%A8%AD/%E5%AF%86%E7%A2%BC%E9%87%8D%E8%A8%AD.pdf)

🔗 [資料變更](https://github.com/WilliamHsieh615/sweetaste/blob/main/demo/%E8%B3%87%E6%96%99%E8%AE%8A%E6%9B%B4/%E8%B3%87%E6%96%99%E8%AE%8A%E6%9B%B4.pdf)

🔗 [密碼變更](https://github.com/WilliamHsieh615/sweetaste/blob/main/demo/%E5%AF%86%E7%A2%BC%E8%AE%8A%E6%9B%B4/%E5%AF%86%E7%A2%BC%E8%AE%8A%E6%9B%B4.pdf)

🔗 [購物流程](https://github.com/WilliamHsieh615/sweetaste/blob/main/demo/%E8%B3%BC%E7%89%A9%E6%B5%81%E7%A8%8B/%E8%B3%BC%E7%89%A9%E6%B5%81%E7%A8%8B.pdf)

🔗 [訂閱表單](https://github.com/WilliamHsieh615/sweetaste/blob/main/demo/%E8%A8%82%E9%96%B1%E8%A1%A8%E5%96%AE/%E8%A8%82%E9%96%B1%E8%A1%A8%E5%96%AE.pdf)

---

## 使用說明

### 本地開發環境設定

1. **Clone the repository**  
   確認你的電腦已安裝 Node.js（版本 14 以上建議），可於終端機輸入：  
     ```bash
     git clone https://github.com/WilliamHsieh615/Sweetaste.git
     cd Sweetaste

2. **前端套件安裝與打包**
   進入前端資料夾，安裝相依套件並打包：
     ```bash
     cd frontend
     npm install
     npm run dev
     
  打包後的檔案會輸出到：/Sweetaste/src/main/webapp

3. **Java 後端環境建置**
- 安裝並設定 Java JDK。
- 安裝並設定 Apache Tomcat 或 TomEE 作為 Java Web 容器。
- 將 src/ 資料夾的 Java 專案匯入 IDE（如 Eclipse、IntelliJ IDEA）。
- 更新專案中的資料庫連線參數，確保能成功連接 MySQL。

4. **資料庫設定**
- 建立資料庫名稱：sweetaste。
- 匯入專案提供的資料表結構。
    ```sql
    -- 建立 members 資料表
    CREATE TABLE members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        account VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(50) NOT NULL,
        phone VARCHAR(20),
        birthday DATE,
        promotional_info TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- 建立 orders 資料表
    CREATE TABLE orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        member_id INT NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        subtotal INT NOT NULL,
        freight INT NOT NULL,
        total INT NOT NULL,
        address TEXT NOT NULL,
        invoice_type VARCHAR(20),
        invoice_info VARCHAR(100),
        shipping_status ENUM('pending', 'shipped', 'delivered', 'canceled') DEFAULT 'pending',
        recipient_name VARCHAR(50) NOT NULL,
        recipient_phone VARCHAR(20) NOT NULL,
        FOREIGN KEY (member_id) REFERENCES members(id)
    );

    -- 建立 order_items 資料表
    CREATE TABLE order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        quantity INT NOT NULL,
        subtotal INT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id)
    );
- 確認資料庫帳號密碼與權限設定。

5. **執行**
   將 Java 專案於 Eclipse / Apache Tomcat 或 TomEE 執行，即可啟用完整網站




