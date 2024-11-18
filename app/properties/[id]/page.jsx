// 'use client';
// import { useRouter, useParams, useSearchParams, usePathname } from 'next/navigation';

const PropertyPage = ({ params }) => {
  // const router = useRouter();
  // const { id } = useParams();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();

  return (
    <div>PropertyPage {params.id}</div>
  );
};

export default PropertyPage;