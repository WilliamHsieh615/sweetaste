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

    const savedAddress = JSON.parse(localStorage.getItem("fullDeliveryAddress") || "{}");

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

            if (isElectronicFilled || isPaperFilled) {
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
        });
    }

});