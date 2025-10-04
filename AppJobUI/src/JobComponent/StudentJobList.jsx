import React from 'react'

// A single job item component
const StudentJobItem = ({ job }) => {
    const handleApply = () => {
        alert(`Applied to ${job.postProfile} for ${job.postDesc}`);
    };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 justify-between items-center">
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{job.postProfile}</h3>
            <p className="text-gray-600 mt-2">{job.postDesc}</p>
            <p className="text-gray-500 mt-1">Experience Required: {job.reqExperience} years</p>
        </div>
        <div className="flex-shrink-0 ml-4">
            <button 
                onClick={()=> handleApply(job.postId)}
                className = "px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
            >
                Apply Now
            </button>
        </div>
      
    </div>
  );
};

// Job list component to render a list of jobs
const StudentJobList = ({jobs}) =>{
    if( !jobs || jobs.length === 0){
        return (
            <div className= "bg-white p-8 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-gray-800">No jobs found</h2>
                <p className="text-gray-600 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        );
    }
    return (
        <div className="space-y-4">
            {jobs.map((job)=> (
                <StudentJobItem key={job.postId} job={job} />
            ))}

        </div>
    )
    }


export default StudentJobList
