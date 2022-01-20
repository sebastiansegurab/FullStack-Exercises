import patientData from "../data/patients";
import { NewPatient, Patient } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { parseDate, parseGender, parseString } from "../utils/validation";

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Patient[] => {
    return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries
    }));
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (object: NewPatient): Patient => {
    const patient: Patient = {
        id: uuidv4(),
        ...object
    }
    patients.push(patient)
    return patient
};

const toPatientObject = (object: any): NewPatient => {
    const patient: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
    }
    return patient
}

export default { getPatients, getPatient, addPatient, toPatientObject };
