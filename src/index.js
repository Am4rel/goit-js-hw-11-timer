const refs = {
    days: document.querySelector("span[data-value=days]"),
    hours: document.querySelector("span[data-value=hours]"),
    mins: document.querySelector("span[data-value=mins]"),
    secs: document.querySelector("span[data-value=secs]"),
    chooseBtn: document.querySelector(".choose-btn"),
    stopBtn: document.querySelector(".stop-btn"),
    clearBtn: document.querySelector(".clear-btn"),
}

const CountdownTimer = function (selector, targetDate) {
  this.selector = selector;
  this.targetDate = targetDate;
};

let intervalId = null;

refs.chooseBtn.addEventListener("click", () => {
    const timer = pickTheDate();

    if (timer) {
        intervalId = setInterval(() => {
            const fullTime = getTime(timer.targetDate);

            refs.days.textContent = fullTime.days;
            refs.hours.textContent = fullTime.hours;
            refs.mins.textContent = fullTime.mins;
            refs.secs.textContent = fullTime.secs;
        }, 1000);
    }

    refs.chooseBtn.setAttribute("disabled", true)
})

refs.clearBtn.addEventListener("click", clearTimer)


function getTime(endTime) {
    const timeNow = Date.now()
    const time = endTime.valueOf() - timeNow;

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    return {days, hours, mins, secs}
}

function clearTimer() {
    if (intervalId) {
        clearInterval(intervalId)
        console.log(`Interval ${intervalId} is cleared!`)
        intervalId = null;
    }

    refs.chooseBtn.removeAttribute("disabled")

    refs.days.textContent = 0;
    refs.hours.textContent = 0;
    refs.mins.textContent = 0;
    refs.secs.textContent = 0;
}

function pickTheDate() {
    const dateCount = document.querySelector(".date-picker").value;
    let timer;
    if (dateCount !== "") {
        timer = new CountdownTimer('#timer-1', new Date(dateCount.split("-")[0], dateCount.split("-")[1] - 1, dateCount.split("-")[2]));
    }

    return timer;
}