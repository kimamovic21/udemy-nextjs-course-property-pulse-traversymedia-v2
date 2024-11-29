'use server';

import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import User from '@/models/User';

async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  };

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  const isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    // If already bookmarked, then remove
    user.bookmarks.pull(propertyId);
    message = 'Bookmark Removed';
    isBookmarked = false;
  } else {
    // If not bookmarked, then add
    user.bookmarks.push(propertyId);
    message = 'Bookmark Added';
    isBookmarked = true;
  };

  await user.save();
  revalidatePath('/properties/saved', 'page');

  return {
    message,
    isBookmarked
  };
};

export default bookmarkProperty;