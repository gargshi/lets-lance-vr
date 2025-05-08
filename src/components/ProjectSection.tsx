import React from 'react';
import { dark_mode_init } from '../utils_tsx/darkmode';
import API_BASE from "../components/config";
import Modal from './Modal';

interface ProjectSectionProps {
  	className?: string;  
}

interface LobbyProject {
  	"id": number, 
	"title": string,
	"description": string,
	"created_at": string,
	"created_by": string,
	"status": string,
	"budget": number,
}

interface ProjectCardProps {
	className?: string;
	id: number;
	title: string;
	postedBy: string;
	projectName: string;
	budget: number;
	canDelete: boolean;
	openModalProject: () => void;
}

const limit = 10;
const ProjectSection:React.FC<ProjectSectionProps> = ({className=""}) => {
	const [LobbyProjects, setLobbyProjects] = React.useState<LobbyProject[]>([]);
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const [isModalOpen, setModalOpen] = React.useState(false);
	const [isProjectModalOpen, setProjectModalOpen] = React.useState(false);


	const userData = JSON.parse(localStorage.getItem("user") || "{}");
	const fetchProjectsLobby = async () => {
		const access_token = localStorage.getItem("access_token");
		if (!access_token) {
		window.location.href = "/login";
		return;
		}		

		const userData = JSON.parse(localStorage.getItem("user") || "{}");
		if (userData?.id) {
			const res = await fetch(`${API_BASE}/projects`, 
				{
					method: "GET"
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
	React.useEffect(() => {
		dark_mode_init();
		fetchProjectsLobby();
	},[]);
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
	<section className={`${className} project-section bg-white rounded-xl shadow p-6 col-span-3 lg:col-span-2 border border-gray-500`}>
		<h2 className="text-lg font-semibold mb-4">Lobby Projects</h2>
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
		<Modal isOpen={isProjectModalOpen} onClose={() => setProjectModalOpen(false)} title="Viewing Project">
			<div className="mb-4">
				<h2 className="text-gray-700 font-bold mb-2">Project Details</h2>
				<p className="text-gray-600">Project ID: {LobbyProjects[0]?.id}</p>
				<p className="text-gray-600">Title: {LobbyProjects[0]?.title}</p>				
			</div>
		</Modal>
		<Paginator currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
		<table className="table-auto w-full border-collapse border border-gray-300 mb-4">
			<thead>
				<tr>
					<th className="border border-gray-300 px-4">Project ID</th>
					<th className="border border-gray-300 px-4">Title</th>
					<th className="border border-gray-300 px-4">Description</th>
					<th className="border border-gray-300 px-4">Budget</th>
					<th className="border border-gray-300 px-4">Created_by</th>
					<th className="border border-gray-300 px-4">Actions</th>
				</tr>
			</thead>
			<tbody>
				{currentProjects.map((project) => (
					<ProjectCard 
						className={className} 
						id={project.id} 
						key={project.id} 
						title={project.title} 
						postedBy={ 
							project.created_by === userData.name ? (
								project.created_by + " (You)"
							) : (
								project.created_by
							)
						} 
						projectName={project.description} 
						budget={project.budget} 
						canDelete={project.created_by === userData.name}
						openModalProject={() => setProjectModalOpen(true)} />
				))}
			</tbody>
		</table>
		<Paginator currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
		<div className="flex justify-center mt-4">
			<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => setModalOpen(true)}>
				Create New Project
			</button>
		</div>
	</section>
  );
}

const ProjectCard: React.FC<ProjectCardProps> = ({ className, id, title, postedBy, projectName, budget, canDelete, openModalProject }) => {
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
	return (
		<tr key={id} className={`${className} project-card border-b border-gray-300`}>
			<td className="border border-gray-300 px-4">{id}</td>
			<td className="border border-gray-300 px-4">{title}</td>
			<td className="border border-gray-300 px-4">{projectName}</td>
			<td className="border border-gray-300 px-4">${budget}</td>
			<td className="border border-gray-300 px-4">{postedBy}</td>
			<td className="border border-gray-300 px-4 flex space-x-2">
				<button type="button" title="View" className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition duration-200 ml-2" onClick={() => { openModalProject(); }}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
					</svg>
				</button>
				{canDelete && (
					<button type="button" title="Delete" className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => DeleteProject(id)}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
							<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
						</svg>
					</button>
				)}
				
			</td>
		</tr>
	)
};

const Paginator: React.FC<{ currentPage: number; totalPages: number; handlePrev: () => void; handleNext: () => void }> = ({ currentPage, totalPages, handlePrev, handleNext }) => {
  return (
	<div className="flex items-center justify-center p-4">
			<button onClick={handlePrev} disabled={currentPage === 1} 
				className={`bg-green-500 text-white px-4 py-2 rounded ${currentPage === 1 ? 'bg-red-600 opacity-50 cursor-not-allowed' :'' }`}>
			Previous
			</button>
			<span className="mx-4">
			Page {currentPage} of {totalPages}
			</span>
			<button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0} 
				className={`bg-green-500 text-white px-4 py-2 rounded ${currentPage === totalPages || totalPages === 0 ? 'bg-red-600 opacity-50 cursor-not-allowed' :'' }`}>
			Next
			</button>
		</div>
	);
}


export default ProjectSection;