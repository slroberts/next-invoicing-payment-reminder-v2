import { getUserFromCookie } from '@/lib/auth';
import { cookies } from 'next/headers';
import { IUser } from '@/lib/interfaces/interfaces';
import AppBrand from '@/components/shared/AppBrand';
import ConnectToStripe from '@/components/shared/ConnectToStripe';
import HeaderLoginLogoutBtn from '@/components/shared/HeaderLoginLogoutBtn';

const getData = async () => {
  const userData = await getUserFromCookie(cookies() as any);

  return { userData };
};

const Header = async () => {
  const { userData } = await getData();
  const user = userData as IUser;

  return (
    <div>
      <ConnectToStripe user={user} />

      <header className='bg-slate-950 flex justify-between py-6'>
        <AppBrand />
        <HeaderLoginLogoutBtn user={user!} />
      </header>
    </div>
  );
};

export default Header;
