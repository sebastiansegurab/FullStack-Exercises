import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Entry } from "../types";

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{entry.date} <Icon name="stethoscope"></Icon></Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
            </Card.Content>
        </Card>
    );
};

export default OccupationalHealthcareEntry;
