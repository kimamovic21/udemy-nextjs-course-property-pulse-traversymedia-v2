'use server';

import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import User from '@/models/User';

async function checkBookmarkStatus(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  };

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
};

export default checkBookmarkStatus;