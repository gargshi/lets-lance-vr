import React from 'react';
import { dark_mode_init } from '../utils_tsx/darkmode';
import API_BASE from "../components/config";
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
}

const ProjectSection:React.FC<ProjectSectionProps> = ({className=""}) => {
	const [LobbyProjects, setLobbyProjects] = React.useState<LobbyProject[]>([]);
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

	

  return (
	<section className={`${className} project-section bg-white rounded-xl shadow p-6 col-span-3 lg:col-span-2 border border-gray-500`}>
	  <h2 className="text-lg font-semibold mb-4">Lobby Projects</h2>
	  <div className="project-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
		{
			LobbyProjects.map((project) => (
				<div key={project.id} className="project-item border-b border-gray-300 col-span-2 sm:col-span-1 py-2 background-gray-100">					
					<div>{project.id}</div>					
					<ProjectCard className={className} id={project.id} key={project.id} title={project.title} postedBy={ 
						project.created_by === userData.name ? (
							project.created_by + " (You)"
						) : (
							project.created_by
						)
					} projectName={project.description} budget={project.budget} canDelete={project.created_by === userData.name} />
				</div>
			))
		}
	  </div>
	</section>
  );
}

const ProjectCard: React.FC<ProjectCardProps> = ({ className, id, title, postedBy, projectName, budget, canDelete }) => {
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
	  <div className={`${className} flex justify-between items-center p-4  border border-gray-900 rounded-lg shadow`}>
		<div className={`${className} px-4 py-2 rounded-lg bg-transparent text-black text-center`}>
		  <div className={`${className} font-semibold text-xl text-gray-500 bg-transparent`}>{title}</div>
		  <div className={`${className} italic text-sm text-gray-500`}>Posted by: {postedBy}</div>
		  <div className="text-sm hidden">{projectName}</div>
		</div>
		<div className="bg-gray-700 px-4 py-2 rounded-lg text-center">
		  <div className="text-xs uppercase text-gray-300">Budget</div>
		  <div className="text-lg font-bold text-white bg-transparent">${budget}</div>
		</div>
		{canDelete && (
		  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => DeleteProject(id)}>
			Delete
		  </button>
		)}		
	  </div>  
	)
};

export default ProjectSection;