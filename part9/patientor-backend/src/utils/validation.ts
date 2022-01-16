import { Gender } from "../types"

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