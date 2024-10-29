/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "/api/v1/publications";

const NewPost = () => {
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

  const post = () => {
      postPublication(title, content, username);
    }

    function postPublication(title: string, content: string, authorname: string) {
        fetch(`${URL}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(
            { 
                "title": title,
                "content": content,
                "authorname": authorname
            }
          ),
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              if (response.status === 403 && errorData.error === "Invalid token") {
                navigate("/");
              } else {
                throw new Error(errorData.error || 'An error occured');
              }
            });
          }
          return response.json();
        })
          .catch((error) => console.error('Error:', error));
    }

    return (
        <>
            <form onSubmit={post}>
                <div className="flex flex-col justify-center space-x-6 my-4">
                    <input className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 appearance-none' type='url' placeholder='Image URL' required value={image} id='image' onChange={(e) => setImage(e.target.value)} />
                    <input className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 appearance-none' type='text' placeholder='Title' required value={title} id='title' onChange={(e) => setTitle(e.target.value)} />
                    <input className='rounded-md p-3 my-3 border border-slate-900 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200 bg-slate-50 appearance-none' type='text' placeholder='Your post body...' required value={content} id='title' onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type='submit' className='py-3 px-6 m-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold hover:opacity-85'>Publish</button>
            </form>
        </>
    );
}


export default NewPost;