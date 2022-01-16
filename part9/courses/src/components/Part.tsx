import { CoursePart } from "../types";
import { assertNever } from "../utils";

interface PartProps {
    coursePart: CoursePart;
}

export const Part: React.FC<PartProps> = ({ coursePart }) => {
    switch (coursePart.name) {
        case "Fundamentals":
            return <>
                <h3>{coursePart.name}</h3>
                <p>Number of exercises: {coursePart.exerciseCount}</p>
                <p>Description: {coursePart.description}</p>
            </>
        case "Using props to pass data":
            return <>
                <h3>{coursePart.name}</h3>
                <p>Number of exercises: {coursePart.exerciseCount}</p>
                <p>Number of Group Project: {coursePart.groupProjectCount}</p>
            </>
        case "Deeper type usage":
            return <>
                <h3>{coursePart.name}</h3>
                <p>Number of exercises: {coursePart.exerciseCount}</p>
                <p>Description: {coursePart.description}</p>
                <p>Exercise link: {coursePart.exerciseSubmissionLink}</p>
            </>
        case "New type of course":
            return <>
                <h3>{coursePart.name}</h3>
                <p>Number of exercises: {coursePart.exerciseCount}</p>
                <p>Description: {coursePart.description}</p>
                <p>Number of students: {coursePart.numberStudents}</p>
            </>
        default:
            return assertNever(coursePart)
    }
};