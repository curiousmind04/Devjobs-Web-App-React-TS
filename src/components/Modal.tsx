import { FormEvent, useRef } from "react";
import classes from "./Modal.module.css";

type Props = {
  modalHandler: () => void;
  searchHandler: (e: FormEvent, checked: boolean, location: string) => void;
  hidden: boolean;
};

const Modal: React.FC<Props> = ({ modalHandler, searchHandler, hidden }) => {
  const locationRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const configureSearch = (e: FormEvent) => {
    let locationInput = "";
    let checked = false;

    if (locationRef.current?.value) {
      locationInput = locationRef.current?.value
        .toLowerCase()
        .replace(/\s+/g, "");
    }

    if (checkboxRef.current?.checked) {
      checked = checkboxRef.current?.checked;
    }

    if (locationInput.length > 0 && checked) {
      searchHandler(e, true, locationInput);
    } else if (locationInput.length > 0 && !checked) {
      searchHandler(e, false, locationInput);
    } else if (locationInput.length === 0 && checked) {
      searchHandler(e, true, locationInput);
    } else {
      searchHandler(e, false, locationInput);
    }

    modalHandler();
  };

  console.log(location);

  return (
    <>
      <div
        className={classes.overlay}
        onClick={modalHandler}
        hidden={hidden}
      ></div>
      <div className={classes.container} hidden={hidden}>
        <form onSubmit={configureSearch}>
          <label htmlFor="location" className="sr-only">
            Filter by location
          </label>
          <div className={classes.location}>
            <img src="/assets/desktop/icon-location.svg" alt="location icon" />
            <input
              type="text"
              id="location"
              placeholder="Filter by location..."
              ref={locationRef}
            />
          </div>
          <label className={classes.checkmark}>
            <input type="checkbox" id="one" ref={checkboxRef} />
            <span className={classes.check}></span>
            <img src="/assets/desktop/icon-check.svg" alt="checkmark icon" />
          </label>

          <button>Search</button>
        </form>
      </div>
    </>
  );
};

export default Modal;
