import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Entry } from "../types";

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{entry.date} <Icon name="user"></Icon></Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
                <Card.Description>
                    <Icon name="heart" color="yellow"></Icon>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default HealthCheckEntry;
