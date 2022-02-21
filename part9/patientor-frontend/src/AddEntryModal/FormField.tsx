import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, EntryType, HealthCheckRating, } from "../types";

// structure of a single option
export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

// props for select field component
type SelectFieldPropsEntryType = {
  name: string;
  label: string;
  options: EntryTypeOption[];
};

// structure of a single option
export type HealthCheckRatingOption = {
  value: HealthCheckRating;
  label: string;
};

// props for select field component
type SelectFieldPropsHealthCheckRating = {
  name: string;
  label: string;
  options: HealthCheckRatingOption[];
};

export const SelectFieldEntryType: React.FC<SelectFieldPropsEntryType> = ({
  name,
  label,
  options
}: SelectFieldPropsEntryType) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const SelectFieldPropsHealthCheckRating: React.FC<SelectFieldPropsHealthCheckRating> = ({
  name,
  label,
  options
}: SelectFieldPropsHealthCheckRating) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "0" },
  { value: HealthCheckRating.LowRisk, label: "1" },
  { value: HealthCheckRating.HighRisk, label: "2" },
  { value: HealthCheckRating.CriticalRisk, label: "3" }
];

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

export const EntrySpecificFields: React.FC<{ type: EntryType }> = ({
  type,
}) => {
  switch (type) {
    case "Hospital":
      return (
        <>
          <Field
            label="Date Discharge"
            placeholder="YYYY-MM-DD"
            name="dateDischarge"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="criteria"
            component={TextField}
          />
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Start Date"
            placeholder="YYYY-MM-DD"
            name="startDate"
            component={TextField}
          />
          <Field
            label="End Date"
            placeholder="YYYY-MM-DD"
            name="endDate"
            component={TextField}
          />
        </>
      );
    case "HealthCheck":
      return (
        <>
          <SelectFieldPropsHealthCheckRating
            label="Health Check Rating"
            name="healthCheckRating"
            options={healthCheckRatingOptions}
          />
        </>
      );
    default:
      return null;
  }
};

