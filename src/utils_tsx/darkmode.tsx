export function dark_mode_init() {
  const darkMode = localStorage.getItem('dark-mode') === 'true';
  if (darkMode) {
	document.querySelectorAll('.darkm').forEach((el) => {
	  el.classList.add("dark:bg-gray-900")
	  el.classList.add("dark:text-white")
	})
	document.querySelectorAll('.transparent-btn').forEach((el) => {
	  el.classList.add("dark:bg-transparent")
	  el.classList.add("dark:text-white")
	})
  } else {
	document.querySelectorAll('.darkm').forEach((el) => {
	  el.classList.remove("dark:bg-gray-900")
	  el.classList.remove("dark:text-white")	  
	})
	document.querySelectorAll('.transparent-btn').forEach((el) => {
	  el.classList.remove("dark:bg-transparent")
	  el.classList.remove("dark:text-white")
	})
  }  
}