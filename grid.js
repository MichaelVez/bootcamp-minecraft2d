let gridColumns_X = 30;
let gridRows_Y = 20;
let totalCells = gridColumns_X * gridRows_Y;
let grid = document.querySelector(".grid");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getFiftyFifty() {
  return Math.random() < 0.5;
}
export function crateGrid() {
  let index = gridColumns_X * gridRows_Y;
  for (let i = 0; i < gridRows_Y; i++) {
    for (let j = 0; j < gridColumns_X; j++) {
      let unit = document.createElement("div");
      unit.classList.add("unit");
      unit.setAttribute("data-y", gridRows_Y - i);
      unit.setAttribute("data-x", j);
      unit.setAttribute("data-index", index);
      index--;
      grid.appendChild(unit);
    }
  }
}
export function crateLand() {
  let minDirtHeight = 6;
  let maxDirtHeight = 12;
  let dirtHeight = getRandomInt(minDirtHeight, maxDirtHeight);

  let cell = document.querySelectorAll(".unit");
  for (let i = 0; i < totalCells; i++) {
    if (parseInt(cell[i].getAttribute("data-y")) < dirtHeight) {
      cell[i].setAttribute("data-type", "dirt");
    }
  }
  //grass
  for (let i = 0; i < gridColumns_X; i++) {
    cell[totalCells - (dirtHeight * 30 - 30) + i].setAttribute(
      "data-type",
      "grass"
    );
  }

  //!render random blocks by type and ranges
  //render block param = dirt height - type of block to render - 2numbers to generate instences asd
  renderBlock(dirtHeight, "stone", 5, 8, 2, 5);
  renderBlock(dirtHeight - 2, "coal", 2, 4, 2, 3);
  renderBlock(dirtHeight - 2, "green", 1, 2, 1, 2);
  renderBlock(dirtHeight - 3, "diamond", 2, 3, 1, 4);
  clearLandscape(dirtHeight);
  addLandScapeBumps(dirtHeight);
  addTrees(1, 4);
  addOnTop("bush", 1, 20);
  addOnTop("flower", 1, 3);
  addOnTop("flower2", 1, 3);
}

export function renderBlock(
  dirtHeight,
  typeOfBlock,
  minInstance,
  maxInstance,
  minSize,
  maxSize
) {
  let cell = document.querySelectorAll(".unit");
  let numberOfInstances = getRandomInt(minInstance, maxInstance);
  for (let i = 0; i < numberOfInstances; i++) {
    let randomY = getRandomInt(1, dirtHeight);
    let randomX = getRandomInt(1, gridColumns_X);
    let boulderSize = getRandomInt(minSize, maxSize);
    for (let i = 0; i < totalCells; i++) {
      if (
        parseInt(cell[i].getAttribute("data-x")) === randomX &&
        parseInt(cell[i].getAttribute("data-y")) === randomY
      ) {
        //! RANDOMIZE MATRIX MADNESS!!!
        for (let j = 0; j < boulderSize; j++) {
          if (getFiftyFifty())
            if (cell[i + j] !== undefined)
              cell[i + j].setAttribute("data-type", typeOfBlock);
          if (getFiftyFifty())
            if (cell[i - j] !== undefined)
              cell[i - j].setAttribute("data-type", typeOfBlock);
          if (getFiftyFifty())
            if (cell[i + (gridColumns_X * j + j)] !== undefined)
              cell[i + (gridColumns_X * j + j)].setAttribute(
                "data-type",
                typeOfBlock
              );
          if (getFiftyFifty())
            if (cell[i + (gridColumns_X * j - j)] !== undefined)
              cell[i + (gridColumns_X * j - j)].setAttribute(
                "data-type",
                typeOfBlock
              );
          if (getFiftyFifty())
            if (cell[i - (gridColumns_X * j + j)] !== undefined)
              cell[i - (gridColumns_X * j + j)].setAttribute(
                "data-type",
                typeOfBlock
              );
          if (getFiftyFifty())
            if (cell[i - (gridColumns_X * j - j)] !== undefined)
              cell[i - (gridColumns_X * j - j)].setAttribute(
                "data-type",
                typeOfBlock
              );
        }
      }
    }
  }
}
function clearLandscape(dirtHeight) {
  let cell = document.querySelectorAll(".unit");
  //nothing floating in the air (:
  let pos = gridColumns_X * (dirtHeight - 1) + 1;
  let totalClearingNeeded = gridColumns_X * gridRows_Y - pos;
  for (let i = 0; i <= totalClearingNeeded; i++) {
    cell[i].removeAttribute("data-type");
  }
}
function addLandScapeBumps(dirtHeight) {
  let cell = document.querySelectorAll(`[data-y="${dirtHeight - 1}"]`);
  let cell2 = document.querySelectorAll(`[data-y="${dirtHeight - 2}"]`);
  let cell3 = document.querySelectorAll(`[data-y="${dirtHeight - 3}"]`);
  cell[3].removeAttribute("data-type");
  for (let i = 0; i < cell.length; i++) {
    if (getFiftyFifty()) {
      cell[i].removeAttribute("data-type");
      if (getFiftyFifty()) {
        cell2[i].removeAttribute("data-type");
        if (getFiftyFifty()) {
          cell3[i].removeAttribute("data-type");
        }
      }
    }
  }
}

function getTopCellOnX(X) {
  let column = document.querySelectorAll(`[data-x="${X}"]`);
  for (let i = 0; i < column.length; i++) {
    if (column[i].getAttribute("data-type") !== null) {
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
function getCellLeft(cell) {
  return cell.nextSibling;
}
function getCellRight(cell) {
  return cell.previousSibling;
}

function addTrees(min, max) {
  let numOfTrees = getRandomInt(min, max);
  let treeSum = 0;
  for (let x = 2; x <= gridColumns_X - 2; x++) {
    let cell = getTopCellOnX(x);
    //set grass with exception of stone
    if (cell.getAttribute("data-type") !== "stone") {
      cell.setAttribute("data-type", "grass");
    }

    if (getFiftyFifty())
      if (getFiftyFifty())
        if (getFiftyFifty())
          if (
            cell.getAttribute("data-type") === "grass" &&
            treeSum <= numOfTrees
          ) {
            treeSum++;
            let thisTopCell = getTopCellOnXSky(x);
            thisTopCell.setAttribute("data-type", "wood");

            let minTreeHeight = 3;
            let maxTreeHeight = 7;
            let randomTreeHeight = getRandomInt(minTreeHeight, maxTreeHeight);
            for (let i = 0; i < randomTreeHeight; i++) {
              getTopCellOnXSky(x).setAttribute("data-type", "wood");
            }
            let randomNum = getRandomInt(1, 5);
            for (let i = randomNum; i !== 0; i--) {
              if (getTopCellOnXSky(x))
                getTopCellOnXSky(x).setAttribute("data-type", "leaves");
              getCellLeft(getTopCellOnX(x)).setAttribute("data-type", "leaves");
              getCellRight(getTopCellOnX(x)).setAttribute(
                "data-type",
                "leaves"
              );
            }
            if (getTopCellOnXSky(x))
              getTopCellOnXSky(x).setAttribute("data-type", "leaves");
            x++;
          }
  }
}
function addOnTop(item, min, max) {
  let randomNumber = getRandomInt(min, max);
  let count = 0;
  for (let i = 0; i < gridColumns_X; i++) {
    if (getFiftyFifty() && getFiftyFifty() && count <= randomNumber) {
      if (getTopCellOnX(i).getAttribute("data-type") === "grass") {
        count++;
        getTopCellOnXSky(i).setAttribute("data-type", item);
      }
    }
  }
}
