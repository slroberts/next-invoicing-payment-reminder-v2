export default function LoadingSpinner() {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='mt-80 w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400'></div>
    </div>
  );
}
