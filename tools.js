let inventoryCont = document.querySelector(".inventory");
let pick = document.querySelectorAll(".tool")[0];
let axe = document.querySelectorAll(".tool")[1];
let shovel = document.querySelectorAll(".tool")[2];
let activeTool = "pick";
let godActive = false;
let arrOfBlock = [
  "stone",
  "dirt",
  "grass",
  "leaves",
  "diamond",
  "coal",
  "flower",
  "flower2",
  "wood",
  "green",
  "bush",
];
export function tools() {
  let objTools = {
    pick: {
      stone: true,
      diamond: true,
      coal: true,
      green: true,
      flower: true,
      flower2: true,
      bush: true,
      leaves: true,
    },
    axe: {
      wood: true,
      flower: true,
      flower2: true,
      bush: true,
      leaves: true,
    },
    shovel: {
      flower: true,
      flower2: true,
      bush: true,
      leaves: true,
      dirt: true,
      grass: true,
    },
    god: {
      stone: true,
      diamond: true,
      coal: true,
      green: true,
      flower: true,
      flower2: true,
      bush: true,
      dirt: true,
      grass: true,
      wood: true,
      leaves: true,
    },
  };
  let inventory = {
    itemsArr: {},
    add: function (obj) {
      inventory.itemsArr[obj]
        ? inventory.itemsArr[obj]++
        : (inventory.itemsArr[obj] = 1);

      if (inventory.itemsArr[obj] === 1) {
        let item = document.createElement("div");
        let itemCount = document.createElement("div");
        let row1 = document.querySelector(".row1");
        let row2 = document.querySelector(".row2");
        itemCount.classList.add("itemCount");
        itemCount.textContent = inventory.itemsArr[obj];
        item.classList.add("item");
        item.setAttribute("data-type", obj);
        itemCount.classList.add(`inv-${obj}`);
        item.appendChild(itemCount);
        if (row1.children.length < 5) {
          row1.appendChild(item);
        } else {
          row2.appendChild(item);
        }
      } else {
        let thisItem = document.querySelector(`.inv-${obj}`);
        thisItem.textContent = inventory.itemsArr[obj];
      }

      let item1 = document.querySelectorAll(".item");
      item1.forEach((element) => {
        element.addEventListener("click", function (event) {
          item1.forEach((el) => {
            el.children.item(0).classList.remove("active");
            activeTool = element.getAttribute("data-type");
            el.classList.remove("active");
          });
          event.target.classList.add("active");
          axe.classList.remove("active");
          pick.classList.remove("active");
          shovel.classList.remove("active");
        });
      });
    },
    remove: function (obj) {
      inventory.itemsArr[obj]--;
      if (inventory.itemsArr[obj] === 0) {
        document.querySelectorAll(".active").forEach((element) => {
          element.classList.remove("active");
        });
        let itemPoint = document.querySelector(`.inv-${obj}`);
        // itemPoint.style.display = "none";
        let itemCon = document.querySelector(".inventory");
        itemPoint.parentElement.remove();
        activeTool = "pick";
        pick.classList.add("active");
      }
      let itemCount = document.querySelector(`.inv-${obj}`);

      if (itemCount !== null) itemCount.textContent = inventory.itemsArr[obj];
    },
  };

  pick.addEventListener("click", function (event) {
    activeTool = "pick";
    document.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    pick.classList.add("active");
  });

  axe.addEventListener("click", function (event) {
    activeTool = "axe";
    document.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    axe.classList.add("active");
  });

  shovel.addEventListener("click", function (event) {
    activeTool = "shovel";
    document.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    shovel.classList.add("active");
  });

  function cellOnClick() {
    console.log(godActive);
    let cell = document.querySelectorAll(".unit");
    cell.forEach((element) => {
      element.addEventListener("click", function (event) {
        let typeofBlock = event.target.getAttribute("data-type");
        if (arrOfBlock.includes(activeTool)) {
          if (typeofBlock === null) {
            event.target.setAttribute("data-type", activeTool);
            inventory.remove(activeTool);
          }
        } else if (objTools[activeTool][typeofBlock] !== undefined)
          if (objTools[activeTool][typeofBlock] && blockIsOnTop(event.target)) {
            inventory.add(typeofBlock);
            event.target.removeAttribute("data-type");
          }
      });
    });
  }
  cellOnClick();
  btns();
  function btns() {
    let creative = document.querySelector(".btn2");
    creative.addEventListener("click", function (event) {
      if (!godActive) {
        //add infi block
        //addevent to go back
        activeTool = "god";
        pick.style.display = "none";
        shovel.style.display = "none";
        axe.style.display = "none";
        let god = document.createElement("div");
        god.classList.add("sword");
        god.style.background;
        let btns = document.querySelector(".btns");
        btns.appendChild(god);
        godActive = true;
        //allow to destroy any tile
        let cell = document.querySelectorAll(".unit");
        cell.forEach((element) => {
          element.addEventListener("click", function (event) {
            let typeofBlock = event.target.getAttribute("data-type");
            console.log(typeofBlock);
            if (typeofBlock !== null) {
              if (arrOfBlock.includes(activeTool)) {
                if (typeofBlock === null) {
                  event.target.setAttribute("data-type", activeTool);
                  inventory.remove(activeTool);
                }
              } else {
                inventory.add(typeofBlock);
                event.target.removeAttribute("data-type");
              }
            }
          });
        });
        for (let i = 0; i < 200; i++) {
          for (let j = 0; j < arrOfBlock.length; j++) {
            inventory.add(arrOfBlock[j]);
          }
        }
      }
    });
  }
}
console.log(godActive);
//todo classic.addEventListener

function blockIsOnTop(item) {
  let itemY = item.getAttribute("data-y");
  let itemX = item.getAttribute("data-x");
  let index = item.getAttribute("data-index");
  let res = getTopCellOnX(itemX);
  let left = getCellLeft(item);
  let right = getCellRight(item);
  let cellAbove = document.querySelector(
    `[data-index="${parseInt(index) + 30}"]`
  );
  let cellBelow = document.querySelector(
    `[data-index="${parseInt(index) - 30}"]`
  );

  if (
    res.getAttribute("data-y") !== itemY &&
    cellAbove.getAttribute("data-type") !== null &&
    cellBelow.getAttribute("data-type") !== null &&
    left.getAttribute("data-type") !== null &&
    right.getAttribute("data-type") !== null
  ) {
    return false;
  }
  return true;
}
function getTopCellOnX(X) {
  let column = document.querySelectorAll(`[data-x="${X}"]`);
  for (let i = 0; i < column.length; i++) {
    if (
      column[i].getAttribute("data-type") !== null &&
      column[i].getAttribute("data-type") !== "leaves"
    ) {
      return column[i];
    }
  }
}
function getTopCellOnXSky(X) {
  let column = document.querySelectorAll(`[data-x="${X}"]`);
  for (let i = 0; i < column.length; i++) {
    if (column[i].getAttribute("data-type") !== null) {
      return column[i - 1];
    }
  }
}
function getCellRight(cell) {
  return cell.nextSibling;
}
function getCellLeft(cell) {
  return cell.previousSibling;
}
