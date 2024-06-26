import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../App/useToken';

export const DisplaySearchPage = () => {
    const token = getToken();
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!token) {
            console.error("[ERROR]: No token identified");
            navigate("/");
        }
    }, [token, navigate]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if(value.trim() !== ''){
            try{
                const response = await fetch(`http://localhost:8080/users/search?q=${value}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    if(response.status === 404){
                        console.error('User not found!');
                    } 
                    else{
                        alert(`[ERROR]: ${response.statusText}`);
                        console.error('Error:', response.statusText);
                    }
                    return;
                }

                const data = await response.json();
                setResults(data);
            } 
            catch(error){
                console.error("[ERROR]: Searching users", error);
            }
        } 
        else{
            setResults([]);
        }
    };

    return (
        <div className="containerSearch">
            <div className="centerSearch">
                <div className="centerTitle">
                    <form>
                        <div className='buttonsPub'>
                            <Link to="/home"><button className='btn'>Voltar</button></Link>
                        </div>
                        <input 
                            placeholder='Buscar um perfil' 
                            name='query' 
                            value={query}
                            onChange={handleChange}
                        />
                    </form>
                </div>
                <div className="results">
                    {results.map(result => (
                        <Link to={`/profile/${result.id}`} className='searchLink' key={result.id}>
                            <div className="search_icon">
                                <img src={result.profileImagePath} alt="pfp" className="search_profile_picture"/>
                                <div className="text_container">
                                    <p className="username">{result.username}</p>
                                    <p className="university">{result.profileBio}</p>
                                    <p className="university">{result.university}</p>
                                </div>
                            </div>
                        </Link> 
                    ))}
                </div>
            </div>
        </div>
    );
};
