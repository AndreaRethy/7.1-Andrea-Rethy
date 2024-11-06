/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiSaveUp2 } from "react-icons/ci";
import { BsTrash3Fill } from "react-icons/bs";

const URL = "/api/v1/publications";

type Publication = {
  id: number,
  title: string,
  image: string,
  likeCount: number,
  isDeleted: boolean,
  authorname: string
}

const ListMyPublications = ({ onRead }: { onRead: (id:number) => void }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUsername = sessionStorage.getItem('username');

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername)
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
  setLoading(true);
  fetch(`${URL}/user/${username}`, {
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
  .then((data) => {
    setPublications(data)
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error fetching publications:', error)
    setLoading(false);
  }); 
}

function restorePublication(id:number) {
    fetch(`${URL}/${id}/restore`, {
      method: 'PATCH',
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
    .then(() => getPublications())
    .catch((error) => console.error('Error restoring publication:', error)); 
}

function handleDeletion(id: number) {
  // check from token if user is admin
  const isAdmin = true;
  if (isAdmin) {
    fetch(`${URL}/${id}/delete`, {
      method: 'PATCH',
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
    .then(() => getPublications())
    .catch((error) => console.error('Error deleting publication:', error));
  }
}

  return (
    <div className="p-4">
      <h2 className='text-slate-800 text-2xl font-bold text-left'>My Publications</h2>
      <div className="flex flex-wrap justify-start overflow-hidden w-full gap-4">
        {
          loading ? <p>Loading...</p> : 
          Array.isArray(publications) && publications.length > 0 ? (
            publications.map((publication) => {
              let isDeleted = publication.isDeleted;
              
              return (
                isDeleted ? 
                <div key={publication.id} className="w-[23%] max-w-[24.5%] min-h-96 rounded-md overflow-hidden border flex-grow">
                  <div className="opacity-30">
                    <figure className="w-full h-[14.5rem] overflow-hidden relative">
                      <img src={publication.image} className="object-cover object-center w-full h-full" />
                    </figure>
                    <div className="text-slate-800 font-bold p-2">
                      {publication.title}
                      <p className="font-normal pt-2">DELETED</p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center align-middle gap-1 w-full">
                    <CiSaveUp2 className="ml-2" />
                    <button onClick={() => { 
                      restorePublication(publication.id)
                      isDeleted = false
                      }}>Recover Post</button>
                  </div>
                </div>
                :
                <div key={publication.id} className="w-[23%] max-w-[24.5%] min-h-96 rounded-md overflow-hidden border flex-grow">
                  <figure className="w-full h-[14.5rem] overflow-hidden relative">
                    <img src={publication.image} className="object-cover object-center w-full h-full" />
                    <BsTrash3Fill className="z-10 absolute top-2 left-4 text-xl text-red-600" onClick={() => handleDeletion(publication.id)} />
                  </figure>
                  <div className="text-slate-800 font-bold p-2">
                    {publication.title}
                    <div className="font-normal pt-2" onClick={() => onRead(publication.id)}>
                        <a href="#" className="flex items-center">
                          Read more <FaArrowRightLong className="ml-2" />
                        </a>
                      </div>
                  </div>
                </div>
              );
            })
          )
           : (
            <li className="text-slate-800">{"Publications not found"}</li>
          )
        }
      </div>
    </div>
  )
}

export default ListMyPublications