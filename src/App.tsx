import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { Job } from "myTypes";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import JobPage from "./pages/Job";

function App() {
  const [jobs, setJobs] = useState<Job[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("data.json");
      if (!response.ok) {
        console.log("error");
        return;
      }
      const data = await response.json();

      setJobs(data);
    };
    fetchData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage jobs={jobs} />,
        },
        {
          path: ":jobId",
          element: <JobPage jobs={jobs} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
