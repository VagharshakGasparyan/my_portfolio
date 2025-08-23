window.addEventListener('load', () => {
    let headerMenuButton = document.querySelector('.header-menu-button');
    let aside = document.querySelector('aside');
    headerMenuButton.addEventListener('click', (e) => {
        // alert('123');
        aside.classList.toggle('aside-to-left');
        document.body.classList.toggle('body-aside-to-left');
    });
    let shadow_text = document.getElementById('shadow_text');
    document.body.addEventListener('mousemove', (ev)=>{
        // console.log(ev.pageX, ev.pageY);
        let x0 = shadow_text.getBoundingClientRect().left + shadow_text.getBoundingClientRect().width / 2;
        let y0 = shadow_text.getBoundingClientRect().top + shadow_text.getBoundingClientRect().height / 2;
        let x1 = ev.pageX;
        let y1 = ev.pageY;
        let r = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
        shadow_text.style.textShadow = ((x0 - x1) / 2).toFixed(2) + 'px '
            + ((y0 - y1) / 2).toFixed(2) + 'px ' + (r / 20 + 2).toFixed(2) + 'px white';
    });
    let main = document.querySelector('main');
    let zk = document.getElementById('zk');
    let zk_k = {
        k: 2.507,
        start: 248,
        end: 535
    };
    main.addEventListener('scroll', (ev) => {
        let dx = main.scrollTop;
        let a = 0;
        if (dx > zk_k.start && dx < zk_k.end) {
            a = (dx - zk_k.start) * zk_k.k;
        }else if(dx >= zk_k.end){
            a = (zk_k.end - zk_k.start) * zk_k.k;
        }
        zk.style.transform = 'rotate(' + a + 'deg)';
        // console.log(dx, a);
    });
});