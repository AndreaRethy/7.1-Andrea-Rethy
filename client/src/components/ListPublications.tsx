/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaHeart, FaRegHeart } from "react-icons/fa6";
// import Header from "./Header.tsx";

const URL = "/api/v1/publications";

type Publication = {
  id: number,
  title: string,
  image: string,
  likeCount: number,
  isDeleted: boolean,
  authorname: string
}

const tempArray: number[] = [];

const ListPublications = ({ onRead }: { onRead: (id:number) => void }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [likedPublications, setLikedPublications] = useState<number[]>([]);


  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedId = sessionStorage.getItem('userId');

    if (storedToken && storedId) {
      setToken(storedToken);
      setUserId(parseInt(storedId));
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (token !== null) {
      getPublications();
      getLikedPublications();
    }
  }, [token]);

function getLikedPublications() {
  fetch(`/api/v1/publications/likedbyuser/${userId}`, {
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
  .then((data) => 
    data.map((publication: Publication) => {
      tempArray.push(publication.id)
      
    },
    setLikedPublications(tempArray)
  ))
  .catch((error) => console.error('Error fetching publications:', error));
}

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
    if (response.status === 403 || response.status === 401) {
      navigate("/");
    }
    return response.json();
  })
  .then((data) => setPublications(data))
  .catch((error) => console.error('Error fetching publications:', error));
}

function likePublication(id: number) {
  fetch(`${URL}/${id}/like`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(
      { 
          "userId": userId,
      }
    ),
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
    {/* <Header /> */}
      <h2 className='text-slate-800 text-2xl font-bold text-left mb-2'>All Publications</h2>
      <div className="flex flex-wrap justify-start overflow-hidden w-full gap-4">
        {
          Array.isArray(publications) && publications.length > 0 ? (
            publications.map((publication) => {
              const isLiked = likedPublications.includes(publication.id);
              const isDeleted = publication.isDeleted;
      
              return (
                isDeleted ? <></> :
                <div
                  key={publication.id}
                  className="w-[23%] max-w-[24.5%] min-h-96 rounded-md overflow-hidden border flex-grow"
                >
                  <figure className="w-full h-[14.5rem] overflow-hidden relative">
                    <img
                      src={publication.image}
                      alt={publication.title}
                      className="object-cover object-center w-full h-full"
                    />
                    {isLiked ? (
                      <FaHeart className="z-10 absolute top-2 right-4 text-xl text-pink-500" />
                    ) : (
                      <FaRegHeart className="z-10 absolute top-2 right-4 text-xl text-white cursor-pointer" onClick={() => likePublication(publication.id)}/>
                    )}
                  </figure>
                  <div className="text-slate-800 font-bold p-2">
                    {publication.title}
                    <div
                      className="font-normal pt-2"
                      onClick={() => onRead(publication.id)}
                    >
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

export default ListPublications