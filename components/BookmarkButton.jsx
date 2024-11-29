'use client';

import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';
import bookmarkProperty from '@/app/actions/bookmarkProperty'; 

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleBookmarkProperty = async () => {
    if (!userId) {
      toast.error('You need to be signed in to bookmark a listing');
      return;
    };

    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      toast.success(res.message);
    });
  };

  return (
    <button 
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handleBookmarkProperty}
    >
      <span><FaBookmark className='mr-2' /></span>  
      <span>Bookmark Property</span> 
    </button>
  );
};

export default BookmarkButton;