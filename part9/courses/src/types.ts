interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CourtPartBaseWithDescription extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CourtPartBaseWithDescription {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CourtPartBaseWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourtPartBaseWithDescription {
    name: "New type of course";
    numberStudents: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;