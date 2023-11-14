'use client';
import { FC, useEffect, useState } from 'react';
import { IUser } from '@/lib/interfaces/interfaces';
import Button from '@/components/ui/Button';
import { ChevronRight } from 'react-feather';

interface UserProps extends IUser {
  user: IUser;
}

const ConnectToStripe: FC<UserProps> = ({ user }: { user: IUser }) => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/getUser?userId=${user?.id}`);
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const redirectToStripe = () => {
    const clientId = 'ca_OXvtiM8YHwAezXa77Xnjw92g3e4OJDul';
    const stripeUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write&state=${user.id}`;
    window.location.href = stripeUrl;
  };

  if (isLoading || userData?.stripeAccountId) {
    return null;
  }

  return (
    <div>
      {user && !userData?.stripeAccountId && (
        <div className='w-screen bottom-0 left-0 absolute px-4 py-2 overflow-hidden bg-emerald-400 flex flex-wrap justify-center items-center'>
          <p className='text-center text-sm sm:text-base'>
            Before you can start receiving payments, please connect your account
            to Stripe.
          </p>

          <Button
            intent='text'
            size='small'
            className='-ml-2 text-blue-600'
            onClick={redirectToStripe}
          >
            Connect to Stripe
          </Button>
          <ChevronRight className='mt-[.1rem] -ml-4 text-blue-600 w-[1.4rem]' />
        </div>
      )}
    </div>
  );
};

export default ConnectToStripe;
