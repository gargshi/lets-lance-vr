import React, { useEffect } from 'react';
import { dark_mode_init } from '../utils_tsx/darkmode';
import API_BASE from "../components/config";
import Modal from './Modal';

interface ProjectSectionProps {
  	className?: string;  
}

export interface LobbyProject {
  	"id": number,
  	"project_id": number, 
	"title": string,
	"description": string,
	"created_at": string,
	"created_by": string,
	"status": string,
	"budget": number,
}

interface ProjectCardProps {
	project?: LobbyProject;
	className?: string;
	id?: number;
	title?: string;
	postedBy?: string;
	projectDescription?: string;
	budget?: number;
	canDelete?: boolean;
	createdAt?: string;
	userData?: any;
	openModalProject?: () => void;
	fetchBids?: () => void;
}

// const limit = 10;
const ProjectSection:React.FC<ProjectSectionProps> = ({className=""}) => {
	const [LobbyProjects, setLobbyProjects] = React.useState<LobbyProject[]>([]);
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const [isModalOpen, setModalOpen] = React.useState(false);
	
	const [noOfCols, setNoOfCols] = React.useState<number>(1);
	const [limit, setLimit] = React.useState<number>(10);
	const [searchStr, setSearchStr] = React.useState<string>("");


	const userData = JSON.parse(localStorage.getItem("user") || "{}");
	const fetchProjectsLobby = async () => {
		const access_token = localStorage.getItem("access_token");
		if (!access_token) {
		window.location.href = "/login";
		return;
		}		
		

		const userData = JSON.parse(localStorage.getItem("user") || "{}");
		if (userData?.id) {
			const res = await fetch(`${API_BASE}/projects?q=${searchStr}`, 
				{
					method: "GET",										
				}
			);
			const data = await res.json();			
	
			if (!res.ok) alert(data.message || "Data fetch failed.");
			
			if (data) {
				setLobbyProjects(data);						
			}
		}
	};

	// Initialize dark mode on component mount
	useEffect(() => {
		dark_mode_init();
		fetchProjectsLobby();		
	},[]);
	const totalProjects = LobbyProjects.length;
	const totalPages = Math.ceil(LobbyProjects.length / limit);
	const startIndex = (currentPage - 1) * limit;
	const reversedProjects = [...LobbyProjects].reverse();  
	const currentProjects = reversedProjects.slice(startIndex, startIndex + limit);

	const handlePrev = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const handleNext = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	const addProject = async () => {
		// Logic to add a project
		const title = (document.getElementById("project_title") as HTMLInputElement).value;
		const description = (document.getElementById("project_description") as HTMLTextAreaElement).value;
		const budget = (document.getElementById("project_budget") as HTMLInputElement).value;
		if (!title || !description || !budget) {
			alert("Please fill in all fields.");
			return;
		}
		const access_token = localStorage.getItem("access_token");
		if (!access_token) {
			window.location.href = "/login"; // Redirect to login page
			return;
		}
		const userData = JSON.parse(localStorage.getItem("user") || "{}");
		if (!userData.id) {
			alert("User data not found.");
			return;
		}    
		const res = await fetch(`${API_BASE}/project/add`, {
			method: "POST",
			headers: {
			"Content-Type": "application/json",
			},
			body: JSON.stringify({
			title,
			description,
			created_by : userData.id,
			budget
			})
		})
		const data = await res.json();
		if (!res.ok) alert(data.message || "Data fetch failed.");
		if (data) {
			alert("Project added successfully.");
			window.location.reload();
		}	
	};

	

	
	

  return (
	<section className={`${className} project-section bg-white rounded-xl shadow p-6 border border-gray-500`}>
		<div className="flex flex-row justify-between">
			<div className='flex flex-row gap-4 mb-4 align-center'>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
				</svg>
				<h2 className="text-lg font-semibold mb-4">
					Lobby Projects
				</h2>
			</div>
			<div className='flex flex-row gap-4 mb-4 align-center'>
				<span className="text-lg font-semibold mb-4 bg-gray-500 text-white px-2 rounded">{totalProjects}</span>
			</div>
		</div>
		<div className='flex flex-col space-x-4 border border-gray-500 p-4 text-sm justify-center items-center'>			
			<div className="flex flex-col md:flex-row w-full">
				<form onSubmit={(e) => { e.preventDefault(); fetchProjectsLobby(); }} className="flex items-center w-full space-x-2">
					<input
						type="text"
						placeholder="Search"
						className="flex-grow mb-4 darkm border border-gray-500 p-2 rounded"
						value={searchStr}
						onChange={(e) => { setSearchStr(e.target.value); }}
					/>
					<button type='submit' className="mb-4 darkm border border-gray-500 p-2 rounded">
						Search
					</button>
				</form>
				<div className="flex items-center space-x-2">
					<div className="flex flex-col items-center space-x-2">
						<p className='hidden md:block'>Layout</p>
						<select title="select no of columns" className="mb-4 darkm hidden md:block" onChange={(e) => { setNoOfCols(parseInt(e.target.value)); }}>
							<option value="1">1 Column</option>
							<option value="2">2 Columns</option>
							<option value="3">3 Columns</option>
						</select>
					</div>
					<div className="flex flex-col items-center space-x-2">
						<p className='hidden md:block'>Per page</p>
						<select title="select records per page" className="mb-4 darkm" onChange={(e) => { setLimit(parseInt(e.target.value)); }}>
							<option value="10">10 Records</option>
							<option value="20">20 Records</option>
							<option value="30">30 Records</option>
						</select>
					</div>					
				</div>				
			</div>
			
		</div>
		<Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Project">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); addProject(); }}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title</label>
                <input title="title" type="text" id="project_title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea title="description" id="project_description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Budget</label>
                <input type="number" title="budget" id="project_budget" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">                
                <button type="submit" className="bg-blue-500 text-white p-3 rounded-xl">Add Project</button>
              </div>
            </form> 
      	</Modal>
		
		<div className={`text-center mt-4 ${LobbyProjects.length > 0 ? `hidden` : ``}`}>
			Loading...
		</div>
		<Paginator currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
		<>
			<div className={`grid grid-cols-1 md:grid-cols-${noOfCols} lg:grid-cols-${noOfCols} gap-4`}>
				{currentProjects.map((project) => (
					<ProjectCard 
						project={project}
						className={className} 						
						key={project.id} 				
						canDelete={project.created_by === userData.name}
						userData={userData}								
					/>
				))}
			</div>			
		</>
		
		<Paginator currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
		<div className="flex justify-center mt-4">
			<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => setModalOpen(true)}>
				Create New Project
			</button>
		</div>
	</section>
  );
}

