import patientData from "../data/patients.json";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { parseDate, parseGender, parseString } from "../utils/validation";

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
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
    }
    return patient
}

export default { getPatients, addPatient, toPatientObject };
