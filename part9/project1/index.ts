import express from 'express'
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { weight: weightP } = req.query
    const { height: heightP } = req.query;
    if (!weightP || !heightP) {
        res.status(404).json({error: "Bad request! Must pass all required parameters"});
    } else if (isNaN(Number(weightP)) || isNaN(Number(heightP))) {
        res.status(404).json({error: "Bad request. All parameters must be numbers"});
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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});