'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/globalContext';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked As ${read ? 'Read' : 'New'}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success('Message Deleted');
  };
  
  if (isDeleted) {
    return (
      <p>Deleted message</p>    
    );
  };

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      {!isRead && (
        <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
          New    
        </div>
      )}  

      <h2 className='text-xl mb-4'>
        <span className='font-bold mr-2'>Property Inquiry:</span>
        <span>{message.property.name}</span>
      </h2>

      <p className='text-gray-600'>
        {message.body}
      </p>

      <ul className='mt-4'>
        <li>
          <strong className='mr-1'>Reply Email:</strong>
          <a href={`mailto:${message.email}`} className='text-blue-500'>
            {message.email}
          </a>
        </li>
        <li>
          <strong className='mr-1'>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className='text-blue-500'>
            {message.phone}
          </a>
        </li>
        <li>
          <strong className='mr-1'>Received:</strong>
          <span>{new Date(message.createdAt).toLocaleString()}</span> 
        </li>
      </ul>

      <button 
        className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'
        onClick={handleReadClick}
      >
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>

      <button 
        className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;