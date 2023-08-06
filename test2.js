let drag = null;
let boxs = document.querySelectorAll("#box");
let box = document.getElementById("box");
let Text = document.getElementById("Text");

function Addbtn() {
  if (Text.value != "") {
    boxs[0].innerHTML += `
        <p class="item" draggable="true"> ${Text.value} </p>
        `;
    Text.value = "";
  }
  dragitem();
}
function dragitem() {
  let items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("dragstart", function () {
      drag = item;
      item.style.opacity = "0.5";
    });
    item.addEventListener("dragend", function () {
      drag = null;
      item.style.opacity = "1";
    });
    boxs.forEach((box) => {
      box.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.style.background = "green";
        this.style.color = "yellow";
      });
      box.addEventListener("dragleave", function () {
        this.style.background = "aliceblue";
        this.style.color = "black";
      });
      box.addEventListener("drop", function () {
        box.append(drag);
        this.style.background = "aliceblue";
        this.style.color = "black";
      });
    });
  });
}
