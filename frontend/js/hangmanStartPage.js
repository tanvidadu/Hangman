window.onload = () => {
  const hangmanMainContent = document.getElementById("hangmanMainContent");
  const proceedBtn = document.getElementById("proceedBtn");
  const restartBtn = document.getElementById("restart");
  $('#statusDisplay').hide();

  restartBtn.addEventListener("click", () => {
    hangmanMainContent.style.display = "inherit";
    const gamePlayStart = document.getElementById("gamePlayStart");
    gamePlayStart.style.display = "none";
    restartBtn.style.display = "none";
    $('#statusDisplay').hide();
    $('#attempts').hide();
  });

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

  proceedBtn.addEventListener("click", () => {
    $.post('/guessWord', { word: $('#wordEnter').val().trim().toLowerCase() }, (data) => {
      $('#statusDisplay').show();
      $("#currentLetter").show();
      startGame($('#wordEnter').val().trim().toLowerCase().length, $('#wordEnter').val().trim().toLowerCase(), data);
    });
  });

  const startGame = (count, destinedWord, dataSet) => {
    $('#attempts').show();
    console.log(count, destinedWord, dataSet);
    hangmanMainContent.style.display = "none";
    const gamePlayStart = document.getElementById("gamePlayStart");
    gamePlayStart.style.display = "flex";
    restartBtn.style.display = "inherit";
    gamePlayStart.innerHTML = "";
    for(let i=0; i<count; i++) {
      const divElement = document.createElement("div");
      divElement.innerHTML = `<div class="letters">${destinedWord[i]}</div>`
      divElement.style.color = "#000000";
      divElement.classList.add("fillBox");
      gamePlayStart.appendChild(divElement);
    }
    const guessess = dataSet;
    const letters = Array.from(document.getElementsByClassName("letters"));

    let dict = {};
    letters.forEach((letter, i) => {
      if(dict[letter.innerText]) {
        dict[letter.innerText].pos.push(i);
      } else {
        dict[letter.innerText] = { present: true, pos: [i]};
      }
    });

    guessess.forEach((l, i) => {
      setTimeout(() => {
        $('#attempts').text(`attempts: ${i+1}`);
        $("#currentLetter").text(l);
        if(dict[l] && dict[l].present) {
          $(".colorGreen")[0].style.display = 'block';
          $(".colorRed")[0].style.display = 'none';
          console.log(`positions of ${l} are ${dict[l].pos}`);
          dict[l].pos.forEach((p) => {
            letters[p].style.color = "#ffffff";
            letters[p].classList.add("animated");
            letters[p].classList.add("bounceInDown");
          });
        } else {
          $(".colorGreen")[0].style.display = 'none';
          $(".colorRed")[0].style.display = 'block';
        }
      }, i * 700);
    });
  }
}
