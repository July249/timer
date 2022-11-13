const $timer = document.querySelector('.timer');
const $buttons = document.querySelector('.buttons');

/* time display elements */
const $hourDisplay = $timer.querySelector('.hrs .timer-counter-num');
const $minDisplay = $timer.querySelector('.min .timer-counter-num');
const $secDisplay = $timer.querySelector('.sec .timer-counter-num');

/* time input elements */
const $hourInput = $timer.querySelector('#hour-input');
const $minInput = $timer.querySelector('#minute-input');
const $secInput = $timer.querySelector('#second-input');

/* buttons */
const $controllerBtns = $buttons.querySelectorAll('button');

/* button event control */
$controllerBtns.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const target = e.currentTarget;
    if (target.classList.contains('reset-btn')) {
      timerReset();
    } else if (target.classList.contains('start-btn')) {
      if (
        parseInt($hourDisplay.textContent) ||
        parseInt($minDisplay.textContent) ||
        parseInt($secDisplay.textContent)
      ) {
        timerStart();
      }
      return;
    } else if (target.classList.contains('pause-btn')) {
      timerStandBy();
    }
  });
});

function timerReset() {
  activeInput();

  /* button 안의 img src 변경 */
  $controllerBtns.forEach((btn) => {
    if (
      btn.classList.contains('start-btn') ||
      btn.classList.contains('pause-btn')
    ) {
      btn.classList.remove('pause-btn');
      btn.classList.add('start-btn');
      btn.firstElementChild.src = './src/images/button/start-disabled.png';
    } else if (btn.classList.contains('reset-btn')) {
      btn.firstElementChild.src = './src/images/button/reset-disabled.png';
    }
  });
  location.reload(true);
}

function timerStandBy() {
  activeInput();

  /* button 안의 img src 변경 */
  $controllerBtns.forEach((btn) => {
    if (btn.classList.contains('start-btn')) {
      btn.classList.remove('pause-btn');
      btn.classList.add('start-btn');
      btn.firstElementChild.src = './src/images/button/start-default.png';
    } else if (btn.classList.contains('reset-btn')) {
      btn.firstElementChild.src = './src/images/button/reset-default.png';
    }
  });

  let hour = $hourDisplay.textContent;
  let min = $minDisplay.textContent;
  let sec = $secDisplay.textContent;

  const remainTime = hour * 3600000 + min * 60000 + sec * 1000;

  countDown(remainTime, false);

  /*   
  hour = parseInt(remainTime / 3600000);
  min = parseInt((remainTime - hour * 3600000) / 60000);
  sec = parseInt((remainTime - hour * 3600000 - min * 60000) / 1000);

  $hourInput.value = hour;
  $minInput.value = min;
  $secInput.value = sec; */
}

function timerStart() {
  activeDisplay();

  /* button 안의 img src 변경 */
  $controllerBtns.forEach((btn) => {
    if (btn.classList.contains('start-btn')) {
      btn.classList.remove('start-btn');
      btn.classList.add('pause-btn');
      btn.firstElementChild.src = './src/images/button/pause.png';
    } else if (btn.classList.contains('reset-btn')) {
      btn.firstElementChild.src = './src/images/button/reset-default.png';
    }
  });

  const hour = $hourDisplay.textContent;
  const min = $minDisplay.textContent;
  const sec = $secDisplay.textContent;

  const time = hour * 3600000 + min * 60000 + sec * 1000;
  countDown(time, true);
}

/* input to display */
$hourInput.addEventListener('keyup', (e) => {
  const inputValue = e.currentTarget.value;
  const validResult = hourValidationTest(inputValue);

  if (!validResult) {
    $hourInput.value = '';
  } else {
    if (inputValue === 0) {
      $hourDisplay.textContent = '00';
    } else if (inputValue < 10) {
      $hourDisplay.textContent = '0' + inputValue.toString();
    } else {
      $hourDisplay.textContent = inputValue.toString();
    }
  }
});

$minInput.addEventListener('keyup', (e) => {
  const inputValue = e.currentTarget.value;
  const validResult = minuteValidationTest(inputValue);

  if (!validResult) {
    $minInput.value = '';
  } else {
    if (inputValue === 0) {
      $minDisplay.textContent = '00';
    } else if (inputValue < 10) {
      $minDisplay.textContent = '0' + inputValue.toString();
    } else {
      $minDisplay.textContent = inputValue.toString();
    }
  }
});

