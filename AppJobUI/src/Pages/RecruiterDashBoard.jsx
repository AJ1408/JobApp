import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../API/api';
import JobList from "../JobComponent/JobList";
import JobForm from "../JobComponent/JobForm";

function RecruiterDashBoard() {
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [editingJob, setEditingJob] = useState(null); 
  const [isFormVisible, setIsFormVisible] = useState(false); 

  const navigate = useNavigate();

  // ✅ Fetch jobs of logged-in recruiter
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/jobs/my-jobs");  // 👈 recruiter-specific API
      setJobs(response.data);
      console.log("Fetched jobs:", response.data);

    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddNewJob = () => {
    setEditingJob(null);
    setIsFormVisible(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsFormVisible(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await api.delete(`/api/jobs/${jobId}`);
        fetchJobs();
      } catch (err) {
        console.error("Error deleting job:", err);
        setError("Failed to delete job");
      }
    }
  };

  const handleFormSubmit = async (jobData) => {
    try {
      console.log("Submitting job data:", jobData);
      let response;
      if (editingJob) {
        response = await api.put(`/api/jobs/${editingJob.postId}`, jobData);
      } else {
        response = await api.post("/api/jobs", jobData);
      }
      console.log("Server response:", response.data);
      setIsFormVisible(false);
      fetchJobs();
    } catch (err) {
      console.error("Error saving job:", err.response?.data || err.message);
      setError("Failed to save job");
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 px-4 sm:px-0">
          <h2 className="text-3xl font-bold text-gray-900">My Job Postings</h2>
          <button
            onClick={handleAddNewJob}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            + Post New Job
          </button>
        </div>

        <JobList jobs={jobs} onEdit={handleEditJob} onDelete={handleDeleteJob} />

        {isFormVisible && (
          <JobForm
            jobToEdit={editingJob}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormVisible(false)}
          />
        )}
      </main>
    </div>
  );
}

export default RecruiterDashBoard;
