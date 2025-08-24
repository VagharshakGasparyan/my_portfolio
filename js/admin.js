window.addEventListener('load', () => {
    let cnv = document.getElementById('lightning_cnv');
    let vars = {
        w: 0,//canvas width
        h: 0,//canvas height
        a: 0,//canvas angle
        on: false,
    };
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
        let dx = x0 - x1;
        let dy = y0 - y1;
        let r = Math.sqrt(dx * dx + dy * dy);
        let sign = Math.sign(dy);
        let a = Math.acos(dx / r) * (sign === 0 ? 1 : sign);
        // console.log(a, Math.sign(dy));
        shadow_text.style.textShadow = ((x0 - x1) / 2).toFixed(2) + 'px '
            + ((y0 - y1) / 2).toFixed(2) + 'px ' + (r / 20 + 2).toFixed(2) + 'px white';
        //--------canvas---------------------------------------------------
        let r_threshold = 200;
        if(r < r_threshold){
            vars.w = r;
            vars.h = Math.round(vars.w * 0.3);
            vars.a = a * 180 / Math.PI;
            cnv.width = vars.w;
            cnv.height = vars.h;
            // cnv.style.transformOrigin = '0px center';
            cnv.style.transform = 'rotate(' + vars.a + 'deg)';
            cnv.style.left = x1 + 'px';
            cnv.style.top = Math.round(y1 - vars.h / 2) + 'px';
            vars.on = true;
        }else{
            if(vars.on){
                vars.w = 0;
                vars.h = 0;
                vars.a = 0;
                cnv.width = vars.w;
                cnv.height = vars.h;
                vars.on = false;
            }
        }

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
    lightning();
    function lightning() {
        // cnv.width = w;
        // cnv.height = h;
        const ctx = cnv.getContext('2d');
        // ctx.clearRect(0, 0, cnv.width, cnv.height);

        
        function f1() {
            if(!vars.on){
                return;
            }
            let w = vars.w;
            let h = vars.h;
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = 'white';
            let points = [];
            let start_y = Math.round(h / 2);
            let y = start_y;
            for(let x = 0; x < w; x++) {
                y = y + Math.floor(Math.random() * 3) - 1;
                points.push({x, y});
            }

            let dy = points[points.length - 1].y - start_y;
            let dx = w;
            let k = dy / dx;

            points.forEach((point, index)=>{
                let y = point.y - k * point.x;
                // console.log(point.y, y, k);
                points[index].y = Math.round(y);
            });
            points.forEach((point)=>{
                ctx.fillRect(point.x, point.y, 1, 1);
            });
        }

        requestAnimationFrame(draw);
        
        function draw() {
            // ctx.clearRect(0, 0, w, h);
            f1();
            requestAnimationFrame(draw);
        }
        

    }
});