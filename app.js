const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 초기 캔버스 색 지정

ctx.strokeStyle = INITIAL_COLOR; // 사용자가 이 컬러를 첫번째 색으로 시작
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 붓 굵기

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  if (filling === false) {
    painting = true;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // painting === false 이면 경로를 만든다. !painting = !false (true)의미, if문 실행
    ctx.beginPath(); //클릭하지 않고 마우스만 움직일 때 path가 만들어짐
    ctx.moveTo(x, y); // 선 시작점 좌표
  } else {
    //그린다.(마우스를 움직이는 내내 발생)
    ctx.lineTo(x, y); // 선 끝점 좌표
    ctx.stroke(); // 선 그리기
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  console.log(event);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === false) {
    filling = true;
    mode.innerText = "Fill";
  } else {
    filling = false;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL("image / png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // 마우스 움직이고 있을 때
  canvas.addEventListener("mousedown", startPainting); //마우스를 누르고 있을 때
  canvas.addEventListener("mouseup", stopPainting); //마우스 클릭 해제 시
  canvas.addEventListener("mouseleave", stopPainting); // 마우스가 캔버스를 벗어났을 때
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