$secInput.addEventListener('keyup', (e) => {
  const inputValue = e.currentTarget.value;
  const validResult = secondValidationTest(inputValue);

  if (!validResult) {
    $secInput.value = '';
  } else {
    if (inputValue == 0) {
      $secInput.value = '';
    }
    if (inputValue < 10 && inputValue > 0) {
      $secDisplay.textContent = '0' + inputValue.toString();
    } else {
      $secDisplay.textContent = inputValue.toString();
    }
  }
});

/* validation test */
function hourValidationTest(value) {
  const strValue = value.toString();

  if (strValue.length === 0) {
    return true;
  } else if (strValue.length === 1) {
    const regEx = /[0-9]/g;
    return regEx.test(strValue);
  } else if (strValue.length === 2) {
    const regEx = /([1][0-9])|([2][0-4])/g;
    return regEx.test(strValue);
  } else {
    return false;
  }
}

function minuteValidationTest(value) {
  const strValue = value.toString();

  if (strValue.length === 0) {
    return true;
  } else if (strValue.length === 1) {
    const regEx = /^[0-9]/g;
    return regEx.test(strValue);
  } else if (strValue.length === 2) {
    const regEx = /[0-5][0-9]/g;
    return regEx.test(strValue);
  } else {
    return false;
  }
}

function secondValidationTest(value) {
  const strValue = value.toString();

  if (strValue.length === 0) {
    return false;
  } else if (strValue.length === 1) {
    const regEx = /^[0-9]/g;
    return regEx.test(strValue);
  } else if (strValue.length === 2) {
    const regEx = /[0-5][0-9]/g;
    return regEx.test(strValue);
  } else {
    return false;
  }
}

/* on/off - add or remove active class */
function activeDisplay() {
  /* input의 active 클래스 제거 */
  const inputs = $timer.querySelectorAll('.timer-counter-input');
  inputs.forEach((input) => input.classList.remove('active'));
  /* box의 active 클래스 추가 */
  const boxImages = $timer.querySelectorAll('.timer-counter-box');
  boxImages.forEach((box) => box.classList.add('active'));
}

function activeInput() {
  /* box의 active 클래스 제거 */
  const boxImages = $timer.querySelectorAll('.timer-counter-box');
  boxImages.forEach((box) => box.classList.remove('active'));

  /* input의 active 클래스 추가 */
  const inputs = $timer.querySelectorAll('.timer-counter-input');
  inputs.forEach((input) => input.classList.add('active'));
}

/* count down */
/* 
01초 => 1,000ms
10초 => 10,000ms
01분 => 60초 => 60,000ms
10분 => 600초 => 600,000ms
1시간 => 60분 => 3600초 => 3600,000ms
*/
function countDown(time, run) {
  if (time > 1000 && run) {
    counter(time - 1000);
    setTimeout(() => {
      console.log(time - 1000);
      countDown(time - 1000, true);
    }, 1000);
  } else if (time > 1000 && !run) {
    const remainTime = time;
    alert('시간이 정지 되었습니다.');
    location.reload(true);
    counter(remainTime);
  } else {
    timerReset();
    alert('시간이 다 되었습니다!');
  }
}

function counter(time) {
  const hour = parseInt(time / 3600000);
  const min = parseInt((time - hour * 3600000) / 60000);
  const sec = parseInt((time - hour * 3600000 - min * 60000) / 1000);

  $hourDisplay.textContent = hour;
  $minDisplay.textContent = min;
  $secDisplay.textContent = sec;

  $hourInput.value = hour;
  $minInput.value = min;
  $secInput.value = sec;
}

/* 시간 / 분 / 초 입력 가능 */
/* Start 버튼 누르면 타이머가 1초 단위로 감소 */
/* Pause를 누르면 타이머가 멈춤 */
/* 다시 Start 누르면 재시작 */
/* 0초가 되면 초기화 */
/* Reset 누르면 초기화 */

/* 
기본 default로 input이 나타나게 만든다
start 버튼을 누르면 pause 버튼으로 이미지를 바꾼다
pause 버튼을 누르면 start 버튼으로 이미지를 바꾼다
타이머가 종료되면 alert가 나타난다

리셋 또는 모두 0을 표기되는 경우 버튼이 모두 음각처리되고 색깔이 없다
*/
