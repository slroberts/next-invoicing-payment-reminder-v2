import { getUserFromCookie } from '@/lib/auth';
import { cookies } from 'next/headers';
import AppBrand from './AppBrand';
import HeaderLoginLogoutBtn from './HeaderLoginLogoutBtn';

const getData = async () => {
  const user = await getUserFromCookie(cookies() as any);

  return { user };
};

const Header = async () => {
  const { user } = await getData();

  return (
    <header className='py-6 flex justify-between'>
      <AppBrand />
      <HeaderLoginLogoutBtn user={user!} />
    </header>
  );
};

export default Header;
