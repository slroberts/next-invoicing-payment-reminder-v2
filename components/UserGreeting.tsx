import { UserProps } from '@/lib/interfaces/interfaces';
import { User } from 'react-feather';

const UserGreeting = ({ user }: { user: UserProps }) => {
  return (
    <div className='flex items-center gap-2'>
      <User className='w-[1.5rem] h-[1.5rem] rounded-full border-2 border-blue-300 bg-blue-50 text-blue-300' />{' '}
      <span className='hidden sm:block text-base'>
        {user?.firstName} {user?.lastName}
      </span>
    </div>
  );
};

export default UserGreeting;
