import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import User from '@/models/User';
import PropertyCard from '@/components/PropertyCard'; 

const SavedPropertiesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  const user = await User.findById(userId).populate('bookmarks').lean();
  const { bookmarks } = user;

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h2 className='text-2xl mb-4'>Saved Properties</h2>
        {bookmarks.length === 0 ? (
          <p>No saved properties...</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarks?.map((bookmark) => (
              <PropertyCard 
                key={bookmark._id} 
                property={bookmark} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;