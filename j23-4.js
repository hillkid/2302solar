/////////////////////////////////////////////////////////  取得頁面元素
const areaNavs = document.querySelectorAll('nav');
const allBtns = document.querySelectorAll('.btns');
const areaTitle = document.getElementById("up-title");
const areaBody = document.getElementById("up-body");
const areaInfo = document.querySelector(".infomation");
const areaCount = document.querySelector('.timer-count');
const areaEnd = document.querySelector('.timer-end');

let theUniverse = document.getElementById("universe");
let theSolar = document.getElementById("solar");
let theClockFace = document.getElementById("watchface");

let orbitMer = document.getElementById("mer-orbit");
let orbitVen = document.getElementById("ven-orbit");
let orbitHour = document.getElementById("ear-orbit");
let orbitMin = document.getElementById("mar-orbit");
let orbitJup = document.getElementById("jup-orbit");
let orbitSat = document.getElementById("sat-orbit");
let orbitSec = document.getElementById("ura-orbit");
let orbitNep = document.getElementById("nep-orbit");

let theHour = document.getElementById("hour");
let theMinute = document.getElementById("minute");
let theSecond = document.getElementById("second");

let theSun = document.getElementById("sun");
let theMercury = document.getElementById("mercury");
let theVenus = document.getElementById("venus");
let theEarth = document.getElementById("earth");
let theMars = document.getElementById("mars");
let theJupiter = document.getElementById("jupiter");
let theSaturn = document.getElementById("saturn");
let theUranus = document.getElementById("uranus");
let theNeptune = document.getElementById("neptune");
let theMoon = document.getElementById("moon");


let btnClearCount ;

///////////////////////////////////////////////////////////////////  蕃茄鐘
let countDown;  // 外層變數，供計時器主體使用
const countButtons = document.querySelectorAll('[data-time]');//監聽1-按鈕
countButtons.forEach(button => button.addEventListener('click',timeToCount));
function timeToCount(){
  const urSec = parseInt(this.dataset.time);
  startCount(urSec);
}
document.customForm.addEventListener('submit',function(e){//監聽2-自訂時間
  e.preventDefault();
    // 因為用form，submit後避免跳頁，使用preventDefault()來阻止預設事件
  const urMin=this.urMinutes.value;
  startCount(urMin*60);
  this.reset();
})

function startCount(urSec){
  clearHeader();  // 新計時器被啟動時，先把原本的setInterval清除
  nightOn();
  theUniverse.style.background = "radial-gradient(#030, black)";
  countFace();

  orbitSec.style.animation="none";

  areaTitle.innerHTML="蕃茄鐘";
  areaBody.innerHTML="專注"+urSec+"秒";
  const now=Date.now();
  const timeStamp=now + urSec*1000 ;

  btnClearCount=now + 20000 ;
  setTimeout(clearBtns,21000);

  showLeft(urSec);
  countDown=setInterval(()=>{
    const countSec=Math.round(( timeStamp-Date.now())/1000);
    // console.log(timeStamp);
    // console.log(Date.now());
    // console.log(countSec);
  
    if(countSec<0){
      clearInterval(countDown);
      alert('時間到');
      return;
    }
    showLeft(countSec);
  },1000);
}
function showLeft(urSec){
  const leftMin=Math.floor(urSec/60);
  const leftSec=urSec%60;
  const leftTime=`${(leftMin<10)?'0':''}${leftMin}:${(urSec%60<10)?'0':''}${urSec%60}`;
  document.title=leftTime;// 改title去顯示對應時間
  areaCount.textContent=leftTime;//顯示在頁首
  orbitSec.style.transform = `rotate(${leftSec*6}deg)`;//顯示在鐘
  orbitMin.style.transform = `rotate(${leftMin*6}deg)`;
}
function countFace() {
  orbitMer.classList.add('d-none');
  orbitVen.classList.add('d-none');
  orbitHour.classList.add('d-none');
  orbitSat.classList.add('d-none');
  orbitNep.classList.add('d-none');
}
function stopCount(){
  clearInterval(countDown);
  orbitMer.classList.remove('d-none');
  orbitVen.classList.remove('d-none');
  orbitHour.classList.remove('d-none');
  orbitSat.classList.remove('d-none');
  orbitNep.classList.remove('d-none');
}

