import patientData from "../data/patients";
import { Entry, NewEntry, NewPatient, Patient } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { parseDate, parseDischarge, parseEntry, parseGender, parseHealthCheckRating, parseSickLeave, parseString } from "../utils/validation";
import { assertNever } from "../utils/utils";

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Patient[] => {
    return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
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

const addEntry = (patient: Patient, object: NewEntry): Entry => {
    const entry: Entry = {
        id: uuidv4(),
        ...object
    }
    patient.entries.push(entry);
    return entry;
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

const toEntryObject = (object: any): NewEntry => {
    const entry = parseEntry(object);
    let toNewEntry;
    switch (object.type) {
        case "Hospital":
            toNewEntry = {
                ...entry,
                type: object.type,
                discharge: parseDischarge(object.discharge)
            }
            break;
        case "OccupationalHealthcare":
            if (object.sickLeave) {
                toNewEntry = {
                    ...entry,
                    type: object.type,
                    employerName: parseString(object.employerName),
                    sickLeave: parseSickLeave(object.sickLeave)
                }
            } else {
                toNewEntry = {
                    ...entry,
                    type: object.type,
                    employerName: parseString(object.employerName),
                }
            }
            break;
        case "HealthCheck":
            toNewEntry = {
                ...entry,
                type: object.type,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            }
            break;
        default: 
            return assertNever(object);
    }
    return toNewEntry;
}

export default { getPatients, getPatient, addPatient, toPatientObject, addEntry, toEntryObject };
