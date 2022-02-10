import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Entry } from "../types";

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{entry.date} <Icon name="hospital"></Icon></Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
                <Card.Description>
                    <Icon name="heart" color="green"></Icon>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default HospitalEntry;
