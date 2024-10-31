/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const URL = "/api/v1/publications";

type Publication = {
  id: number,
  title: string,
  image: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
  likeCount: number,
  isDeleted: boolean,
  authorname: string
}

const ListPublications = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (token !== null) {
      getPublications();
    }
  }, [token]);

function getPublications() {
  fetch(`${URL}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  .then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        if (response.status === 403) {
          if (errorData.error === "Invalid token") {
            navigate("/");
          }
        }
        throw new Error(errorData.error || 'An error occurred');
      });
    }
    return response.json();
  })
  .then((data) => setPublications(data))
  .catch((error) => console.error('Error fetching publications:', error));
}

  return (
    <>
    <Header />
      <div className='text-slate-800 text-2xl font-bold'>All Publications</div>
      // TODO: Create grid, handle images
      <ul className="flex flex-col items-start">
        {
          Array.isArray(publications) && publications.length > 0 ? (
            publications.map((publication, index) => (
              <li key={index} className="text-slate-800">
                {publication.title}
                {" - "}
                {publication.authorname}
              </li>
            ))
          )
           : (
            <li className="text-slate-800">{"Publications not found"}</li>
          )
        }
      </ul>
    </>
  )
}

export default ListPublications