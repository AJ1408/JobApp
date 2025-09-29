import React from 'react';
import JobItem from './JobItem';

const JobList = ({ jobs, onEdit, onDelete }) => {
    if (jobs.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-700">No Jobs Found</h3>
                <p className="text-gray-500 mt-2">Click "Post New Job" to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <JobItem key={job.postId} job={job} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default JobList;