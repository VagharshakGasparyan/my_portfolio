window.addEventListener('load', () => {
    document.querySelectorAll('.drop-container').forEach((el) => {
        let dropHead = el.querySelector('.drop-head');
        let dropBody = el.querySelector('.drop-body');
        if (dropHead && dropBody) {
            // let cloneEl = dropBody.cloneNode(true);
            // cloneEl.style.height = '100px';
            // cloneEl.style.padding = '10px';
            // cloneEl.style.borderWidth = '3px';
            // cloneEl.style.transform = 'skew(0deg)';
            // // document.body.appendChild(cloneEl);
            // // let h = cloneEl.getBoundingClientRect().height;
            // let h = getComputedStyle(cloneEl).height;
            // console.log(cloneEl, h);
            let open = false;
            document.body.addEventListener('click', (e) => {
                closeDrop(dropBody);
                open = false;
            });
            dropHead.addEventListener('click', (ev) => {
                ev.stopPropagation();
                if (open) {
                    closeDrop(dropBody);
                } else {
                    openDrop(dropBody);
                }
                open = !open;
            });
        }
    });

    function openDrop(dropBody) {
        // dropBody.style.height = '100px';
        // dropBody.style.padding = '10px';
        // dropBody.style.borderWidth = '3px';
        dropBody.style.transform = 'skew(0deg) scaleY(1)';
    }

    function closeDrop(dropBody) {
        // dropBody.style.height = '0';
        // dropBody.style.padding = '0';
        // dropBody.style.borderWidth = '0';
        dropBody.style.transform = 'skew(-60deg) scaleY(0)';
    }
});