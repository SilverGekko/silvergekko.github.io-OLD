var timer_running = false;
var list_itr = 0;
var reps = 0;
var group0 = [];
var group1 = ["g1", "g2", "g3", "g4", "g5"]
var group2 = ["g6", "g7", "g8"]
var group3 = ["g9", "g10"]
var group4 = ["g11", "g12"]
var timeout_time = 1000;
var rep_text = "Repetitions Done: "

function build_groups() {
  group0 = [];
  console.log(document.getElementById("group0CheckBox").checked);
  console.log(document.getElementById("group1CheckBox").checked);
  console.log(document.getElementById("group2CheckBox").checked);
  console.log(document.getElementById("group3CheckBox").checked);
  if (document.getElementById("group0CheckBox").checked == true) {
    group0 = group0.concat(group1);
    console.log(group0);

  }
  if (document.getElementById("group1CheckBox").checked) {
    group0 = group0.concat(group2);
  }
  if (document.getElementById("group2CheckBox").checked) {
    group0 = group0.concat(group3);
  }
  if (document.getElementById("group3CheckBox").checked) {
    group0 = group0.concat(group4);
  }
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function toggleTimer(elem) {
  if (!timer_running) {
    build_groups()
    timer_running = true;
    elem.innerHTML = "Stop Timer   "
    elem.classList.remove("btn-primary");
    elem.classList.add("btn-danger");
    console.log(group0);
    document.getElementById(group0[list_itr]).classList.add("image-holder-active");
    document.getElementById("reps").innerHTML = rep_text + reps
    var t = setTimeout(function() {incrTimer(0, 0, 0)}, timeout_time);
  } else {
    timer_running = false;
    clearTimeout(timeout_loop);
    document.getElementById('timer-text').innerHTML = "00:00:00";
    group0.forEach(id => document.getElementById(id).classList.remove("image-holder-active"));
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
  document.getElementById('timer-text').innerHTML = checkTime(h) + ":" + checkTime(m) + ":" + checkTime(s);
  timeout_loop = setTimeout(function() {incrTimer(s, m, h)}, timeout_time);
}

function stopTimer() {
  timer_running = false;
  clearTimeout(timeout_loop);
}

function incrTimerVals(sec, min, hour) {
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
    document.getElementById(group0[list_itr]).classList.remove("image-holder-active");
    list_itr++;
    if (list_itr >= group0.length) {
      list_itr = 0;
      reps++;
      document.getElementById("reps").innerHTML = rep_text + reps
      if (reps >= 7) {
        reps = 0;
        toggleTimer(document.getElementById("timer-button"));
        return;
      }
    }
    document.getElementById(group0[list_itr]).classList.add("image-holder-active");
  }
  return [sec, min, hour];
}