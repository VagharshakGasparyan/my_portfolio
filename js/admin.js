window.addEventListener('load', () => {
    let headerMenuButton = document.querySelector('.header-menu-button');
    let aside = document.querySelector('aside');
    headerMenuButton.addEventListener('click', (e) => {
        // alert('123');
        aside.classList.toggle('aside-to-left');
        document.body.classList.toggle('body-aside-to-left');
    });
    let dashboard_text = document.getElementById('dashboard_text');
    document.body.addEventListener('mousemove', (ev)=>{
        // console.log(ev.pageX, ev.pageY);
        let x0 = dashboard_text.getBoundingClientRect().left + dashboard_text.getBoundingClientRect().width / 2;
        let y0 = dashboard_text.getBoundingClientRect().top + dashboard_text.getBoundingClientRect().height / 2;
        let x1 = ev.pageX;
        let y1 = ev.pageY;
        let r = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
        dashboard_text.style.textShadow = ((x0 - x1) / 2).toFixed(2) + 'px '
            + ((y0 - y1) / 2).toFixed(2) + 'px ' + (r / 15 + 2).toFixed(2) + 'px white';
    });
});