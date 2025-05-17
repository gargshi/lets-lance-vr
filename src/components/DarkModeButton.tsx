// const DarkModeButton = () => {
//   return (
// 	<div>
// 		<button className="w-full bg-blue-500 text-white px-1 py-2 rounded" 
// 			onClick={ () => {						
// 								document.querySelectorAll('.darkm')!.forEach((el) => {
// 									el.classList.toggle("dark:bg-gray-900")
// 									el.classList.toggle("dark:text-white")
// 								})
// 								document.querySelectorAll('.transparent-btn').forEach((el) => {
// 									el.classList.toggle("dark:bg-transparent")
// 									el.classList.toggle("dark:text-white")
// 								})
// 								document.querySelectorAll('.border').forEach((el) => {
// 									el.classList.toggle("dark:border-gray-500")
// 								})
// 								localStorage.setItem('dark-mode', localStorage.getItem('dark-mode') === 'true' ? 'false' : 'true')
// 							}
// 					} >
// 			<div className="flex items-center justify-center space-x-2 space-between">
// 				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
// 					<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
// 				</svg>
// 				|
// 				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
// 					<path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
// 				</svg>
// 			</div>
// 		</button>
// 	</div>
//   )
// }

// export default DarkModeButton
import { useEffect, useState } from 'react';

const DarkModeButton = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, read dark mode from localStorage
    const storedMode = localStorage.getItem('dark-mode') === 'true';
    setIsDark(storedMode);
    document.documentElement.classList.toggle('dark', storedMode);
  }, []);

  const toggleDarkMode = (e: React.MouseEvent) => {
    const newMode = !isDark;
    setIsDark(newMode);
    // document.documentElement.classList.toggle('dark', newMode);
	  e.currentTarget.classList.toggle('dark', newMode);
    localStorage.setItem('dark-mode', newMode.toString());

    // Optional: If you want to still toggle extra elements
    document.querySelectorAll('.darkm')?.forEach((el) => {
      el.classList.toggle('dark:bg-gray-900', newMode);
      el.classList.toggle('dark:text-white', newMode);
    });
    document.querySelectorAll('.transparent-btn')?.forEach((el) => {
      el.classList.toggle('dark:bg-transparent', newMode);
      el.classList.toggle('dark:text-white', newMode);
    });
    document.querySelectorAll('.border')?.forEach((el) => {
      el.classList.toggle('dark:border-gray-500', newMode);
    });
    // window.location.reload();
  };

  return (
      <button
        className={`${!isDark ? 'bg-transparent text-gray-600' : ''} w-full border border-gray-500 text-white px-1 py-2 rounded darkbtn`}
        onClick={toggleDarkMode}
        title="Toggle dark mode"
      >
        <div className={` flex items-center justify-center`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-6 ${!isDark ? 'text-gray-500 font-bold' : 'text-gray-900 bg-gray-100 hidden'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-6 ${isDark ? 'text-white-300 font-bold' : 'text-gray-300 bg-gray-900 hidden'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </div>
      </button>
  );
};

export default DarkModeButton;
