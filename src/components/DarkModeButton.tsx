const DarkModeButton = () => {
  return (
	<div>
		<button className="w-full bg-blue-500 text-white px-1 py-2 rounded" 
			onClick={ () => {						
								document.querySelectorAll('.darkm')!.forEach((el) => {
									el.classList.toggle("dark:bg-gray-900")
									el.classList.toggle("dark:text-white")
								})
								document.querySelectorAll('.transparent-btn').forEach((el) => {
									el.classList.toggle("dark:bg-transparent")
									el.classList.toggle("dark:text-white")
								})
							}
					} >
			Dark Mode
		</button>
	</div>
  )
}

export default DarkModeButton
