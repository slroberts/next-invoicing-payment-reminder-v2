import { IUser } from '@/lib/interfaces/interfaces';
import { User } from 'react-feather';

const UserGreeting = ({ user }: { user: IUser }) => {
  return (
    <div id='user' className='flex items-center gap-2'>
      <User className='w-[1.5rem] h-[1.5rem] rounded-full border-2 bg-slate-50 text-slate-700' />{' '}
      <span className='hidden sm:block text-slate-100 text-sm'>
        {user?.firstName} {user?.lastName}
      </span>
    </div>
  );
};

export default UserGreeting;
