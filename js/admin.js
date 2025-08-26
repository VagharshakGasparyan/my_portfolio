window.addEventListener('load', () => {
    let cnv = document.getElementById('lightning_cnv');
    let vars = {
        w: 0,//canvas width
        h: 0,//canvas height
        a: 0,//canvas angle
        on: false,
        x1: 0,//mouse pageX
        y1: 0, //mouse pageY
        brick_cnv: null,
    };
    let headerMenuButton = document.querySelector('.header-menu-button');
    let aside = document.querySelector('aside');
    headerMenuButton.addEventListener('click', (e) => {
        // alert('123');
        aside.classList.toggle('aside-to-left');
        document.body.classList.toggle('body-aside-to-left');
        setTimeout(()=>{
            vars.brick_cnv.width = vars.brick_cnv.getBoundingClientRect().width;
            vars.brick_cnv.height = vars.brick_cnv.getBoundingClientRect().height;
        }, 350);
    });
    let shadow_text = document.getElementById('shadow_text');
    document.body.addEventListener('mousemove', (ev)=>{
        vars.x1 = ev.pageX;
        vars.y1 = ev.pageY;
        f2();
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
        f2();
    });
    function f2() {
        let x0 = shadow_text.getBoundingClientRect().left + shadow_text.getBoundingClientRect().width / 2;
        let y0 = shadow_text.getBoundingClientRect().top + shadow_text.getBoundingClientRect().height / 2;
        let x1 = vars.x1;
        let y1 = vars.y1;
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
    }
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
    //------------------------------------
    let clear_header_search = document.getElementById('clear_header_search');
    let header_search = document.getElementById('header_search');
    clear_header_search.addEventListener('click', (e) => {
        header_search.value = '';
    });

    //---------------brick----------------------------------------------------------------------------------------------
    //------------------brick settings--------------------------
    let brick_width = 40;
    let brick_height = 20;
    let lineWidth = 4;
    let brickColors = ["#071117"];
    //------------------user settings--------------------------
    let c = document.getElementById("brick_cnv");
    if(!c){
        return 0;
    }
    vars.brick_cnv = c;
    let cxy = {x: 0, y: 0, c: false};
    c.addEventListener("mousemove", (ev) => {
        cxy.x = ev.offsetX;
        cxy.y = ev.offsetY;
    });
    c.addEventListener("mousedown", (ev) => {
        cxy.c = true;
    });
    c.addEventListener("mouseup", (ev) => {
        cxy.c = false;
    });
    c.width = c.getBoundingClientRect().width;
    c.height = c.getBoundingClientRect().height;
    let ctx = c.getContext('2d');//CanvasRenderingContext2D
    ctx.lineWidth = lineWidth;
    let newColor = brickColors[Math.floor(Math.random() * brickColors.length)];
    ctx.strokeStyle = newColor;
    ctx.fillStyle = newColor;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    let g = {
        bricks: [],
        brickMoment: "x0y0"
    };

    requestAnimationFrame(draw);

    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        fFindCenter();
        requestAnimationFrame(draw);
    }
    function fMakeBrickByCenter(brick, i) {
        let x0 = brick.x, y0 = brick.y, t = brick.t;
        let m = 128;
        // let opacity = (Math.floor(15.99999 * Math.max(m - t, 0) / m)).toString(16);
        let opacity = (Math.floor(255.99999 * Math.max(m - t, 0) / m)).toString(16);
        opacity = opacity.length < 2 ? '0' + opacity : opacity;
            // console.log(opacity);
        // ctx.strokeStyle = brick.c + opacity + opacity;
        ctx.strokeStyle = brick.c + opacity;

        ctx.beginPath();
        ctx.moveTo(x0 - 0.5 * brick_width, y0 - 0.5 * brick_height);
        ctx.lineTo(x0 + 0.5 * brick_width, y0 - 0.5 * brick_height);
        ctx.lineTo(x0 + 0.5 * brick_width, y0 + 0.5 * brick_height);
        ctx.lineTo(x0 - 0.5 * brick_width, y0 + 0.5 * brick_height);
        ctx.closePath();
        ctx.lineWidth = lineWidth;
        ctx.stroke();// Draw the Path
        if(brick.mouse_d){
            ctx.fillStyle = brick.c + opacity;
            ctx.fill();
        }
        // ctx.fill();
        g.bricks[i].t = t + 1;
        if (t > m){
            g.bricks.splice(i, 1);
        }
    }
    function fFindCenter() {
        //brick_width     brick_height
        let ny = Math.round(cxy.y / brick_height);
        let y0 = ny * brick_height;
        let x0 = ny % 2 === 0
            ? Math.round(cxy.x / brick_width) * brick_width
            : (Math.round(cxy.x / brick_width - 0.5) + 0.5) * brick_width;
        let brickMoment = "x" + x0 + "y" + y0;
        if(brickMoment !== g.brickMoment){
            g.brickMoment = brickMoment;
            let newColor = brickColors[Math.floor(Math.random() * brickColors.length)];
            g.bricks.push({x: x0, y: y0, t: 0, c: newColor, mouse_d: cxy.c});
        }
        g.bricks.forEach((brick, i)=>{
            fMakeBrickByCenter(brick, i);
        });

    }
    window.addEventListener('resize', ()=>{
        vars.brick_cnv.width = vars.brick_cnv.getBoundingClientRect().width;
        vars.brick_cnv.height = vars.brick_cnv.getBoundingClientRect().height;
    });

});

//temp();
function temp() {
    let str = '';
    for (let i = 100; i >= 0; i -= 2) {
        //background-image: radial-gradient(var(--c-2) 5%, var(--c-5) 15%, var(--c) 60%);
        str += (100 - i) + '% {background-image: radial-gradient(var(--c-2) ' + i + '%, var(--c-5) ' + (2 * i) + '%, transparent ' + (3 * i) + '%);}\n';
    }
    console.log(str);
}
