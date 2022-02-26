import React from "react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, EntrySpecificFields, SelectFieldEntryType, EntryTypeOption } from "./FormField";
import { Entry, EntryType } from "../types";
import { useStateValue } from "../state";
import { Button, Grid } from "semantic-ui-react";
import { isDate, isEntry, isHealthCheckRating, isStringWithoutSpaces } from "../utils/validation";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryType.HealthCheck, label: "HealthCheck" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.Hospital,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        dateDischarge: "",
        criteria: "",
        employerName: "",
        startDate: "",
        endDate: "",
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!isEntry(values.type)) {
          errors.type = "The type is invalid";
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!isStringWithoutSpaces(values.description)) {
          errors.description = "Description cannot be just white space";
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isStringWithoutSpaces(values.date) || !isDate(values.date)) {
          errors.date = "Invalid format date";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!isStringWithoutSpaces(values.specialist)) {
          errors.specialist = "Specialist cannot be just white space";
        }
        switch (values.type) {
          case "Hospital":
            if (!values.dateDischarge) {
              errors.dateDischarge = requiredError;
            }
            if (!isStringWithoutSpaces(values.dateDischarge) || !isDate(values.dateDischarge)) {
              errors.dateDischarge = "Invalid format date";
            }
            if (!values.criteria) {
              errors.criteria = requiredError;
            }
            if (!isStringWithoutSpaces(values.criteria)) {
              errors.criteria = "Criteria cannot be just white space";
            }
            break;
          case "OccupationalHealthcare":
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (!isStringWithoutSpaces(values.employerName)) {
              errors.employerName = "Employer cannot be just white space";
            }
            if (values.startDate) {
              if (!isStringWithoutSpaces(values.startDate) || !isDate(values.startDate)) {
                errors.startDate = "Invalid format date";
              }
            }
            if (values.endDate) {
              if (!isStringWithoutSpaces(values.endDate) || !isDate(values.endDate)) {
                errors.endDate = "Invalid format date";
              }
            }
            break;
          case "HealthCheck":
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
            if (!isHealthCheckRating(values.healthCheckRating)) {
              errors.healthCheckRating = "The HealthCheckRating is invalid";
            }
            break;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectFieldEntryType
              label="EntryType"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <EntrySpecificFields type={values.type} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
