document.addEventListener('DOMContentLoaded', () => {

    const depth1 = document.querySelectorAll('.depth1Item')
    
    depth1.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
        });
    });

    
});