import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Job } from "myTypes";

import classes from "./Job.module.css";

type Props = {
  jobs: Job[] | undefined;
};

const JobPage: React.FC<Props> = ({ jobs }) => {
  const params = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job>();

  useEffect(() => {
    if (jobs) {
      setJob(jobs.find((job) => job.id.toString() === params.jobId));
    }
  }, [jobs, params.jobId]);

  return (
    <>
      {job && (
        <div className={classes.container}>
          <div className={classes.top}>
            <div className={classes.company}>
              <div
                className={classes.logo}
                style={{ backgroundColor: job.logoBackground }}
              >
                <img src={job.logo} alt="job logo" />
              </div>
              <h2>{job.company}</h2>
              <span>
                {`${job.company.toLowerCase().replace(/\s+/g, "")}.com`}
              </span>
              <a href="https://www.linkedin.com/in/brandon-bhangari/">
                Company Site
              </a>
            </div>
            <div className={classes.info}>
              <div>
                <span className={classes.postedAt}>{job.postedAt}</span>
                <div className={classes.dot}></div>
                <span className={classes.contract}>{job.contract}</span>
              </div>
              <h3>{job.position}</h3>
              <span className={classes.location}>{job.location}</span>
              <a href="https://www.linkedin.com/in/brandon-bhangari/">
                Apply Now
              </a>
              <p className={classes.description}>{job.description}</p>
              <div className={classes.requirements}>
                <h3>Requirements</h3>
                <p>{job.requirements.content}</p>
                {job.requirements.items.map((item) => (
                  <div className={classes.item}>
                    <div>
                      <div className={classes.dot}></div>
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <div className={classes.role}>
                <h3>What You Will Do</h3>
                <p>{job.role.content}</p>
                {job.role.items.map((item) => (
                  <div className={classes.item}>
                    <div className={classes.num}>
                      {job.role.items.indexOf(item) + 1}
                    </div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={classes.bottom}>
            <a href="https://www.linkedin.com/in/brandon-bhangari/">
              Apply Now
            </a>
          </div>
        </div>
      )}
      {!job && <p className={classes.none}>Job page not found.</p>}
    </>
  );
};

export default JobPage;
