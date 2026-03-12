document.addEventListener('DOMContentLoaded', () => {

    const depth1 = document.querySelectorAll('.depth1Item')
    depth1.forEach(item => {
        const depth2 = item.querySelector('.depth2')
        if(depth2) {
            const toggle = item.querySelector('.depth1Toggle');
            const depth2Links = item.querySelectorAll('.depth2Link');
    
            item.addEventListener('mouseenter', () => 
                item.classList.add('active')
            );
            item.addEventListener('mouseleave', () => 
                item.classList.remove('active')
            );
    
            // 탭 포커스 — toggle에 포커스 시 열기
            toggle.addEventListener('focus', () => item.classList.add('active'));
    
            // depth2 링크에서 포커스 벗어나면 닫기
            depth2Links.forEach((link, i) => {
                link.addEventListener('blur', () => {
                    // 마지막 링크에서 탭 → 다음 메뉴로 넘어갈 때 닫기
                    if (i === depth2Links.length - 1) {
                        item.classList.remove('active');
                    }
                });
            });
        }
    });

    const topBtn = document.querySelector(".topButton");
    topBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    
});