/////////////////////////////////////////////////////////////////  碼表
let startTiming;
function extendTiming(doThis) {
  switch (doThis) {
    case "reset":
      resetTiming();break;
    case "on":
      onTiming();break;
    case "end":
      endTiming();break;
  }
}
function resetTiming(){
  clearHeader();
  dayOn();
  theUniverse.style.background = "radial-gradient(#500, black)";
  timingFace();

  orbitSec.style.animation="none";
  orbitSat.style.animation="none";

  orbitMin.style.transform = "rotate(0)";
  orbitSec.style.transform = "rotate(0)";
  orbitSat.style.transform = "rotate(0)";
}
function onTiming(){
  resetTiming();
  timeStart = new Date();
  timingMove();
  startTiming=setInterval(()=>{
    let timingNow =Math.round((Date.now()-timeStart)/1000);
    showLeft(timingNow);
  },1000);
}
function endTiming(){  
  pauseTiming();

  const now=Date.now();
  btnClearCount=now + 20000 ;
  setTimeout(clearBtns,21000);

  orbitSat.style.animation="none";
  timingCentSec=Math.floor(((Date.now()-timeStart)%1000)/10);
  orbitSat.style.transform = `rotate(${timingCentSec*3.6}deg)`;
  areaEnd.innerHTML='.'+timingCentSec;
}
function pauseTiming(){
  clearInterval(startTiming);
}
function timingFace() {
  orbitHour.classList.add('d-none');
  orbitJup.classList.add('d-none');
}
function timingMove(){
  orbitSat.style.animation="spin 1s linear infinite";
}
function stopTiming(){
  pauseTiming();
  orbitHour.classList.remove('d-none');
  orbitJup.classList.remove('d-none');
}

///////////////////////////////////////////////////  時鐘
let startClock;
let theUtc;

function onClock(UTC = 0){
  theUtc=UTC;
  clearHeader();
  let nowTime = new Date();

  let now = Date.now();
  btnClearCount=now + 20000 ;
  setTimeout(clearBtns,21000);

  let nowHour = nowTime.getHours()+theUtc;
  ((nowHour<6 && nowHour>=-6) || (nowHour>=18)) ? nightOn() : dayOn();
  areaBody.innerHTML= (nowHour<13 & nowHour>=0) ? "a.m." : "p.m.";
  switch(UTC) {
    case 0:
      areaTitle.innerHTML="Taipei";break;
    case -13:
      areaTitle.innerHTML="New York";break;
    case -8:
      areaTitle.innerHTML="London";break;
    case -4:
      areaTitle.innerHTML="Tehran";break;
  }
  moveClock();
  checkClock();
  startClock = setInterval(checkClock,60000);
  //checkClock是參數，故不使用括號，否則會變成呼叫函式，一次就終止
}
function checkClock(){
  let nowTime = new Date();
  let nowHour = nowTime.getHours()+theUtc;
  let UtcMin = (theUtc== -4)?'30':'';
  let nowMin = nowTime.getMinutes()-UtcMin;
  // let nowSec = nowTime.getSeconds();
  // let nowDegMin = nowMin * 6 + nowSec / 10;
  let nowDegMin = nowMin * 6;
  let nowDegHour = nowHour * 30 + nowMin / 2;

  orbitMin.style.transform = `rotate(${nowDegMin}deg)`;
  orbitHour.style.transform = `rotate(${nowDegHour}deg)`;
  // document.title=`${nowHour}:${(nowMin<10)?'0':''}${nowMin}`;// 改title去顯示對應時間


}
// function onClock(UTC = 0){
//   theUtc=UTC;
//   clearHeader();
//   let nowTime = new Date();
//   let nowHour = nowTime.getHours()+theUtc;
//   ((nowHour<6 && nowHour>=-6) || (nowHour>=18)) ? nightOn() : dayOn();
//   areaBody.innerHTML= (nowHour<13 & nowHour>=0) ? "a.m." : "p.m.";
//   switch(UTC) {
//     case 0:
//       areaTitle.innerHTML="";break;
//     case -13:
//       areaTitle.innerHTML="New York";break;
//     case -8:
//       areaTitle.innerHTML="London";break;
//   }
//   moveClock();
//   startClock = setInterval(()=>{
//     nowTime = new Date();
//     nowHour = nowTime.getHours()+theUtc;
//     let nowMin = nowTime.getMinutes();
//     let nowSec = nowTime.getSeconds();
//     let nowDegMin = nowMin * 6 + nowSec / 10;
//     let nowDegHour = nowHour * 30 + nowMin / 2;
//     orbitMin.style.transform = `rotate(${nowDegMin}deg)`;
//     orbitHour.style.transform = `rotate(${nowDegHour}deg)`;
//     document.title=`${nowHour}:${(nowMin<10)?'0':''}${nowMin}`;// 改title去顯示對應時間
//   }, 60000);
// }

function moveClock(){
  orbitSec.style.animation="spin 60s linear infinite";
  orbitSat.style.animation="spin 30s linear infinite";
}
function stopClock(){
  clearInterval(startClock);
}


