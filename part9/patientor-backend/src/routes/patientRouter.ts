import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).send(patientService.getPatients());
})

router.get('/:id', (req, res) => {
    const patient = patientService.getPatient(req.params.id)
    if(patient){
        res.status(200).json(patient)
    } else {
        res.status(404).send("Patient not found.")
    }
})

router.post('/', (req, res) => {
    try {
        const patientObject = patientService.toPatientObject(req.body)
        patientObject.entries = []
        const newPatient = patientService.addPatient(patientObject);
        res.status(201).json(newPatient)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).send(err.message)
        }
    }
})

router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientService.getPatients().find(p => p.id === req.params.id);
        const newEntry = patientService.toEntryObject(req.body)
        if(patient && newEntry){
            const entry = patientService.addEntry(patient, req.body);
            res.status(201).json(entry)
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).send(err.message)
        }
    }
})

export default router;