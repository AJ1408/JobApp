import React from 'react';

const JobItem = ({ job, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold text-gray-800">{job.postProfile}</h3>
                <p className="text-gray-600 mt-1">{job.reqExperience} - {job.postTechStack}</p>
            </div>
            <div className="space-x-3">
                <button
                    onClick={() => onEdit(job)}
                    className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(job.postId)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default JobItem;