///////////////////////////////////////////////////  換日夜鐘面
function dayOn(){
  theUniverse.style.background= "radial-gradient(#444, black)";
  // theUniverse.style.background= "radial-gradient(#555, black)";
  theSun.style.animation="sunlight 5s infinite alternate";
  theSun.src="./j23watch/0sun.png";
  theUranus.src="./j23watch/7uranus.png";
  theSaturn.src="./j23watch/6saturn.png";
  theJupiter.src="./j23watch/5jupiter.png";
  theVenus.src="./j23watch/2venus.png";
  theMars.src="./j23watch/4mars.png";
  theMercury.src="./j23watch/1mercury.png";
  theEarth.src="./j23watch/3earth.png";
  theHour.src="./j23watch/clock-1.png";
  theMinute.src="./j23watch/clock-2.png";
  theSecond.src="./j23watch/clock-3.png";
}
function nightOn(){
  theUniverse.style.background= "radial-gradient(#005, black)";
  theSun.style.animation="nightlight 5s infinite alternate";
  theSun.src="./j23watch/0sun-n.png";
  theUranus.src="./j23watch/7uranus-n.png";
  theSaturn.src="./j23watch/6saturn-n.png";
  theJupiter.src="./j23watch/5jupiter-n.png";
  theVenus.src="./j23watch/2venus-n.png";
  theMars.src="./j23watch/4mars-n.png";
  theMercury.src="./j23watch/1mercury-n.png";
  theEarth.src="./j23watch/3earth-n.png";
  theHour.src="./j23watch/clock-1-y.png";
  theMinute.src="./j23watch/clock-2-y.png";
  theSecond.src="./j23watch/clock-3-n.png";
}


///////////////////////////////////////////////////  實際比例
function trueSize(){
  clearHeader();
  theUniverse.style.background= "radial-gradient(#306, black)";
  theSun.style.animation="nightlight 5s infinite alternate";
  theSun.src="./j23watch/0sun-n.png";
  // nightOn()
  let referSize=30;
  theMercury.style.width=`${referSize*1}%`;
  theVenus.style.width=`${referSize*2.5}%`;
  theEarth.style.width=`${referSize*2.6}%`;
  theMars.style.width=`${referSize*1.4}%`;
  theJupiter.style.width=`${referSize*29.3}%`;
  theSaturn.style.width=`${referSize*58}%`;
  theUranus.style.width=`${referSize*10.5}%`;
  theNeptune.style.width=`${referSize*10.2}%`;

  theMercury.style.marginTop='110%';
  theVenus.style.marginTop='220%';
  theEarth.style.marginTop='490%';
  theMars.style.marginTop='820%';
  theJupiter.style.marginTop='500%';
  theSaturn.style.marginTop='200%';
  theUranus.style.marginTop='100%';
  theNeptune.style.marginTop='450%';

  orbitMer .style .animation = 'spin 0.75s linear infinite' ;
  orbitVen .style .animation = 'spin 2.25s linear infinite' ;
  orbitHour .style .animation = 'spin 3.75s linear infinite' ;
  orbitMin .style .animation = 'spin 6.75s linear infinite' ;
  orbitJup .style .animation = 'spin 45s linear infinite' ;
  orbitSat .style .animation = 'spin 137s linear infinite' ;
  orbitSec .style .animation = 'spin 315s linear infinite' ;
  orbitNep .style .animation = 'spin 618s linear infinite' ;

  theJupiter .style .animation = 'none' ;
  theSaturn .style .animation = 'none' ;
  theUranus .style .animation = 'none' ;

  theSecond.style.display='none';
  theMinute.style.display='none';
  theHour.style.display='none';
  theClockFace.style.display='none';
  theMoon.style.display='none';

  areaInfo.classList.remove('d-none');

  areaNavs.forEach(areaNavs=>areaNavs.style.display='none');
  let btnBack = document.getElementById("btnBack");
  btnBack.classList.remove('d-none');
  btnBack.style.display='block';
}


function fakeBtn(thisBtn) {
  let urBtn = document.getElementById(thisBtn);
  if (urBtn.style.display == "block") {
    urBtn.style.display = "none";    
  }  else {
    allBtns.forEach(Btn=>Btn.style.display='none');
    urBtn.style.display = "block";
  }
}
function clearHeader(){
  stopTiming();
  stopCount();
  stopClock();
  areaTitle.innerHTML='';
  areaBody.innerHTML='';
  areaCount.innerHTML='';
  areaEnd.innerHTML='';
}
function clearBtns(){
  const countSec=Math.round(( btnClearCount-Date.now())/1000);
  console.log(countSec);
  if(countSec<0){
    document.getElementById('btnClock').style.display = "none";
    document.getElementById('btnCount').style.display = "none";
    document.getElementById('btnTimer').style.display = "none";
  }
}

setTimeout(onClock,2000);
// window.onload= onClock();
// document.getElementById(btnClock).style.display = "none";
