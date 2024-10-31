/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

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

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [popularPublications, setPopularPublications] = useState<Publication[]>([]);

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
      getPopularPublications();
    }
  }, [token]);


function getPopularPublications() {
  fetch(`${URL}/top`, {
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
  .then((data) => setPopularPublications(data))
  .catch((error) => console.error('Error fetching publications:', error));
}

  return (
    <header className="w-full, bg-slate-500 text-white relative">
      <h2 className='text-slate-800 text-2xl font-bold'>Top Publications</h2>
      {/* carousel */}
      <div className="carousel h-full w-full overflow-hidden">
        {/* list */}
        <div className="list">
            {/* Sliders */}
            {
            Array.isArray(popularPublications) && popularPublications.length > 0 ? (
                popularPublications.map((publication, index) => (
                    // item
                    <div className="item absolute inset-0 first:z-10">
                        {/* slider-img */}
                        <img src={publication.image} alt="Carousel background image" className="slider-img w-full cover" />
                        {/* hero-content */}
                        <div className="hero-content w-[32rem] h-[26rem] flex ml-8 absolute top-1/4">
                            {/* timeline */}
                            <figure className="timeline h-fit w-6 align-middle justify-center">
                                <img src={`../assets/icons/timeline${index+1}-white-blue.svg`} alt="timeline" className="w-full cover" />
                            </figure>
                            {/* hero-location */}
                            <div className="hero-location w-4/5 bg-herobg opacity-50 overflow-hidden rounded-md m-6 p-6 flex flex-col gap-5 ">
                                {/* h2 */}
                                <h3 className="text-7xl uppercase font-bold">{publication.title}</h3>
                                <p>by {publication.authorname}</p>
                                {/* carousel-button */}
                                <div className="carousel-button">
                                    {/* button-green */}
                                    <a href="#" className="button-green">Read more <FaArrowRightLong /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )
            : (
                <p className="text-slate-800">{"Publications not found"}</p>
            )
            }
        </div>

            {/* Thumbnails */}
            {/* thumbnail */}
            <div className="thumbnail absolute bottom-7 left-1/2 w-max z-10 flex gap-4">
                {
                Array.isArray(popularPublications) && popularPublications.length > 0 ? (
                    popularPublications.map((publication) => (
                        // item
                        <div className="item w-32 h-48 shrink-0 relative rounded-md shadow-item">
                            <img src={publication.image} alt="Thumbnail image" className="w-full h-full cover rounded-sm"/>
                            {/* content -> removed */}
                        </div>
                    ))
                )
                : (
                    <li className="text-slate-800">{"Publications not found"}</li>
                )
            }
            </div>
      </div>
    </header>
  )
}

export default Header