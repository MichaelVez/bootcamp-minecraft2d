// export function crateGrid() {
//   let grid = document.querySelector(".grid");
//   for (let i = 0; i < 30; i++) {
//     for (let j = 0; j < 18; j++) {
//       let cell = document.createElement("div");
//       cell.setAttribute("x", j + 1);
//       cell.setAttribute("y", i + 1);
//       cell.setAttribute("id", i + j);
//       cell.classList.add("cell");
//       grid.appendChild(cell);
//     }
//   }
// }
export function crateGrid() {
  let cont = document.querySelector(".cont");
  let grid = document.querySelector(".grid");
  let tools = document.querySelector(".tools");
  let gridcolumns = 30;
  let gridrows = 20;
  let martrix = [];

  for (let i = 0; i < gridrows; i++) {
    for (let i = 0; i < gridcolumns; i++) {
      let unit = document.createElement("div");
      unit.classList.add("unit");
      grid.appendChild(unit);
    }
  }
}
