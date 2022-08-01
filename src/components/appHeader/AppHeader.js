import './appHeader.scss';

const AppHeader = ({onClick}) => {

    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href=";">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a onClick={onClick} name="Characters" href=";">Characters</a></li>
                    /
                    <li>
                        <a onClick={onClick} name="Comics" href=";">Comics</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;