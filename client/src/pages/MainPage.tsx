import { FaUsers } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { LuPlusSquare } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import Sidebar, { SidebarItem } from '../components/SideBar';
import ListPublications from '../components/ListPublications';
import ListMyPublications from '../components/ListMyPublications';
import ReadPublication from '../components/ReadPublication';
import Users from '../components/Users';
import NewPost from '../components/NewPost';
import EditPost from '../components/EditPost';

interface User {
  createdAt: string;
  id: number;
  role: "USER" | "ADMIN";
}

interface DecodedToken {
  exp: number;
  iat: number;
  user: User;
}


const MainPage: React.FC = () => {
  const [view, setView] = useState(0);
  const [selectedPublicationId, setSelectedPublicationId] = useState(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const handlePostSuccess = () => {
    setView(2);
  };

  const loadHome = () => {
    setView(0);
  };

  const handleRead = (id: number) => {
    setSelectedPublicationId(id);
    setView(4);
  };

  const handleEdit = (id: number) => {
    setSelectedPublicationId(id);
    setView(5);
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token") ?? "";

    if (storedToken) {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(storedToken);
      console.log(decoded)
      if (decoded.user.role === "ADMIN") {
        setIsAdmin(true);
      }
    }

  }, []);

  return (
    <section className='flex min-h-full bg-slate-50 w-full relative'>
        <Sidebar>
          <SidebarItem icon={<CiBookmark size={20}/>} text={"Home"} active={view === 0} onClick={() => setView(0)}/>
          <SidebarItem icon={<LuPlusSquare size={20}/>} text={"New Post"} active={view === 1} onClick={() => setView(1)}/>
          <SidebarItem icon={<FaList size={20}/>} text={"My Publications"} active={view === 2} onClick={() => setView(2)}/>
          { isAdmin ? (<SidebarItem icon={<FaUsers size={20}/>} text={"Users"} active={view === 3} onClick={() => setView(3)}/>) : <></>}
        </Sidebar>
        <div className='content-view min-h-full w-full flex-1 overflow-auto'>
            {view === 0 && <ListPublications onRead={handleRead} />}
            {view === 1 && <NewPost onPostSuccess={handlePostSuccess} />}
            {view === 2 && <ListMyPublications onEdit={handleEdit} />}
            {view === 3 && <Users />}
            {view === 4 && <ReadPublication publicationId={selectedPublicationId} onDeletion={loadHome} />}
            {view === 5 && <EditPost publicationId={selectedPublicationId} onEditSuccess={handlePostSuccess} />}
        </div>
    </section>
  );
};

export default MainPage;
