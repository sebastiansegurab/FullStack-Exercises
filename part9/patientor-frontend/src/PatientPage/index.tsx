import React from "react";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const PatientPage: React.FC = () => {
    const [{ patients }] = useStateValue();

    const { id } = useParams<{ id: string }>();

    const patient = Object.values(patients).find((p: Patient) => p.id === id);

    let genderIcon: "mercury" | "venus" | "neuter";

    if (patient) {
        switch (patient.gender) {
            case "male":
                genderIcon = "mercury";
                break;
            case "female":
                genderIcon = "venus";
                break;
            default:
                genderIcon = "neuter";
        }
        return (
            <div>
                <h3>{patient.name} <Icon name={genderIcon} /></h3>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
            </div>
        );
    }

    return null;
};

export default PatientPage;
