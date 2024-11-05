/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const URL = "/api/v1/publications/"

type Publication = {
    id: number,
    title: string,
    image: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    likeCount: number,
    isDeleted: boolean,
    authorname: string
  }

const ReadPublication = ({ publicationId }: { publicationId: number }) => {
    const navigate = useNavigate();
    const [publication, setPublication] = useState<Publication>();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          navigate('/');
        }
      }, []);
  
    useEffect(() => {
      if (publicationId && token !== null) {
        fetch(`${URL}${publicationId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          })
          .then(response => response.json())
          .then(data => {
            setPublication(data);
            setLoading(false);
          })
          .catch(err => {
            setError(err);
            setLoading(false);
          });
      }
    }, [publicationId, token]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading publication.</div>;
    if (!publication) return <div>No publication found.</div>;

    const createdAtDate = new Date(publication.createdAt);
    const updatedAtDate = new Date(publication.updatedAt);
  
    return (
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold">{publication.title}</h2>
        <p>
          By {publication.authorname}, published:{' '}
          {isNaN(createdAtDate.getTime())
            ? 'Invalid Date'
            : createdAtDate.toLocaleDateString()}
        </p>
        <p>
          Last updated:{' '}
          {isNaN(updatedAtDate.getTime())
            ? 'Invalid Date'
            : updatedAtDate.toLocaleDateString()}
        </p>
        <figure className="my-4 w-full max-h-[60vh] overflow-hidden flex justify-center">
          <img src={publication.image} alt={publication.title} className="w-full h-auto object-center object-cover" />
        </figure>
        <p className="break-words">{publication.content}</p>
      </div>
    );
  };
  

export default ReadPublication;