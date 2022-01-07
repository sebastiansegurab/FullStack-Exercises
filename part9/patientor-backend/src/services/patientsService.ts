import patientsData from "../data/patients.json";
import { PatientEntry } from "../types";

const patients: Array<PatientEntry> = patientsData as Array<PatientEntry>;

const getPatients = (): Array<PatientEntry> => patients;

export default { getPatients };
