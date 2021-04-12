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
            renewVisibleTime(fullTime)
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
        intervalId = null;
    }

    refs.chooseBtn.removeAttribute("disabled")
    const newTime = { days: 0, hours: 0, mins: 0, secs: 0 };
    renewVisibleTime(newTime)
}

function pickTheDate() {
    const dateCount = document.querySelector(".date-picker").value;
    let timer;
    if (dateCount !== "") {
        timer = new CountdownTimer('#timer-1', new Date(dateCount.split("-")[0], dateCount.split("-")[1] - 1, dateCount.split("-")[2]));
    }

    return timer;
}

function renewVisibleTime({ days, hours, mins, secs }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
}