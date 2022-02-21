import React from "react";
import { Patient } from "../types";
import { updatePatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const { id } = useParams<{ id: string }>();

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: patient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(updatePatient(patient));
            closeModal();
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };

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
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <div></div>
                <Button style={{marginTop: 20}} onClick={() => openModal()}>Add New Entry</Button>
            </div>
        );
    }

    return null;
};

export default PatientPage;
