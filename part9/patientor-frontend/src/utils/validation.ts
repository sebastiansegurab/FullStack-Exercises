export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

export const isEntry = (param: string): boolean => {
    return param === "Hospital" || param === "OccupationalHealthcare" || param === "HealthCheck";
};

export const isHealthCheckRating = (param: number): boolean => {
    console.log(param);
    console.log(typeof param);
    switch (param) {
        case 0:
        case 1:
        case 2:
        case 3:
            return true;
        default: return false;
    }
};

export const isStringWithoutSpaces = (text: string): boolean => {
    return text.trim().length > 0;
};