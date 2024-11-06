/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "/api/v1/publications";

const NewPost = ({ onPostSuccess }: { onPostSuccess: () => void }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUsername = sessionStorage.getItem('username');

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
    } else {
      navigate('/');
    }
  }, []);

  const post = (event: React.FormEvent) => {
    event.preventDefault();
    postPublication(image, title, content, username);
    setTitle("");
    setContent("")
    setImage("");
    setTimeout(() => {
      onPostSuccess();
    }, 600);
  }

    function postPublication(image: string, title: string, content: string, authorname: string) {
        fetch(`${URL}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(
            { 
                "image": image,
                "title": title,
                "content": content,
                "authorname": authorname
            }
          ),
        })
        .then((response) => {
          if (response.status === 403 || response.status === 401) {
            navigate("/");
          }
          return response.json();
        })
          .catch((error) => console.error('Error posting publication:', error));
    }

    return (
      <form onSubmit={post} className="p-4 flex flex-col h-screen">
        <legend>
          <h2 className="font-bold text-2xl">Submit a New Publication</h2>
        </legend>
        
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
        
        {/* Publish Button */}
        <button
          type="submit"
          className="py-3 px-6 mt-4 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold hover:opacity-80 transition duration-200"
        >
          Publish
        </button>
      </form>
    );
    
}


export default NewPost;