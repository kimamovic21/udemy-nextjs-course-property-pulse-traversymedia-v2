'use server';

import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import Message from '@/models/Message';

async function addMessage(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: 'You must be logged in to send a message' };
  };

  const { userId } = sessionUser;

  const recipient = formData.get('recipient');

  if (userId === recipient) {
    return { error: 'You can not send a message to yourself' };
  };

  const newMessage = new Message({
    sender: userId,
    recipient: recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('message'),
  });

  await newMessage.save();

  return { submitted: true };
};

export default addMessage;