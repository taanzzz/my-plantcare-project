import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './../../Component/AuthContext/AuthContext';
import { Link } from 'react-router';


const MyProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    
    const mq = window.matchMedia('(hover: hover)');
    setCanHover(mq.matches);

    
    const handler = (e) => setCanHover(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!user) return null;

  const defaultPhoto = 'https://i.ibb.co/FbDdMYbZ/vecteezy-blue-profile-icon-36885313.png';

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('👋 Successfully logged out!');
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Failed to logout!');
    }
  };

  const handleMouseEnter = () => {
    if (canHover) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (canHover) {
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 300);
    }
  };

  const handleClick = () => {
    if (!canHover) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick} 
    >
      <div className="btn btn-ghost btn-circle avatar">
        <img
          className="w-10 rounded-full"
          src={user.photoURL || defaultPhoto}
          alt="User"
        />
      </div>

      <ul
        className={`absolute right-0 mt-2 bg-base-100 shadow rounded-box w-52 p-2 z-50 flex-col ${
          open ? 'flex' : 'hidden'
        }`}
      >
        <li>
          <span
            onClick={() =>
              toast.info(`👤 Logged in as ${user.displayName || 'Anonymous'}`)
            }
            className="cursor-pointer"
          >
            {user.displayName || 'Anonymous'}
          </span>
        </li>
        <li>
    <Link
      to="/user-profile"
      className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 mt-1"
      onClick={() => setOpen(false)}
    >
      Profile Settings
    </Link>
  </li>
        <li>
          <button
            onClick={handleLogout}
            className="btn btn-sm bg-red-600 text-white hover:bg-red-700 mt-1"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MyProfile;
