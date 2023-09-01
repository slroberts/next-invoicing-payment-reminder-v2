import { getUserFromCookie } from '@/lib/auth';
import { cookies } from 'next/headers';
import AppBrand from './AppBrand';
import HeaderLoginLogoutBtn from './HeaderLoginLogoutBtn';
import ConnectToStripe from './ConnectToStripe';

const getData = async () => {
  const user = await getUserFromCookie(cookies() as any);

  return { user };
};

const Header = async () => {
  const { user } = await getData();
  return (
    <div>
      <ConnectToStripe user={user!} />

      <header className='py-6 flex justify-between'>
        <AppBrand />
        <HeaderLoginLogoutBtn user={user!} />
      </header>
    </div>
  );
};

export default Header;
