export function crateSplashScreen() {
  let cont = document.querySelector(".cont");
  cont.style.display = "none";
  let mySplash = document.createElement("div");
  let startBtn = document.createElement("div");
  mySplash.classList.add("splash");
  mySplash.textContent = "MineCraft";
  startBtn.innerText = "Start";
  startBtn.style.border = "2px solid";
  document.body.appendChild(mySplash);
  mySplash.appendChild(startBtn);
  startBtn.addEventListener("click", function () {
    cont.style.display = "flex";
    mySplash.style.display = "none";
  });
}
