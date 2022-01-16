import { CoursePart } from "../types";

interface ContentProps {
    courseParts: CoursePart[];
}

export const Total: React.FC<ContentProps> = (props) => {
    return (
        <p>
            Number of exercises{" "}
            {props.courseParts.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)}
        </p>
    );
};