document.addEventListener('DOMContentLoaded', () => {

/* input/textarea.inp 지우기 버튼 동적 생성 (ej) */  
    // input.inp, textarea.inp 옆에 지우기 버튼 동적 추가
    document.querySelectorAll('input.inp').forEach(function(inp) {
        // 이미 버튼이 있으면 중복 추가 방지
        if (!inp.parentNode.querySelector('.form-control-clear')) {
            var clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.className = 'form-control-clear hidden';
            clearBtn.textContent = '지우기';
            // input 바로 뒤에 삽입
            inp.parentNode.insertBefore(clearBtn, inp.nextSibling);

            // 버튼 클릭 시 입력값 삭제 및 포커스
            clearBtn.addEventListener('click', function() {
                inp.value = '';
                clearBtn.classList.add('hidden');
                inp.focus();
                // 필요시 input 이벤트도 발생
                var event = new Event('input', { bubbles: true });
                inp.dispatchEvent(event);
            });
        }
    });

    // 입력값 있을 때만 버튼 노출
    function toggleClearButton(e) {
        var inp = e.target;
        var clearBtn = inp.parentNode.querySelector('.form-control-clear');
        if (!clearBtn) return;
        if (inp.value) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }

    document.querySelectorAll('input.inp').forEach(function(inp) {
        inp.addEventListener('input', toggleClearButton);
        // 초기 상태 반영
        toggleClearButton({ target: inp });
    });



    /* 카운트업효과 ============================== */ 
    /* 251219 카운트업 효과 - 다시 보일 때마다 재생 (ej) */
    const counters = document.querySelectorAll(".counter");

    function startCount(el) {
        const target = Number(el.dataset.target);
        const duration = 1000;
        const start = Number(el.dataset.start) || 0;
        const startTime = performance.now();

        // 기존 애니메이션이 있으면 취소
        if (el._countAnimId) {
            cancelAnimationFrame(el._countAnimId);
            el._countAnimId = null;
        }

        function animate(time) {
            const progress = Math.min((time - startTime) / duration, 1);
            const value = Math.floor(start + (target - start) * progress);
            el.textContent = value.toLocaleString();

            if (progress < 1) {
                el._countAnimId = requestAnimationFrame(animate);
            } else {
                el.textContent = target.toLocaleString();
                el._countAnimId = null;
            }
        }

        el._countAnimId = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const el = entry.target;

            if (entry.isIntersecting) {
                // 이미 애니메이션 중이면 중복 시작 방지
                if (el._countAnimId) return;

                // 보일 때마다 시작값으로 리셋 (dataset.start가 없으면 0)
                el.textContent = (Number(el.dataset.start) || 0).toLocaleString();
                startCount(el);
            } else {
                // 화면에서 벗어나면 애니메이션 취소하고 초기값으로 리셋
                if (el._countAnimId) {
                    cancelAnimationFrame(el._countAnimId);
                    el._countAnimId = null;
                }
                el.textContent = (Number(el.dataset.start) || 0).toLocaleString();
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(el => {
        if (!el.dataset.start) el.dataset.start = '0';
        observer.observe(el);
    });
    /* // 251219 카운트업 효과 - 다시 보일 때마다 재생 (ej) */
    /* 카운트업효과 ============================== */ 
});