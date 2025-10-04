import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    // You could fetch student-specific data here later (e.g., name, number of applications)
    
    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in-down">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome, Student!
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Your journey to a new career starts here. Let's find the perfect job for you.
                    </p>
                </div>

                {/* Feature Cards Section */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Find Jobs */}
                    <Link to="/jobs" className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="text-blue-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Find Jobs</h3>
                        <p className="mt-2 text-gray-500">Search and filter through hundreds of job listings to find your match.</p>
                    </Link>

                    {/* Card 2: My Applications (Placeholder) */}
                    <Link to="/applications" className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                         <div className="text-green-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">My Applications</h3>
                        <p className="mt-2 text-gray-500">Track the status of all your job applications.</p>
                    </Link>

                    {/* Card 3: AI Resume Builder (Placeholder) */}
                    <Link to="/resumeBuilder" className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="text-purple-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">AI Resume Builder</h3>
                        <p className="mt-2 text-gray-500">Let our AI help you craft the perfect resume.</p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;