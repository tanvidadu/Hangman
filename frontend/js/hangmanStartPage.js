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
      startGame(options[i], dummyWords[i]);
    })
  });

  const startGame = (count, destinedWord) => {
    const gamePlayStart = document.getElementById("gamePlayStart")
    gamePlayStart.innerHTML = "";
    for(let i=0; i<count; i++) {
      const divElement = document.createElement("div");
      divElement.classList.add("fillBox");
      gamePlayStart.appendChild(divElement);
    }
  }
}
