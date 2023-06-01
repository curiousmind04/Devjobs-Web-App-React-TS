import { useEffect, useState } from "react";
import { Job } from "myTypes";

import Actions from "../components/Actions";
import classes from "./Home.module.css";

const HomePage = () => {
  const [jobs, setJobs] = useState<Job[]>();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>();
  const [load, setLoad] = useState<number>(12);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("data.json");
      if (!response.ok) {
        console.log("error");
        return;
      }
      const data = await response.json();

      setJobs(data);
      setFilteredJobs(data);
    };
    fetchData();
  }, []);

  //   console.log(jobs);

  const filterJobs = (filteredJobs: Job[]) => {
    setFilteredJobs(filteredJobs);
  };

  return (
    <div className={classes.container}>
      <Actions filterJobs={filterJobs} jobs={jobs} />
      <div className={classes.grid}>
        {filteredJobs &&
          filteredJobs.slice(0, load).map((job) => (
            <div className={classes.job} key={job.id}>
              <div
                className={classes.logo}
                style={{ backgroundColor: job.logoBackground }}
              >
                <img src={job.logo} alt="job logo" />
              </div>
              <div className={classes.top}>
                <span className={classes.postedAt}>{job.postedAt}</span>
                <div className={classes.dot}></div>
                <span className={classes.contract}>{job.contract}</span>
              </div>
              <h2>{job.position}</h2>
              <span className={classes.company}>{job.company}</span>
              <span className={classes.location}>{job.location}</span>
            </div>
          ))}
      </div>
      {!filteredJobs ||
        (filteredJobs.length === 0 && (
          <p className={classes.none}>No jobs found.</p>
        ))}
      {load === 12 && filteredJobs && filteredJobs.length > 12 && (
        <div className={classes.load}>
          <button onClick={() => setLoad(filteredJobs.length)}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
