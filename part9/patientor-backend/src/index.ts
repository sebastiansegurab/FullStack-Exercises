import express from 'express';
import cors from "cors";
const app = express();
import diagnosisRouter from './routes/diagnosisRouter';
import patientRouter from './routes/patientRouter';
app.use(express.json());
app.use(cors())

const PORT = 3001;

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});