var timer_running = false;
var list_itr = 0;
var reps = 0;
var pic_list = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g10", "g11"];
var timeout_loop;
var timeout_time = 1000;

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function toggleTimer(elem) {
  if (!timer_running) {
    timer_running = true;
    elem.innerHTML = "Stop Timer   "
    elem.classList.remove("btn-primary");
    elem.classList.add("btn-danger");
    // pic_list.forEach(id => document.getElementById(id).classList.add("image-holder-active"));
    document.getElementById(pic_list[list_itr]).classList.add("image-holder-active");
    document.getElementById("reps").innerHTML = "Repetitions: " + reps
    var t = setTimeout(function() {incrTimer(0, 0, 0)}, timeout_time);
  } else {
    timer_running = false;
    clearTimeout(timeout_loop);
    document.getElementById('timer-text').innerHTML = "00:00:00";
    // document.getElementById('g5').classList.add('image-holder-active');
    pic_list.forEach(id => document.getElementById(id).classList.remove("image-holder-active"));
    elem.innerHTML = "Begin Timer"
    elem.classList.remove("btn-danger");
    elem.classList.add("btn-primary");
    list_itr = 0;
  }
}

function incrTimer(s, m, h) {
  var values = incrTimerVals(s, m, h);
  if (!timer_running) return;
  s = values[0];
  m = values[1];
  h = values[2];
  console.log("incrTimer");
  console.log(values);
  document.getElementById('timer-text').innerHTML = checkTime(h) + ":" + checkTime(m) + ":" + checkTime(s);
  timeout_loop = setTimeout(function() {incrTimer(s, m, h)}, timeout_time);
}

function stopTimer() {
  timer_running = false;
  clearTimeout(timeout_loop);
}

function incrTimerVals(sec, min, hour) {
  console.log("incrTimerVals");
  console.log(sec, min, hour);
  sec += 1;
  if (sec >= 60) {
    sec = 0;
    min += 1;
  }
  if (min >= 60) {
    min = 0;
    hour += 1;
  }
  if (hour >= 24) {
    sec = 0;
    min = 0;
    hour = 0;
  }
  if (sec % 5 == 0) {
    document.getElementById(pic_list[list_itr]).classList.remove("image-holder-active");
    list_itr++;
    if (list_itr >= pic_list.length) {
      list_itr = 0;
      reps++;
      document.getElementById("reps").innerHTML = "Repetitions: " + reps
      if (reps >= 7) {
        reps = 0;
        toggleTimer(document.getElementById("timer-button"));
        return;
      }
    }
    document.getElementById(pic_list[list_itr]).classList.add("image-holder-active");
  }
  return [sec, min, hour];
}