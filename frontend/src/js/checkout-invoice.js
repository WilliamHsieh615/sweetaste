import axios from 'axios';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {

    const invoice = document.querySelector('.checkout-invoice_main .invoice');

    if (!invoice) return;

    const e_invoice = invoice.querySelector('.e_invoice');
    const paper_invoice = invoice.querySelector('.paper_invoice');
    const e_invoice_setup = document.querySelector('.checkout-invoice_main .e_invoice_setup');
    const paper_invoice_setup = document.querySelector('.checkout-invoice_main .paper_invoice_setup');

    if (e_invoice && paper_invoice && e_invoice_setup && paper_invoice_setup) {

        invoice.addEventListener('click', function (e) {
            e.preventDefault();

            if (e.target.classList.contains('e_invoice')) {
                e_invoice_setup.style.display = 'flex';
                paper_invoice_setup.style.display = 'none';

                e_invoice.style.background = '#EAF0ED';
                e_invoice.style.color = '#3F5D45';

                paper_invoice.style.background = '#3F5D45';
                paper_invoice.style.color = '#EAF0ED';
            }
            else if (e.target.classList.contains('paper_invoice')) {
                e_invoice_setup.style.display = 'none';
                paper_invoice_setup.style.display = 'flex';

                paper_invoice.style.background = '#EAF0ED';
                paper_invoice.style.color = '#3F5D45';

                e_invoice.style.background = '#3F5D45';
                e_invoice.style.color = '#EAF0ED';
            }
        });
    }

    const addressCheckBox = document.querySelector('.invoiceForm .address_checkBox');
    const invoiceZipcode = document.querySelector(".invoiceForm .zipcode");
    const invoiceCounty = document.querySelector(".invoiceForm .county");
    const invoiceDistrict = document.querySelector(".invoiceForm .district");
    const invoiceAddressDetail = document.querySelector(".invoiceForm .address_detail");

    const recipientNameInput = document.querySelector('.invoiceForm .recipientName');
    const recipientPhoneInput = document.querySelector('.invoiceForm .recipientPhone');

    const savedAddress = JSON.parse(localStorage.getItem("fullDeliveryAddress") || "{}");
    if (recipientNameInput && savedAddress.recipientName) recipientNameInput.value = savedAddress.recipientName;
    if (recipientPhoneInput && savedAddress.recipientPhone) recipientPhoneInput.value = savedAddress.recipientPhone;

    if (addressCheckBox && invoiceCounty && invoiceDistrict && invoiceZipcode && invoiceAddressDetail) {
        addressCheckBox.addEventListener("change", () => {
            if (addressCheckBox.checked) {
                if (savedAddress.county && savedAddress.district && savedAddress.zipcode) {
                    invoiceCounty.value = savedAddress.county;
                    invoiceCounty.dispatchEvent(new Event("change"));
                    setTimeout(() => {
                        invoiceDistrict.value = savedAddress.district;
                        invoiceDistrict.dispatchEvent(new Event("change"));
                    }, 100);
                    invoiceZipcode.value = savedAddress.zipcode;
                    invoiceAddressDetail.value = savedAddress.addressDetail || "";
                }
            } else {
                invoiceCounty.value = "";
                invoiceDistrict.value = "";
                invoiceZipcode.value = "";
                invoiceAddressDetail.value = "";
            }
        });
    }

    const submitOrderBtn = document.querySelector(".submitOrderBtn");
    const invoiceEmail = document.querySelector(".invoiceForm #email");
    const invoiceCarrier = document.querySelector(".invoiceForm #carrier");

    if (submitOrderBtn && invoiceEmail && invoiceCarrier && invoiceZipcode && invoiceCounty && invoiceDistrict && invoiceAddressDetail) {
        submitOrderBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const isElectronicFilled = invoiceEmail.value.trim() !== "" && invoiceCarrier.value.trim() !== "";
            const isPaperFilled = invoiceZipcode.value.trim() !== "" && invoiceCounty.value.trim() !== "" && invoiceDistrict.value.trim() !== "" && invoiceAddressDetail.value.trim() !== "";

            if (!isElectronicFilled && !isPaperFilled) {
                Swal.fire({
                    title: "訂購未完成",
                    text: "您尚未完整填寫發票資訊！",
                    icon: "warning",
                    confirmButtonText: "確定",
                    background: '#fffbe6',
                    color: '#333333',
                    confirmButtonColor: '#ff8e3c'
                });
                return;
            }

            const recipientName = recipientNameInput?.value.trim() || "";
            const recipientPhone = recipientPhoneInput?.value.trim() || "";

            if (!recipientName || !recipientPhone) {
                alert("請填寫收件人姓名與電話");
                return;
            }

            const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "[]");
            const addressData = JSON.parse(localStorage.getItem("fullDeliveryAddress") || "{}");

            // 建構完整地址
            const address = `${addressData.zipcode} ${addressData.county}${addressData.district}${addressData.addressDetail}`;

            // 根據電子 or 紙本決定發票內容
            const isEInvoice = document.querySelector(".e_invoice_setup")?.style.display !== "none";
            const invoiceType = isEInvoice ? "電子" : "紙本";

            let invoiceInfo = "";
            if (invoiceType === "電子") {
                const email = document.querySelector("#email")?.value || "";
                const carrier = document.querySelector("#carrier")?.value || "";
                invoiceInfo = `${email} / ${carrier}`;
            } else {
                const zip = invoiceZipcode?.value || "";
                const county = invoiceCounty?.value || "";
                const district = invoiceDistrict?.value || "";
                const detail = invoiceAddressDetail?.value || "";
                const ubn = document.querySelector("#UBN")?.value || "";
                invoiceInfo = `${zip} ${county}${district}${detail} / UBN: ${ubn}`;
            }

            const memberId = Number(sessionStorage.getItem("memberId"));
            console.log("memberId parsed number:", memberId);
            if (!memberId) return;

            const subtotal = shoppingCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const freight = subtotal > 0 ? 60 : 0;  // 這裡可以改成其他運費邏輯
            const total = subtotal + freight;

            const contextPath = window.location.pathname.split('/')[1];

            const orderItems = shoppingCart.map(item => ({
                productName: item.name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity
            }));

            // 發送訂單
            axios.post(`/${contextPath}/submitOrder`, {
                memberId,
                address,
                invoiceType,
                invoiceInfo,
                recipientName,
                recipientPhone,
                subtotal,
                freight,
                total,
                items: orderItems
            })
                .then(res => {
                    if (res.data && res.data.status === "success") {
                        Swal.fire({
                            title: "訂購成功",
                            text: "訂單已完成，感謝您的訂購！",
                            icon: "success",
                            confirmButtonText: "確定",
                            background: '#fffbe6',
                            color: '#333333',
                            confirmButtonColor: '#ff8e3c'
                        }).then(() => {
                            localStorage.removeItem("shoppingCart");
                            window.location.href = "checkout-payment_success.html";
                        });
                    } else {
                        Swal.fire({
                            title: "訂購失敗",
                            text: res.data.message || "訂單提交失敗，請稍後再試。",
                            icon: "error",
                            confirmButtonText: "確定",
                            background: '#fffbe6',
                            color: '#333333',
                            confirmButtonColor: '#ff8e3c'
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire({
                        title: "訂購失敗",
                        text: "訂單提交失敗",
                        icon: "error",
                        confirmButtonText: "確定",
                        background: '#fffbe6',
                        color: '#333333',
                        confirmButtonColor: '#ff8e3c'
                    });
                });
        });
    }

});