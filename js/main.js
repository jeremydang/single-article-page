var container = document.getElementById("container");
var delay = false;

var keys = [32, 37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function disableScroll() {
    window.onwheel = window.onmousewheel = document.onmousewheel = preventDefault;
    document.onkeydown = keydown;
    document.body.ontouchmove = preventDefault;
}

function enableScroll() {
    window.onwheel = window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
}

function onScroll(e) {
    if (container.className === "container" && !delay) {
        e.preventDefault();
        disableScroll();
        addAnimation();
        window.scrollTo(0, 1);
        window.setTimeout(enableScroll, 500);
    } else if (container.className !== "container" && window.scrollY == 0) {
        container.className = "container";
        delay = true;
        window.setTimeout(function() { delay = false }, 500);
    }
}

function addAnimation() {
    container.className = "container animated";
}


window.addEventListener("wheel", onScroll);
document.addEventListener("keydown", onScroll);
document.body.addEventListener("touchmove", onScroll);