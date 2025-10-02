import React, { useState, useEffect } from 'react';

const JobForm = ({ jobToEdit, onSubmit, onCancel }) => {
    // Simple state - just one object instead of complex formData
    const [job, setJob] = useState({
        postId: null,
        postProfile: '',
        postDesc: '',
        reqExperience: '',
        postTechStack: ''
    });

    // When editing, fill the form (much simpler logic)
    useEffect(() => {
        if (jobToEdit) {
            setJob({
                postId: jobToEdit.postId || null,
                postProfile: jobToEdit.postProfile || '',
                postDesc: jobToEdit.postDesc || '',
                reqExperience: jobToEdit.reqExperience || '',
                // Simple: convert array to string for display
                postTechStack: Array.isArray(jobToEdit.postTechStack) 
                    ? jobToEdit.postTechStack.join(', ') 
                    : jobToEdit.postTechStack || ''
            });
        }
    }, [jobToEdit]);

    // One simple function for all inputs
    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    // Simple submit logic
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convert string back to array (simple one-liner)
        const techStack = job.postTechStack.split(',').map(t => t.trim()).filter(t => t);

        // Send clean data
        onSubmit({
            ...job,
            reqExperience: Number(job.reqExperience),
            postTechStack: techStack
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">
                    {jobToEdit ? 'Edit Job' : 'Create Job'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="postProfile"
                        placeholder="Job Title"
                        value={job.postProfile}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                    
                    <textarea
                        name="postDesc"
                        placeholder="Job Description"
                        value={job.postDesc}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                    
                    <input
                        type="number"
                        name="reqExperience"
                        placeholder="Experience Required"
                        value={job.reqExperience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                    
                    <input
                        name="postTechStack"
                        placeholder="Tech Stack (comma separated)"
                        value={job.postTechStack}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                    
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Save Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobForm;