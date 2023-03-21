const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
// bodyEl.style.textAlign = "center";
let timerId = null;
const isActive = () => !!timerId;
startBtn.addEventListener('click', () => {
    startBtn.setAttribute('disabled','');
    if (!isActive()) {
        timerId = setInterval(() => {
            bodyEl.style.backgroundColor = getRandomHexColor();
        }, 1000
        );
    }
});
stopBtn.addEventListener('click', () => {
    startBtn.removeAttribute('disabled');
    clearInterval(timerId);
    timerId = null;
})
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}