/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "/api/v1/publications";

interface EditPublicationProps {
  publicationId: number;
  onEditSuccess: () => void
}

const EditPost: React.FC<EditPublicationProps> = ({ publicationId, onEditSuccess }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/');
    }

    function getPublicationData() {
      if (publicationId && token !== null) {
        fetch(`${URL}/${publicationId}`, {
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
            setTitle(data.title);
            setContent(data.content);
            setImage(data.image);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error loading publication:', error);
            setError(error.message);
            setIsLoading(false);
        });
      }
    }

    getPublicationData();
  }, [publicationId, token, navigate]);

  const post = (event: React.FormEvent) => {
    event.preventDefault();
    updatePublication(title, content, image);
    setTitle("");
    setContent("")
    setImage("");
    setTimeout(() => {
      onEditSuccess();
    }, 600);
  }

  

  function updatePublication(title: string, content: string, image: string) {
      fetch(`${URL}/${publicationId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(
          { 
              "image": image,
              "title": title,
              "content": content
          }
        ),
      })
      .then((response) => {
        if (response.status === 403 || response.status === 401) {
          navigate("/");
        }
        return response.json();
      })
      .catch((error) => console.error('Error updating publication:', error));
  }

  return (
    <form onSubmit={post} className="p-4 flex flex-col h-screen">
      <legend>
        <h2 className="font-bold text-2xl">Edit Publication</h2>
      </legend>
      
      {isLoading ? (
        <p>Loading publication data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="flex flex-col space-y-6 my-4 flex-1 w-full">
            {/* Image URL Input */}
            <input
              className="w-full rounded-md p-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50"
              type="url"
              placeholder="Image URL"
              value={image}
              id="image"
              onChange={(e) => setImage(e.target.value)}
            />
            
            {/* Title Input */}
            <input
              className="w-full rounded-md p-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50"
              type="text"
              placeholder="Title"
              value={title}
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            
            {/* Content Textarea */}
            <textarea
              className="w-full rounded-md p-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 flex-1 resize-none"
              placeholder="Your post body..."
              value={content}
              id="content"
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          
          {/* Update Button */}
          <button
            type="submit"
            className="py-3 px-6 mt-4 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold hover:opacity-80 transition duration-200"
          >
            Update
          </button>
        </>
      )}
    </form>
  );  
}


export default EditPost;