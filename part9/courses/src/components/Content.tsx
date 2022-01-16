import { CoursePart } from "../models/CoursePart";

interface ContentProps {
    courseParts: CoursePart[];
}

export const Content: React.FC<ContentProps> = (props) => {
    return <>
        <p>
            {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
        </p>
        <p>
            {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
        </p>
        <p>
            {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
        </p>
    </>;
};