export interface Diagnose {
    code: String,
    name: String,
    latin?: String
}

export enum Gender {
    Male = "male",
    Female = "female"
}

export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'entries' >
export type NewPatient = Omit<Patient, "id">;