import { useState, useRef, FormEvent } from "react";
import { createPortal } from "react-dom";
import { Job } from "myTypes";

import classes from "./Actions.module.css";

type Props = {
  filterJobs: (filteredJobs: Job[]) => void;
  jobs: Job[] | undefined;
};

const Actions: React.FC<Props> = ({ filterJobs, jobs }) => {
  const [modal, setModal] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const modalHandler = () => {
    setModal((prevState) => !prevState);
  };

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();

    let titleInput = "";
    let locationInput = "";
    let checked = false;
    let filteredJobs: Job[] = [];

    if (titleRef.current?.value) {
      titleInput = titleRef.current.value.toLowerCase().replace(/\s+/g, "");
    }

    if (locationRef.current?.value) {
      locationInput = locationRef.current?.value
        .toLowerCase()
        .replace(/\s+/g, "");
    }

    if (checkboxRef.current?.checked) {
      checked = checkboxRef.current?.checked;
    }

    if (jobs && titleInput.length === 0) {
      if (!checked && locationInput.length === 0) {
        filterJobs(jobs);
      }

      if (!checked && locationInput.length > 0) {
        filteredJobs = jobs.filter((job) =>
          job.location.toLowerCase().replace(/\s+/g, "").includes(locationInput)
        );
        filterJobs(filteredJobs);
      }

      if (checked && locationInput.length === 0) {
        filteredJobs = jobs.filter((job) => job.contract === "Full Time");
        filterJobs(filteredJobs);
      }

      if (checked && locationInput.length > 0) {
        filteredJobs = jobs.filter(
          (job) =>
            job.contract === "Full Time" &&
            job.location
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(locationInput)
        );
        filterJobs(filteredJobs);
      }
    }

    if (jobs && titleInput.length > 0) {
      if (!checked && locationInput.length === 0) {
        filterJobs(
          jobs.filter(
            (job) =>
              job.position
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(titleInput) ||
              job.company.toLowerCase().replace(/\s+/g, "").includes(titleInput)
          )
        );
      }

      if (!checked && locationInput.length > 0) {
        filteredJobs = jobs.filter(
          (job) =>
            (job.location
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(locationInput) &&
              job.position
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(titleInput)) ||
            (job.location
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(locationInput) &&
              job.company
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(titleInput))
        );
        filterJobs(filteredJobs);
      }

      if (checked && locationInput.length === 0) {
        filteredJobs = jobs.filter(
          (job) =>
            (job.contract === "Full Time" &&
              job.position
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(titleInput)) ||
            (job.contract === "Full Time" &&
              job.company
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(titleInput))
        );
        filterJobs(filteredJobs);
      }

      if (checked && locationInput.length > 0) {
        filteredJobs = jobs.filter(
          (job) =>
            (job.contract === "Full Time" &&
              job.location
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(locationInput) &&
              job.position
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(titleInput)) ||
            (job.contract === "Full Time" &&
              job.location
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(locationInput) &&
              job.company
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(titleInput))
        );
        filterJobs(filteredJobs);
      }
    }
  };

  return (
    <>
      <div className={classes.container}>
        <form className={classes.form} onSubmit={searchHandler}>
          <div>
            <img
              src="assets/desktop/icon-search.svg"
              alt="search icon"
              className={classes.searchIcon}
            />
            <label htmlFor="search" className="sr-only">
              Search by title
            </label>
            <input
              type="text"
              id="search"
              className={classes.filterInput}
              placeholder="Filter by title..."
              ref={titleRef}
            />
          </div>
          <button
            type="button"
            className={classes.filter}
            onClick={modalHandler}
          >
            <span className="sr-only">Filter</span>
            <img src="/assets/mobile/icon-filter.svg" alt="filter icon" />
          </button>
          <button type="submit" className={classes.searchBtn}>
            <span className="sr-only">Search</span>
            <img src="assets/desktop/icon-search.svg" alt="search icon" />
          </button>

          {document.querySelector(".app")
            ? createPortal(
                <div
                  className={classes.backdrop}
                  onClick={modalHandler}
                  hidden={!modal}
                ></div>,
                document.querySelector(".app") as HTMLDivElement
              )
            : null}
          <div className={classes.modal} hidden={!modal}>
            <label htmlFor="location" className="sr-only">
              Filter by location
            </label>
            <div className={classes.location}>
              <img
                src="/assets/desktop/icon-location.svg"
                alt="location icon"
              />
              <input
                type="text"
                id="location"
                placeholder="Filter by location..."
                ref={locationRef}
              />
            </div>
            <div className={classes.middle}>
              <label className={classes.checkmark}>
                <input type="checkbox" id="check" ref={checkboxRef} />
                <span className={classes.check}></span>
                <img
                  src="/assets/desktop/icon-check.svg"
                  alt="checkmark icon"
                />
              </label>
              <label htmlFor="check" className={classes.labelOne}>
                Full Time Only
              </label>
              <label htmlFor="check" className={classes.labelTwo}>
                Full Time
              </label>
            </div>
            <button
              type="submit"
              className={classes.modalBtn}
              onClick={modalHandler}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Actions;
