import diagnosisData from "../data/diagnoses.json";
import { Diagnosis } from "../types";

const diagnosis: Array<Diagnosis> = diagnosisData as Array<Diagnosis>;

const getDiagnosis = (): Array<Diagnosis> => diagnosis;

export default { getDiagnosis };
