import Swal from 'sweetalert2';

function renderMailchimpForm() {
    const mailchimpForm = document.querySelector('#mailchimp-form');

    if (!mailchimpForm) return;
    mailchimpForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        fetch('https://gmail.us11.list-manage.com/subscribe/post?u=9e322c0b88230b1d5077c8d86&id=1de2b26d55&f_id=00f910e1f0', {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });

        Swal.fire({
            icon: 'success',
            title: '已送出成功！',
            text: '我們已收到你的訂閱，感謝支持！',
            confirmButtonText: '關閉',
            background: '#fffbe6',
            color: '#333333',
            confirmButtonColor: '#ff8e3c',
            timer: 3000,
        });
        form.reset();
    });
}

window.renderMailchimpForm = renderMailchimpForm;

