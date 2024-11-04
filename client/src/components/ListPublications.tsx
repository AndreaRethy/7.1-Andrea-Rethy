/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
// import Header from "./Header.tsx";

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

const ListPublications = ({ onRead }: { onRead: () => void }) => {
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

const handleClick = () => {
 onRead();
}

  return (
    <div className="p-4">
    {/* <Header /> */}
      <h2 className='text-slate-800 text-2xl font-bold text-left'>All Publications</h2>
      <div className="flex gap-4 flex-wrap overflow-hidden w-full">
        {
          Array.isArray(publications) && publications.length > 0 ? (
            publications.map((publication) => (
              <div key={publication.id} className="w-1/5 min-h-64 rounded-md overflow-hidden border">
                <figure className="w-full h-36 overflow-hidden">
                  <img src={publication.image} className="object-cover object-center" />
                </figure>
                <div className="text-slate-800 font-bold p-2">
                  {publication.title}
                  <div className="font-normal pt-2" onClick={handleClick}>
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

export default ListPublications