const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://nivinprasad2004:6VsHVbvvrCiYHzhe@cluster0.z7zxvvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const HighScoreSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  score: { type: Number, required: true },
});

const HighScore = mongoose.model('HighScore', HighScoreSchema);

app.get('/highscore', async (req, res) => {
  try {
    const highScore = await HighScore.findOne();
    res.json(highScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/highscore', async (req, res) => {
  const { playerName, score } = req.body;
  try {
    let highScore = await HighScore.findOne();
    if (highScore) {
      highScore.playerName = playerName;
      highScore.score = score;
      await highScore.save();
    } else {
      highScore = new HighScore({ playerName, score });
      await highScore.save();
    }
    res.json(highScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
