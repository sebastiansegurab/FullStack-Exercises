import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).send(patientService.getPatients());
})

router.post('/', (req, res) => {
    try {
        const patientObject = patientService.toPatientObject(req.body)
        const newPatient = patientService.addPatient(patientObject);
        res.status(201).json(newPatient)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).send(err.message)
        }
    }
})

export default router;