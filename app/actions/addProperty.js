'use server';

async function addProperty(formData) {
  console.log(formData);
  console.log(formData.get('name'));
  console.log(formData.getAll('amenities'));
};

export default addProperty;