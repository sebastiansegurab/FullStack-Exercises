import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { weight: weightP } = req.query;
    const { height: heightP } = req.query;
    if (!weightP || !heightP) {
        res.status(404).json({ error: "Bad request! Must pass all required parameters" });
    } else if (isNaN(Number(weightP)) || isNaN(Number(heightP))) {
        res.status(404).json({ error: "Bad request. All parameters must be numbers" });
    } else {
        res.status(200).json(
            {
                weight: weightP,
                height: heightP,
                bmi: calculateBmi(Number(heightP), Number(weightP))
            }
        );
    }
});

app.post('/calculator', function (req, res) {
    if (!req.body) {
        res.status(404).json({ error: "Bad request! Must pass all required parameters" });
    }
    const { daily_exercises } = req.body;
    const { target: targetP } = req.body;
    if (!daily_exercises || !targetP) {
        res.status(404).json({ error: "Bad request! Must pass all required parameters" });
    } else if (!Array.isArray(daily_exercises) || typeof targetP !== "number") {
        res.status(404).json({ error: "Bad request! The types of the parameters are incorrect" });
    }
    else {
        res.status(200).json(
            calculateExercises(daily_exercises, targetP)
        );
    }
});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});