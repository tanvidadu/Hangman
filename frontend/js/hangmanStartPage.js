window.onload = () => {
  const hangmanMainContent = document.getElementById("hangmanMainContent");

  setTimeout(() => {
    const hangmanPreloader = document.getElementById("hangmanPreloader");
    hangmanPreloader.style.display = "none";
    hangmanMainContent.style.display = "inherit";
  }, 3000);

  const countOptions = Array.from(document.getElementsByClassName("options"));
  const options = [3, 4, 5, 6];
  const dummyWords = ["tea", "home", "yummy", "pantry"]
  countOptions.forEach((elem, i) => {
    elem.addEventListener("click", () => {
      console.log(`option ${options[i]} clicked`);
      startGame(options[i], "yummy");
    })
  });

  const startGame = (count, destinedWord) => {
    const gamePlayStart = document.getElementById("gamePlayStart")
    gamePlayStart.innerHTML = "";
    for(let i=0; i<count; i++) {
      const divElement = document.createElement("div");
      divElement.innerHTML = `<div class="letters">${destinedWord[i]}</div>`
      divElement.style.color = "#000000";
      divElement.classList.add("fillBox");
      gamePlayStart.appendChild(divElement);
    }
    const guessess = ["u", "m", "y"];
    const letters = Array.from(document.getElementsByClassName("letters"));
    guessess.forEach((letter, i) => {
      letters.forEach((l) => {
        if(l.innerText == letter) {
          setTimeout(() => {
            l.style.color = "#ffffff";
            l.classList.add("animated");
            l.classList.add("bounceInDown");
          }, i * 1000);
        }
      });
    });
  }
}
