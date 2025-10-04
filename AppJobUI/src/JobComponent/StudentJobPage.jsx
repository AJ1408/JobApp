import React from 'react'
import { Link } from 'react-router-dom'
import api from '../API/api'
import { useEffect, useState } from 'react';
import SearchBar from '../Components/SearchBar';
import StudentJobList from '../JobComponent/StudentJobList.jsx';


function StudentJobPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobs = async (keyword = '') => {
        setLoading(true);
        try {
            const endpoints = keyword ? `/api/jobs/search?keyword=${keyword}` : '/api/jobs';
            const response = await api.get(endpoints);
            setJobs(response.data);
            console.log("Fetched jobs:", response.data);
        }catch (err) {
            console.error("Error fetching jobs:", err);
            setError("Failed to fetch jobs");
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchJobs()
    }, []);

    const handleSearch = (keyword) =>{
        fetchJobs(keyword);
    }

    if (loading) return <div className="text-center p-10">Loading jobs...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <>
     <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 px-4 sm:px-0">Find Your Next Opportunity</h2>
                <SearchBar onSearch={handleSearch} />
                <StudentJobList jobs={jobs} />
            </main>
        </div>
      
    </>
  );
}

export default StudentJobPage
