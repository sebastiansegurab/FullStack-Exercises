import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).send(patientService.getPatients());
})


router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body
    const newPatient = patientService.addPatient({ name, dateOfBirth, ssn, gender, occupation });
    res.status(201).json(newPatient)
})

export default router;