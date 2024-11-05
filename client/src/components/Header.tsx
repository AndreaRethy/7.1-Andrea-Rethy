/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slideIntervalRef = useRef<number | null>(null);
  const animationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/");
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
      if (response.status === 403 || response.status === 401) {
        navigate("/");
      }
      return response.json();
    })
    .then((data) => setPopularPublications(data))
    .catch((error) => console.error('Error fetching publications:', error));
  }

  useEffect(() => {
    if (popularPublications.length > 1) {
      // Start the slide show
      slideIntervalRef.current = window.setInterval(() => {
        setIsAnimating(true);

        // After 4 seconds, end the animation and advance the slide
        animationTimeoutRef.current = window.setTimeout(() => {
          setIsAnimating(false);
          setCurrentSlide((prevSlide) => (prevSlide + 1) % popularPublications.length);
        }, 4000);
      }, 9000);
    }

    // Cleanup on unmount
    return () => {
      if (slideIntervalRef.current) window.clearInterval(slideIntervalRef.current);
      if (animationTimeoutRef.current) window.clearTimeout(animationTimeoutRef.current);
    };
  }, [popularPublications.length]);

  return (
    <header className="w-full h-screen bg-slate-500 text-white relative">
      <h2 className="text-slate-800 text-2xl font-bold">Top Publications</h2>
      {/* Carousel */}
      <div className={`carousel h-full w-full overflow-hidden ${isAnimating ? "next" : ""}`}>
        {/* List */}
        <div className="list relative">
          {/* Sliders */}
          {Array.isArray(popularPublications) && popularPublications.length > 0 ? (
            popularPublications.map((publication, index) => (
              <div
                key={publication.id}
                className={`item absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0"
                }`}
              >
                {/* Slider Image */}
                <img
                  src={publication.image}
                  alt="Carousel background image"
                  className="slider-img w-full h-full object-cover"
                />
                {/* Hero Content */}
                <div className="hero-content w-[32rem] h-[26rem] flex ml-8 absolute top-1/4">
                  {/* Timeline */}
                  <figure className="timeline h-fit w-6 align-middle justify-center">
                    <img
                      src={`../assets/icons/timeline${index + 1}-white-blue.svg`}
                      alt="timeline"
                      className="w-full object-cover"
                    />
                  </figure>
                  {/* Hero Location */}
                  <div className="hero-location w-4/5 bg-herobg overflow-hidden rounded-lg m-6 p-6 flex flex-col gap-5 ">
                    {/* Title */}
                    <h3 className="text-4xl uppercase font-bold">{publication.title}</h3>
                    <p>by {publication.authorname}</p>
                    {/* Carousel Button */}
                    <div className="carousel-button">
                      <a href="#" className="flex items-center">
                        Read more <FaArrowRightLong className="ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-800">{"Publications not found"}</p>
          )}
        </div>

        {/* Thumbnails */}
        <div className="thumbnail absolute bottom-7 left-1/2 transform -translate-x-1/2 w-max z-10 flex gap-4">
          {Array.isArray(popularPublications) && popularPublications.length > 0 ? (
            popularPublications.map((publication) => (
              <div
                key={publication.id}
                className={'item w-32 h-48 shrink-0 relative rounded-md shadow-item'}
              >
                <img
                  src={publication.image}
                  alt="Thumbnail image"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
