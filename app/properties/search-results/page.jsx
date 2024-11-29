import { convertToSerializableObject } from '@/utils/convertToObject';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const SearchResultsPage = async ({ searchParams: { location, propertyType }}) => {
  await connectDB();

  const locationPattern = new RegExp(location, 'i');

  let query = {
    $or: [
      { name: locationPattern },    
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },    
    ]
  };

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');
    query.type = typePattern;
  };

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = propertiesQueryResults.map(convertToSerializableObject);
  console.log(properties);

  return (
    <div>SearchResultsPage</div>
  );
};

export default SearchResultsPage;