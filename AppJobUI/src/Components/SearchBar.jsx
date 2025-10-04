import React, {useState} from 'react'

const SearchBar = ({onSearch}) => {
    const [keyword , setKeyword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(onSearch){
            onSearch(keyword);
    };
    }
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4 mb-6">
            <input
                type="text"
                placeholder="Search by job title or keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-md"
            />
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                Search
            </button>
        </form>
  );
}

export default SearchBar