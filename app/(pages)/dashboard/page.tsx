import Navbar from '@/app/components/Navbar';
import { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: 'Dashboard | Daily Manage',
  };
}

export default function Dashboard() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
