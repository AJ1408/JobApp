import React ,{useState} from 'react' ;
import api from '../API/api';

const  ResumeBuilderPage = () => {
    const [experience, setExperience] = useState('');
    const [education, setEducation] = useState('');
    const [skills, setSkills] = useState('');
    const [projects, setProjects] = useState('');
    const [generatedResume, setGeneratedResume] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError('');
        setGeneratedResume('');

        try{
            const response = await api.post('/api/ai/resumeBuilder',{
                experience,
                education,
                skills,
                projects
            });
            setGeneratedResume(response.data.resumeText); 

        }catch(err){
            console.error('Error generating resume:', err);
            setError('Failed to generate resume. Please try again.');
        }finally {
            setLoading(false);
        };
    };
    const handleCopyToClipboard = () =>{
        navigator.clipboard.writeText(generatedResume);
        alert('Resume copied to clipboard!');
    }

  return ( 
   <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
            {/* Input Form Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Resume Builder</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Enter your work experience..." className="w-full h-24 p-2 border rounded-md" />
                    <textarea value={education} onChange={(e) => setEducation(e.target.value)} placeholder="Enter your education..." className="w-full h-24 p-2 border rounded-md" />
                    <textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Enter your skills..." className="w-full h-24 p-2 border rounded-md" />
                    <textarea value={projects} onChange={(e) => setProjects(e.target.value)} placeholder="Enter your projects..." className="w-full h-24 p-2 border rounded-md" />
                    <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400">
                        {loading ? 'Generating...' : 'Generate with AI'}
                    </button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </div>

            {/* Output Section */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Resume</h2>
                <div className="w-full h-full bg-white p-4 border rounded-md relative">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{generatedResume || "Your AI-generated resume will appear here..."}</pre>
                    {generatedResume && (
                        <button onClick={handleCopyToClipboard} className="absolute top-2 right-2 px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded hover:bg-gray-300">
                            Copy
                        </button>
                    )}
                </div>
            </div>
        </div>
  )
}

export default ResumeBuilderPage
