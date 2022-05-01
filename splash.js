export function crateSplashScreen() {
  let cont = document.querySelector(".cont");
  cont.style.display = "none";
  let mySplash = document.createElement("div");
  let startBtn = document.createElement("div");
  mySplash.classList.add("splash");
  mySplash.textContent = "MineCraft";
  startBtn.innerText = "Start";
  startBtn.style.cursor = "pointer";
  startBtn.style.border = "5px solid";
  startBtn.style.margin = "10px";
  startBtn.style.padding = "10px";
  document.body.appendChild(mySplash);
  mySplash.appendChild(startBtn);
  let howToPlay = document.createElement("div");
  howToPlay.innerText = "How to play";
  howToPlay.style.padding = "10px";
  howToPlay.style.border = "5px solid";
  howToPlay.style.cursor = "pointer";
  mySplash.appendChild(howToPlay);
  howToPlay.addEventListener("click", function () {
    howToPlay.style.fontSize = "20px";
    howToPlay.style.color = "#06113C";
    howToPlay.style.backgroundColor = "#30AADD";
    howToPlay.textContent =
      "MineCraft is a 2D sandbox game, press Start and begin creativeness greatness . By Michael Vezdenev";
  });
  startBtn.addEventListener("click", function () {
    cont.style.display = "flex";
    mySplash.style.display = "none";
  });
}
