document.addEventListener('DOMContentLoaded', () => {

    const deliveryForm = document.querySelector(".deliveryForm");

    if (deliveryForm){
        deliveryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const deliveryRecipientName = document.querySelector('.deliveryForm .recipientName');
            const deliveryRecipientPhone = document.querySelector('.deliveryForm .recipientPhone');
            const deliveryZipcode = document.querySelector('.deliveryForm .zipcode');
            const deliveryCounty = document.querySelector('.deliveryForm .county');
            const deliveryDistrict = document.querySelector('.deliveryForm .district');
            const deliveryAddressDetail = document.querySelector('.deliveryForm .address_detail');
    
            const fullDeliveryAddress = {
                county: deliveryCounty.value,
                district: deliveryDistrict.value,
                zipcode: deliveryZipcode.value,
                addressDetail: deliveryAddressDetail.value,
                recipientName: deliveryRecipientName.value,
                recipientPhone: deliveryRecipientPhone.value,
            };
    
            console.log(fullDeliveryAddress);
    
            localStorage.setItem("fullDeliveryAddress", JSON.stringify(fullDeliveryAddress));
            window.location.href = "checkout-payment.jsp";
    
        });
    }

});
