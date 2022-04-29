import { crateSplashScreen as splash } from "./splash.js";
import { crateGrid as crateGrid } from "./grid.js";
let cont = document.querySelector(".cont");
let grid = document.querySelector(".grid");
//splash open splash
splash();
//crate grid
crateGrid();
//todo style all the block and crate some land
// let cell = document.querySelectorAll(".cell");
// cell[0].classList.add("dirt");
// for(let i = 0; i <cell.length;i++){
//     if(cell[i].getAttribute('y') === '26')
//     cell[i].setAttribute('data-type', 'dirt');
// }
