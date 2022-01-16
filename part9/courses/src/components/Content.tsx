import { CoursePart } from "../types";
import { Part } from "./Part";

interface ContentProps {
    courseParts: CoursePart[];
}

export const Content: React.FC<ContentProps> = (props) => {
    return <>
        {
            props.courseParts.map((course: CoursePart) => {
                return <Part coursePart={course} />
            })
        }
    </>
};