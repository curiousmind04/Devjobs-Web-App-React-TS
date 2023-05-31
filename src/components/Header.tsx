import classes from "./Header.module.css";

type Props = {
  themeHandler: () => void;
};

const Header: React.FC<Props> = ({ themeHandler }) => {
  return (
    <header className={classes.header}>
      <h1>
        <span className="sr-only">Devjobs</span>
        <img src="/assets/desktop/logo.svg" alt="logo" />
      </h1>
      <div className={classes.theme}>
        <img src="/assets/desktop/icon-sun.svg" alt="sun icon" />
        <label className={classes.switch}>
          <input type="checkbox" onClick={themeHandler} />
          <span className={classes.toggle}></span>
        </label>
        <img src="/assets/desktop/icon-moon.svg" alt="moon icon" />
      </div>
    </header>
  );
};

export default Header;
