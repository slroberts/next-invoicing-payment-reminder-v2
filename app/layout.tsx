import '@/styles/global.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body className='flex flex-col h-screen md:max-w-4xl lg:max-w-6xl mx-auto px-8'>
        <Header />
        <main>{children}</main>
        <div id='modal' className='mx-0 my-0'></div>
        <Footer />
      </body>
    </html>
  );
}
