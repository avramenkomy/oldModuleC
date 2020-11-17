const clock = document.querySelector('#clock');
const color = document.querySelector('#color');
const divClock = document.querySelector('#rgb-clock');
const stopButton = document.querySelector('.j-stop-btn');


function checkLength(value, interval) {
    if (value.length < interval) {
        return 0 + value;
    };
    return value;
};

function rgbClock() {
    const date = new Date();

    const h = String(date.getHours());
    const m = String(date.getMinutes());
    const s = String(date.getSeconds());

    const colorString = `rgb(${h*10}, ${m*4.25}, ${s*4.25})`

    clock.innerText = checkLength(h, 2) + ':' + checkLength(m, 2) + ':' + checkLength(s, 2);
    color.innerText = colorString;

    divClock.style.background = colorString;
};

const intervalId = setInterval(rgbClock, 1000);

stopButton.addEventListener('click', () => {
    clearInterval(intervalId);
    color.innerText = "Stop time"
});