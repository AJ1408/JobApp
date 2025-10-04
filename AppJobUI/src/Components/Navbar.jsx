import React from 'react'
import  {Link ,useNavigate} from 'react-router-dom'


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const userRole = localStorage.getItem("userRole");
  console.log(userRole) ;
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const getDashboardPath = () => {
    if (userRole === "STUDENT")
    { return "/student-dashboard"  ;} 
    else if (userRole === "RECRUITER")
      { return "/recruiter-dashboard" ;}
    return "/" ; //Fallback to home if role is unknown 
  } ;

  return (
     <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to={token ? getDashboardPath() : "/"} className="text-2xl font-bold text-gray-800">
                            JobApp
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        {token ? (
                            // --- LOGGED-IN VIEW ---
                            <>
                                <Link to={getDashboardPath()} className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </Link>
                                
                                {/* Role-Specific Links */}
                                {userRole === 'RECRUITER' && (
                                    <Link to="/recruiter-dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                        Manage Jobs
                                    </Link>
                                )}
                                {userRole === 'STUDENT' && (
                                    <Link to="/jobs" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                        Find Jobs
                                    </Link>
                                )}

                                
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            // --- LOGGED-OUT VIEW ---
                            <>
                                <Link to="/services" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Services
                                </Link>
                                <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
  );
}

export default Navbar ;
