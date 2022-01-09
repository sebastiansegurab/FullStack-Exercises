import express from 'express';
const app = express();
import diagnoseRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';
app.use(express.json());

const PORT = 3000;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});