interface Bid {
	id: number;
	amount: number;
	created_at: string;
	created_by: string;
	project_id: number;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ project, canDelete, userData }) => {
	const [isProjectModalOpen, setProjectModalOpen] = React.useState(false);
	// const [dataStr, setDataStr] = React.useState<LobbyProject|any>({});
	
	
	const [bids, setBids] = React.useState<Bid[]>([]);

	const fetchBids = async (projectId: number) => {
		const access_token = localStorage.getItem("access_token");
		if (!access_token) {
			window.location.href = "/login";
			return;
		}
		const res = await fetch(`${API_BASE}/bid/project/${projectId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",				
			}
		});
		const data = await res.json();
		if (!res.ok) alert(data.message || "Data fetch failed.");
		if (data) {
			setBids(data);
		}
	};

	const bidOnProject = async (projectId: number) => {
		const access_token = localStorage.getItem("access_token");
		if (!access_token) {
			window.location.href = "/login";
			return;
		}
		const res = await fetch(`${API_BASE}/bid/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${access_token}`
			},
			body: JSON.stringify({
				amount: 100, // Example amount, replace with actual input				
				projectid: projectId
			})
		});
		const data = await res.json();
		if (!res.ok) {alert(data.message || "Data fetch failed."); return;}
		if (data) {
			alert("Bid placed successfully.");
			window.location.reload();
		}
	};

	

	


	const DeleteProject = async (id: number) => {
		const access_token = localStorage.getItem("access_token");
		if (!access_token) {
		window.location.href = "/login";
		return;
		}
		const userData = JSON.parse(localStorage.getItem("user") || "{}");
		const res = await fetch(`${API_BASE}/projects/delete/${id}/${userData.email}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",				
			}
		});
		const data = await res.json();
		if (!res.ok) alert(data.message || "Data fetch failed.");
		if (data) {
			alert("Project deleted successfully.");
			window.location.reload();
		}
	};

	function timeAgo(dateString: string): string {
		const now = new Date();
		const past = new Date(dateString);
		const diffMs = now.getTime() - past.getTime();

		const seconds = Math.floor(diffMs / 1000);
		const minutes = Math.floor(diffMs / (1000 * 60));
		const hours = Math.floor(diffMs / (1000 * 60 * 60));
		const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (seconds < 60) return `${seconds} seconds ago`;
		if (minutes < 60) return `${minutes} minutes ago`;
		if (hours < 24) return `${hours} hours ago`;
		return `${days} days ago`;
	}

	React.useEffect(() => {
		if (project) {
			// setDataStr(project);
			fetchBids(project.id);
		}
	}, []);

	return (
		<>
			<Modal isOpen={isProjectModalOpen} onClose={() => setProjectModalOpen(false)} title="" dataStr>
				<div className="mb-4 space-y-3">
					<h2 className="text-xl font-semibold text-gray-800 border-b pb-2">{project?.title ?? '-'}</h2>
					<div className="flex justify-between text-sm text-gray-700">
						<span className="font-medium">Project ID:</span>
						<span>{project?.id ?? '-'}</span>
					</div>

					<div className="flex justify-between text-sm text-gray-700">
						<span className="font-medium">Title:</span>
						<span>{project?.title ?? '-'}</span>
					</div>

					<div className="flex justify-between text-sm text-gray-700">
						<span className="font-medium">Budget:</span>
						<span>${project?.budget ?? '0'}</span>
					</div>
					<div className="text-sm text-gray-700 mt-4">
						<h3 className="font-medium text-gray-800 mb-1">Description:</h3>
						<div className="max-h-40 overflow-y-auto pr-2 leading-relaxed text-gray-600">
							{project?.description ?? 'No description provided.'}
						</div>
						<div className="flex justify-end mt-4">
							<button className={`bg-blue-500 text-white cursor-pointer hover:bg-zinc-900 transition-all duration-300 p-2 rounded-xl disabled:cursor-not-allowed disabled:bg-gray-400`} 
								onClick={() => bidOnProject(project?.id ?? -1)}
							 	disabled={project?.created_by === userData.name}>
								Bid on project
							</button>
						</div>
					</div>
				</div>			
			</Modal>
			<div className="mb-6 rounded-xl border border-gray-500 p-6 shadow-md hover:border-blue-400 transition duration-300" >
				<p className='text-xs text-gray-20'> Posted by: <span className="font-medium text-gray-30">{project?.created_by === userData?.name ? project?.created_by + " (You)" : project?.created_by}</span>, {timeAgo(project?.created_at ?? "")}</p>
				<div className='flex justify-between '>
					<div>
						<h2 className="text-lg font-semibold text-white-800 mt-2">{project?.title}</h2>
						<p className="text-base text-gray-60 hidden">{project?.description}</p>
						<a className='text-blue-400 text-sm cursor-pointer' onClick={() => { setProjectModalOpen(true); }}>View Project</a>
					</div>
					<div className='flex flex-col items-end'>
						<div className='flex flex-col md:flex-row space-x-3.5'>
							<p className="text-base flex space-x-2 text-gray-70 font-medium mt-2 mb-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
								</svg>

								<span className="text-green-500">{bids.length}</span>
							</p>
							<p className="text-base flex space-x-2 text-gray-70 font-medium mt-2 mb-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
								</svg>
								<span className="text-green-500">${project?.budget}</span>
							</p>
						</div>
						<div className='flex'>
							<button type="button" title="View" className="bg-transparent border border-zinc-500 px-2 mr-1 py-1 rounded-lg hover:bg-blue-600 transition duration-200 ml-2" onClick={() => { setProjectModalOpen(true); }}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
								</svg>
							</button>
							{canDelete && (
								<button type="button" title="Delete" className="bg-transparent border border-zinc-500 px-2 py-1 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => DeleteProject(project?.id ? project.id : 0)}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
									</svg>
								</button>
							)}
						</div>						
					</div>
				</div>								
				<p className="text-xs text-gray-20">Project ID: <span className="font-medium text-gray-30">{project?.id}</span></p>
			</div>
		</>					
		
	)
};

const Paginator: React.FC<{ currentPage: number; totalPages: number; handlePrev: () => void; handleNext: () => void }> = ({ currentPage, totalPages, handlePrev, handleNext }) => {
  return (
	<div className="flex items-center justify-center p-4">
			<button onClick={handlePrev} disabled={currentPage === 1} 
				className={`bg-green-500 text-white px-2 py-2 rounded ${currentPage === 1 ? 'bg-red-600 opacity-50 cursor-not-allowed' :'' }`}>
			Previous
			</button>
			<span className="mx-4 text-sm">
			Page {currentPage} of {totalPages}
			</span>
			<button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0} 
				className={`bg-green-500 text-white px-2 py-2 rounded ${currentPage === totalPages || totalPages === 0 ? 'bg-red-600 opacity-50 cursor-not-allowed' :'' }`}>
			Next
			</button>
		</div>
	);
}


export default ProjectSection;