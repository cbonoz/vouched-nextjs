import { Endorsement } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import Image from 'next/image';

const Endorsement = ({ endorsement }: { endorsement: Endorsement }) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 shadow-md mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {/* Avatar or placeholder for user */}
          <Image
            width={200}
            height={200}
            className="w-10 h-10 rounded-full"
            src={endorsement.avatar || 'https://i.pravatar.cc/40'}
            alt={endorsement.handle}
          />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{endorsement.handle}</div>
          <div className="text-gray-500">{endorsement.name}</div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-700">{endorsement.message}</p>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {formatDate(endorsement.createdAt, false)}
      </div>
    </div>
  );
 };

 export default Endorsement;

