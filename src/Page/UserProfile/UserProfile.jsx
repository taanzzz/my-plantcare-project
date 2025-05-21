import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './../../Component/AuthContext/AuthContext';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(user, { displayName: name, photoURL });
      toast.success('✅ Profile updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error('❌ Failed to update profile!');
      console.error(error);
    }
  };

  if (!user) return <p className="text-center mt-10">Please log in first.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Photo URL</label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
