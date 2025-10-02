import React ,{ useEffect} from 'react' ;
import { useSearchParams ,useNavigate } from 'react-router-dom';

function OAuth2RedirectHandler() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const role = searchParams.get('role');  

        if(token && role){
            // Store the token and role in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', role);
            if(role === 'STUDENT'){
                navigate('/student-dashboard');
            }else if(role === 'RECRUITER'){
                navigate('/recruiter-dashboard');
            }else{
                navigate('/dashboard');
            }
        } else{
            // Handle error: missing token or role
            console.error('Missing token or role in the URL parameters');
            navigate('/login?error=oauth2_failure'); // Redirect to login or an error page
        }
    }, [searchParams, navigate]);
    return <div>Processing...</div>;
};

export default OAuth2RedirectHandler
