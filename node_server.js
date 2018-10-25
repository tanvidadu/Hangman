const express = require("express");
const app = express();
const process = require("process");
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/hangmanStartPage.html'));
});

app.post('/guessWord', (req, res) => {
  const word = req.body.word;
  const spawnSync = require('child_process').spawnSync,
    py = spawnSync('python', ['pythonBackend/hangman.py'], { input: word });
  let dataString = '';

  let stdout = py.stdout.toString();
  let stderr = py.stderr.toString();

  let requiredData = null;

  if(stderr) {
    console.log(stderr);
  } else {
    requiredData = stdout.split('\n');
    requiredData = requiredData[requiredData.length - 4];
    requiredData = requiredData.split(',');
    requiredData = requiredData.map(elem => {
      return elem.split("'")[1];
    });
  }

  res.send(requiredData);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("started server");
});
