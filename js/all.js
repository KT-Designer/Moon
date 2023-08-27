$(document).ready(function () {
    // 浮動選單收合功能_PC
    $(".close").click(function () {
        $(".menu_pc").animate({ right: '-200' }, 600, function () {
            $(".open").animate({ right: '0' }, 500);
        });
    });

    $(".open").click(function () {
        $(".open").animate({ right: '-50' }, 600, function () {
            $(".menu_pc").animate({ right: '0' }, 700);
        });
    });


});


// 置頂鍵
window.onscroll = function () {
    var e = document.getElementById("scrolltop");
    if (!e) {
        e = document.createElement("a");
        e.id = "scrolltop";
        e.href = "#";
        document.body.appendChild(e);
    }
    e.style.display = document.documentElement.scrollTop > 300 ? "block" : "none";
    e.onclick = (ev) => {
        ev.preventDefault();
        document.documentElement.scrollTop = 0;
    };
};





// 浮動選單_監聽網頁滾動
window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;

    var anchorLinks = document.getElementsByClassName('anchor-link');
    for (var i = 0; i < anchorLinks.length; i++) {
        var targetId = anchorLinks[i].firstChild.getAttribute('href').substring(1);
        var targetElement = document.getElementById(targetId);

        if (targetElement) {
            var targetPosition = targetElement.offsetTop - 100; // 偏移量，根據需要自行調整

            if (scrollPosition >= targetPosition && scrollPosition < targetPosition + targetElement.offsetHeight) {
                // 將之前的活動錨點取消活動狀態
                var activeLinks = document.getElementsByClassName('anchor-link active');
                for (var j = 0; j < activeLinks.length; j++) {
                    activeLinks[j].classList.remove('active');
                }

                // 將目前滾動到的區塊的錨點設置為活動狀態
                anchorLinks[i].classList.add('active');
                anchorLinks[i].firstChild.classList.add('active');
            } else {
                // 若區塊滾動出視窗，則移除活動狀態
                anchorLinks[i].classList.remove('active');
                anchorLinks[i].firstChild.classList.remove('active');
            }
        }
    }
});


// 螢火蟲
function Animation(selector, option) {
    this.canvas = this.init(selector);
    this.fireflies = new Array(option.count).fill({}).map(function () {
        return new Firefly(option);
    });
    this.draw();
}

Animation.prototype.init = function (selector) {
    var canvas = document.querySelector(selector);
    var resize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    return canvas;
}

Animation.prototype.draw = function () {
    var drawer = this.draw.bind(this);

    this.redraw();
    window.requestAnimationFrame(drawer);
}

Animation.prototype.redraw = function () {
    var ctx = this.canvas.getContext('2d');

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.fireflies.forEach(function (firefly) {
        firefly.fly();
        firefly.flicker();

        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = firefly.color;
        ctx.shadowBlur = firefly.radius * 5;
        ctx.shadowColor = "yellow";
        ctx.fill();
    })
}

function Firefly(option) {
    this.x = random(window.innerWidth, option.radius, true);
    this.y = random(window.innerHeight, option.radius, true);
    this.radius = random(option.radius + 0.5, option.radius - 0.5);
    this.veer = false;
    this.angle = random(360, 0, true);
    this.rate = random(30 / 1000, 6 / 1000);
    this.speed = random(option.speed, option.speed / 8);
    this.opacity = random(1, 0.001);
    this.flare = this.opacity > 0.5;
    this.color = option.color;
}

Firefly.prototype.fly = function () {
    if (this.angle >= 360 || this.angle <= 0 || Math.random() * 360 < 6) {
        this.veer = !this.veer;
    }

    // this.speed -= this.veer ? -.01 : .01;
    this.angle -= this.veer ? -this.speed : this.speed;
    this.x += Math.sin((Math.PI / 180) * this.angle) * this.speed;
    this.y += Math.cos((Math.PI / 180) * this.angle) * this.speed;

    if (this.x < 0) this.x += window.innerWidth;
    if (this.x > window.innerWidth) this.x -= window.innerWidth;
    if (this.y < 0) this.y += window.innerHeight;
    if (this.y > window.innerHeight) this.y -= window.innerHeight;
}

Firefly.prototype.flicker = function () {
    if (this.opacity >= 1 || this.opacity <= 0.001) {
        this.flare = !this.flare;
    }

    this.opacity -= this.flare ? -this.rate : this.rate;
    this.color = setOpacity(this.color, this.opacity.toFixed(3));
}

function random(max, min, isInt) {
    return isInt
        ? Math.floor((Math.random() * (max - min) + min))
        : Number((Math.random() * (max - min) + min).toFixed(3));
}

function setOpacity(color, opacity) {
    var colors = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\S+)\)$/);

    return "rgba(" + colors[1] + ", " + colors[2] + ", " + colors[3] + ", " + opacity + ")";
}

new Animation('#fireflies', {
    count: 30,
    color: 'rgba(253, 219, 163, 1)',
    speed: 1,
    radius: 5
});
