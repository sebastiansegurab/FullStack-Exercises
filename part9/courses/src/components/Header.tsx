interface HeaderProps {
    title: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
    return <h1>Hello, {props.title}</h1>;
};