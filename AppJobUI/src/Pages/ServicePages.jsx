import React from 'react';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-gray-700 mb-6">
              Welcome to JobApp, where we connect talented individuals with their dream careers. We offer a range of services for both students and recruiters.
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-blue-600">For Students</h2>
                <p className="mt-2 text-gray-600">
                  Find job listings, build your resume with our AI-powered tools, and apply to top companies with ease.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-green-600">For Recruiters</h2>
                <p className="mt-2 text-gray-600">
                  Post job opportunities, manage your listings, and discover top talent through our extensive database of skilled candidates.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;