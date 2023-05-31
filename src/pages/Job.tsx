import { useParams } from "react-router-dom";

const JobPage = () => {
  const params = useParams<{ jobId: string }>();

  return (
    <>
      <div>{params.jobId}</div>
    </>
  );
};

export default JobPage;
