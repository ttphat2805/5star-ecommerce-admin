import './GlobalStyles.scss';
interface GlobalStylesProps {
    Children: React.ComponentType;
}

function GlobalStyles({ Children }: GlobalStylesProps) {
    return <Children />;
}

export default GlobalStyles;
