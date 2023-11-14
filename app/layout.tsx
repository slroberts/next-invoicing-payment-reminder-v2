import '@/styles/global.css';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { AuthProvider } from '../contexts/AuthContext';

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang='en'>
        <head />
        <body className='bg-slate-950 flex flex-col w-screen h-screen px-8 md:px-16'>
          <Header />
          <main>{children}</main>
          <div id='modal' className='mx-0 my-0'></div>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
