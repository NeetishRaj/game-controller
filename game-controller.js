function controller(element) {
    let canvas = document.createElement('CANVAS');
    document.body.appendChild(canvas);
    canvas.style.background = "radial-gradient(deepskyblue, black)";
    canvas.style.borderRadius = "50%";
    canvas.style.opacity = "0.6";
    canvas.style.zIndex = "10";
    canvas.style.position = "absolute";
    canvas.style.bottom = "0";
    canvas.style.right = "0";
    let cx = canvas.getContext('2d');
    const W = innerWidth;
    const H = innerHeight;
    const CW = 150;
    const CH = 150;
    const EW = parseInt(element.style.width);
    const EH = parseInt(element.style.height);
    const SPEED = 5;
    canvas.width = CW;
    canvas.height = CH;

    //set CSS for the moving element and canvas
    (function setObject() {
        element.style.position = 'absolute';
        element.style.left = `${Math.ceil(W / 2)}px`;
        element.style.top = `${Math.ceil(H / 2)}px`;
        element.style.zIndex = "5";
        //console.log("CSS set");
    })();

    const controller = {
        x: 0,
        y: 0
    };
    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleMove, false);
    canvas.addEventListener("mousedown", mouseStart, false);
    canvas.addEventListener("mouseup", mouseEnd, false);
    canvas.addEventListener("mouseover", mouseMove, false);
    let ongoingTouches = [];
    let interval;
    let mouseMode = false;

    function handleStart(evt) {
        evt.preventDefault();
        let touches = evt.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            controller.x = (touches[i].pageX - W + CW / 2) / (CW / 2);
            controller.y = (touches[i].pageY - H + CH / 2) / (CH / 2);
        }
        //console.log(`x:${controller.x} Y:${controller.y}`);
        interval = setInterval(positionElement, 20);
    }

    function handleEnd(evt) {
        evt.preventDefault();
        clearInterval(interval);
        controller.x = 0;
        controller.y = 0;
    }

    function handleCancel(evt) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        clearInterval(interval);
        for (var i = 0; i < touches.length; i++) {
            //var idx = ongoingTouchIndexById(touches[i].identifier);
            //ongoingTouches.splice(idx, 1); // remove it; we're done
        }
    }

    function handleMove(evt) {
        evt.preventDefault();
        let touches = evt.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            controller.x = (touches[i].pageX - W + CW / 2) / (CW / 2);
            controller.y = (touches[i].pageY - H + CH / 2) / (CH / 2);
        }
        //console.log(`x:${controller.x} Y:${controller.y}`);
        positionElement();
    }

    function mouseStart(evt) {
        controller.x = (evt.pageX - W + CW / 2) / (CW / 2);
        controller.y = (evt.pageY - H + CH / 2) / (CH / 2);
        mouseMode = true;
        interval = setInterval(positionElement, 20);
    }

    function mouseEnd() {
        controller.x = 0;
        controller.y = 0;
        mouseMode = false;
        clearInterval(interval);
    }

    function mouseMove(evt) {
        if (mouseMode) {
            // clearInterval(interval);
            controller.x = (evt.pageX - W + CW / 2) / (CW / 2);
            controller.y = (evt.pageY - H + CH / 2) / (CH / 2);
            positionElement();
        }
    }

    function positionElement() {
        let currentX = parseInt(element.style.left);
        let currentY = parseInt(element.style.top);
        //console.log(parseInt(element.style.left));
        //console.log(parseInt(currentY));
        // parseInt(element.style.left) + Math.ceil(SPEED * controller.x)
        if (currentX >= 0 && currentX <= (W - EW) && currentY >= 0 && currentY <= (H - EH)) {
            element.style.left = `${currentX + Math.ceil(SPEED * controller.x)}px`;
            element.style.top = `${currentY + Math.ceil(SPEED * controller.y)}px`;
        } else if (currentX < 0) {
            element.style.left = "0px";
        } else if (currentX > (W - EW)) {
            element.style.left = `${W - EW}px`;
        } else if (currentY < 0) {
            element.style.top = "0px";
        } else if (currentY > (H - EH)) {
            element.style.top = `${H - EH}px`;
        }
    }
}
