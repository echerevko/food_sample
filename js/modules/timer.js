function timer(id, deadline) {
  //Timer
  // Countdown timer:
  // 1. Create a function that sets our timer, receives elements with html
  // 2. Create a function that will count the deadline and how many days, hours,.. left until the end of the promotion
  // 3. Create a function that will update our timer

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      timerItem = document.querySelectorAll('.timer-item'),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock(); //not to blink timer

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      for (let key in t) {
        if (t[key] < 0) {
          clearInterval(timeInterval);
          timerItem.forEach((item) => {
            item.innerHTML = '00';
          });
        }
      }
    }
  }
  setClock(id, deadline);
}
export default timer;
