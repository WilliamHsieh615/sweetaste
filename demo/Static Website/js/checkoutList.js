document.addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('readList')) {
        e.preventDefault();

        const detail = target.closest('.some-wrapper')?.querySelector('.transactionDetail') ||
            target.parentElement.querySelector('.transactionDetail');

        if (detail) {
            detail.classList.toggle('showList');

            if (detail.classList.contains('showList')) {
                target.classList.remove('bi-chevron-down');
                target.classList.add('bi-chevron-up');
            } else {
                target.classList.remove('bi-chevron-up');
                target.classList.add('bi-chevron-down');
            }
        }
    }
});