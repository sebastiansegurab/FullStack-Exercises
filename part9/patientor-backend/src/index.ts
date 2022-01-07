import express from 'express';
const app = express();
import patientsRouter from './routes/patientsRouter';
app.use(express.json());

const PORT = 3000;

app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});