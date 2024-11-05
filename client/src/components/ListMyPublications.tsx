/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const URL = "/api/v1/publications/user/";

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
  fetch(`${URL}${username}`, {
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
  .then((data) => setPublications(data))
  .catch((error) => console.error('Error fetching publications:', error)); 
}

  return (
    <div className="p-4">
      <h2 className='text-slate-800 text-2xl font-bold text-left'>My Publications</h2>
      <div className="flex flex-wrap justify-evenly overflow-hidden w-full">
        {
          Array.isArray(publications) && publications.length > 0 ? (
            publications.map((publication) => (
              <div key={publication.id} className="w-[23%] min-h-96 rounded-md overflow-hidden border">
                <figure className="w-full h-64 overflow-hidden">
                  <img src={publication.image} className="object-cover object-center" />
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
            ))
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