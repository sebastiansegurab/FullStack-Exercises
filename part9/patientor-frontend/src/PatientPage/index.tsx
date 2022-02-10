import React from "react";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";

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
                {
                    patient.entries.length > 0
                        ?
                        <div>
                            <h4>entries</h4>
                            {
                                patient.entries.map(e => {
                                    return <EntryDetails key={e.id} entry={e} />;
                                })
                            }
                        </div>
                        : null
                }
            </div >
        );
    }

    return null;
};

export default PatientPage;
