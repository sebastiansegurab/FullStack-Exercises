import { Discharge, Entry, Gender, HealthCheckRating, NewBaseEntry, SickLeave } from "../types"

export const parseString = (text: any): string => {
    if (!text || !isString(text)) {
        throw new Error("Incorrect or missing string " + text)
    }
    return text
}

export const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date " + date)
    }
    return date
}

export const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender " + gender)
    }
    return gender
}

const isString = (text: any): text is string => {
    return typeof text === "string" || text instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param)
}

const isEntry = (param: any): param is Entry => {
    return param.type === "Hospital" || param.type === "OccupationalHealthcare" || param.type === "HealthCheck";
}

export const parseDischarge = (discharge: any): Discharge => {
    if (!discharge) {
        throw new Error("Missing discharge");
    }
    if (!discharge.date) {
        throw new Error("Missing parameter date");
    }
    const dischargeDate = parseDate(discharge.date);
    if (!discharge.criteria) {
        throw new Error("Missing parameter criteria");
    }
    const dischargeCriteria = parseString(discharge.criteria);
    return {
        date: dischargeDate,
        criteria: dischargeCriteria
    }
}

export const parseSickLeave = (sickLeave: any): SickLeave => {
    if (!sickLeave) {
        throw new Error("Missing sickLeave");
    }
    if (!sickLeave.startDate) {
        throw new Error("Missing parameter startDate");
    }
    const sickLeaveStartDate = parseDate(sickLeave.startDate);
    if (!sickLeave.endDate) {
        throw new Error("Missing parameter endDate");
    }
    const sickLeaveEndDate = parseDate(sickLeave.endDate);
    return {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate
    }
}

export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    switch (param) {
        case 0:
        case 1:
        case 2:
        case 3:
            return true;
        default: return false;
    }
}

export const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!isHealthCheckRating(healthCheckRating)) {
        throw new Error("Incorrect or missing healthCheckRating " + healthCheckRating)
    }
    return healthCheckRating;
}

export const parseEntry = (entry: any): NewBaseEntry => {
    if (!entry || !isEntry(entry)) {
        throw new Error("Missing entry or incorrect type");
    }
    const descriptionParam = parseString(entry.description);
    const dateParam = parseDate(entry.date);
    const specialistParam = parseString(entry.specialist);
    return {
        description: descriptionParam,
        date: dateParam,
        specialist: specialistParam,
        diagnosisCodes: []
    }
}