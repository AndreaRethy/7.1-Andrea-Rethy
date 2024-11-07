/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";

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

  interface User {
    createdAt: string;
    id: number;
    role: "USER" | "ADMIN";
  }
  
  interface DecodedToken {
    exp: number;
    iat: number;
    user: User;
  }

  interface ReadPublicationProps {
    publicationId: number;
    onDeletion: () => void;
  }
  
  const ReadPublication: React.FC<ReadPublicationProps> = ({ publicationId, onDeletion }) => {
    const navigate = useNavigate();
    const [publication, setPublication] = useState<Publication>();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
      const storedToken = sessionStorage.getItem("token") ?? "";
      setToken(storedToken);
  
      if (storedToken) {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(storedToken);
        console.log(decoded)
        if (decoded.user.role === "ADMIN") {
          setIsAdmin(true);
        }
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
          .then((response) => {
            if (response.status === 403 || response.status === 401) {
              navigate("/");
            }
            return response.json();
          })
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
    
    function handleDeletion() {
      // check from token if user is admin
      const isAdmin = true;
      if (isAdmin) {
        fetch(`${URL}${publicationId}/delete`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        .then((response) => {
          if (response.status === 403 || response.status === 401) {
            navigate("/");
          }
          return response.json();
        })
        .then(() => {
          onDeletion();
        })
        .catch(err => {
          setError(err);
        });
      }
    }
  
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
        
        { isAdmin ? (<div className='max-w-max flex gap-1 items-baseline justify-center text-red-700 ml-auto cursor-pointer' onClick={handleDeletion}>
          <BsTrash3 />
          Eliminate
        </div>) : <></>}
        
        <figure className="my-4 w-full max-h-[60vh] overflow-hidden flex justify-center">
          <img src={publication.image} alt={publication.title} className="w-full h-auto object-center object-cover" />
        </figure>
        <p className="break-words">{publication.content}</p>
      </div>
    );
  };
  

export default ReadPublication;