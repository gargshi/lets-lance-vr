import React from "react";
import API_BASE from "../components/config";
import { dark_mode_init } from '../utils_tsx/darkmode'; // Import the dark mode initialization function
interface DashboardProps {
  className?: string;
  username?: string;
  email?: string;
}

interface NotificationSectionProps {
  className?: string;
  sys_messages?: SystemMessage[];
}

interface DetailsAtGlanceProps{
  className?: string;
  userData?: {
	name: string;
	email: string;
	phone: string;
	address: string;
	role: string;
	};
}

interface ActionsSectionProps {
  className?: string;
}

interface SystemMessage {
  content: string;
  id: number;
  received_at: string;
  receiver: string;
  sender: string;
  sent_at: string;
  severity: string;
}
// const userData = {};


const Dashboard: React.FC<DashboardProps> = ( { className = '' }) => {

	const [sys_messages, setSysMessages] = React.useState<SystemMessage[]>([]);
	async function fetchUserData() {
		const access_token = localStorage.getItem("access_token");
		if (!access_token) {
			alert("You are not logged in.");
			window.location.href = "/login"; // Redirect to login page
			return;
		}
		//alert("Fetching user data...");
		if (!localStorage.getItem("user")) {
			console.log("User data not found. Fetching from API...");
			const res = await fetch(`${API_BASE}/dashboard`, {
				method: "GET",
				headers: { "Content-Type": "application/json", "Authorization": `Bearer ${access_token}` }
			});
			const data = await res.json();
			if (res.ok) {
				console.log(data.message);
				let user=data.user
				console.log(user)

				localStorage.setItem("user", JSON.stringify(user));
				window.location.href = "/dashboard"; // Redirect to dashboard page
				// localStorage.setItem("access_token", access_token);
			} else {
				alert(data.message || "Data fetch failed.");
			}
		}		
	}
	fetchUserData();

	const fetchMessages = async () => {
		const access_token = localStorage.getItem("access_token");
		if (!access_token) {
			// alert("You are not logged in.");
			window.location.href = "/login"; // Redirect to login page
			return;
		}

		const userData = JSON.parse(localStorage.getItem("user") || "{}");
		const res = await fetch(`${API_BASE}/messages/system/${userData.id}`, {
			method: "GET",
		});
		const data = await res.json();
		if (res.ok) {			
			setSysMessages(data);			
		} else {
			alert(data.message || "Data fetch failed.");
		}
	};
	
	// Initialize dark mode on component mount
	React.useEffect(() => {
		fetchMessages();
		dark_mode_init();
	}, []);

	const userData = JSON.parse(localStorage.getItem("user") || "{}");
	if (!userData) {
		console.log("User data not found.");
		return;
	}

	return (
		<>		
			<main className={ className+" flex flex-col items-center justify-center h-screen bg-gray-100"}>
				<div className={ className + " grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4"}>
					<NotificationSection className={className + " col-span-3 lg:col-span-2"} sys_messages={sys_messages}/>			
					
					<DetailsAtGlanceSection className={className + " col-span-3 lg:col-span-1"} userData={userData}/>
					
					<ActionsSection className={className + " col-span-3 lg:col-span-1"}/>
				</div>				  
			</main>
		</>
	)
}

const NotificationSection: React.FC<NotificationSectionProps> = ({className='', sys_messages=[]}) => {
	function switchTabs(tab_seq: string) {
		const systemTab = document.getElementById('systemTab');
		const userTab = document.getElementById('userTab');
		const systemMessages = document.getElementById('systemMessages');
		const userMessages = document.getElementById('userMessages');
		if (tab_seq === 'user_to_system') {
			systemMessages!.classList.remove('hidden');
			userMessages!.classList.add('hidden');
			systemTab!.classList.add('font-semibold', 'border-b-2', 'border-blue-600');
			userTab!.classList.remove('font-semibold', 'border-b-2', 'border-blue-600');
			userTab!.classList.add('text-white-600');
		}
		else if (tab_seq === 'system_to_user') {			
			userMessages!.classList.remove('hidden');
			systemMessages!.classList.add('hidden');
			userTab!.classList.add('font-semibold', 'border-b-2', 'border-blue-600');
			systemTab!.classList.remove('font-semibold', 'border-b-2', 'border-blue-600');
			systemTab!.classList.add('text-white-600');
		}
		else {
			console.log("Invalid tab sequence.");
		}
	}
	return (
		<section className={ className + " bg-white rounded-xl shadow p-6 col-span-3 lg:col-span-2 border"}>
			<div className={ className + " flex items-center gap-4 mb-5"}>
				<div className="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
					</svg>							  
					<h2 className={ className + " text-lg font-semibold"}>Notifications</h2>
					<div className="bg-blue-600 text-white mt-1 px-1 py-1 rounded hover:bg-blue-700" id="refreshMessages">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
						</svg>								  
					</div>
				</div>
			</div>

			
			<div className="flex border-b mb-4">
				<button id="systemTab" onClick={() => {
					switchTabs('user_to_system');
				}} className="px-4 py-2 text-sm bg-grey-800 font-semibold text-white-600 hover:text-blue-600 border-b-2 border-blue-600 focus:outline-none">
					System Messages
				</button>
				<button id="userTab" onClick={() => {
					switchTabs('system_to_user');
				}} className="px-4 py-2 text-sm text-white-600 hover:text-blue-600 focus:outline-none">
					User Messages
				</button>
			</div>

			
			<div id="systemMessages"  className="space-y-2 text-sm">
				<ul className="list-disc list-inside">
					{						
						sys_messages.map((sysMessage) => (	
							<li key={sysMessage.id}>{sysMessage.content}</li>
						))
					}					
				</ul>
			</div>

			<div id="userMessages" className="space-y-2 text-sm hidden">
				<ul className="list-disc list-inside">
					<li> Refreshing...</li>
				</ul>
			</div>
		</section>				
	)
}

const DetailsAtGlanceSection: React.FC<DetailsAtGlanceProps> = ({className = '',userData={}}) => {
	function toggleAccordion(sectionId: string) {
		const section = document.getElementById(sectionId);
		
		if (section!.classList.contains('max-h-0')) {
		  section!.classList.remove('max-h-0');
		  section!.classList.add('max-h-96'); // Add enough height for your content
		} else {
		  section!.classList.remove('max-h-96');
		  section!.classList.add('max-h-0');
		}
	}
	return (
		<section className={className + " bg-white border rounded-xl shadow p-6 col-span-3 lg:col-span-1"}>
			<h2 className={className + " text-lg font-semibold mb-4"}>Your details at a glance</h2>
			<hr/><br/>
			<div className="space-y-4">					  
				<div className="rounded-lg">
					<button className={ className + " border w-full flex justify-between items-center p-2 font-semibold bg-gray-100"} onClick={() => toggleAccordion('walletSection')}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
					</svg>
					Wallet
					<span>+</span>
					</button>
					<div id="walletSection" className={className + " overflow-hidden max-h-0 transition-all duration-500 ease-in-out px-4 bg-gray-50"}>
					<p className="text-2xl font-bold mt-2">$245.50</p>
					<button className="bg-red-600 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700">
						Withdraw
					</button>
					</div>
				</div>
			
				
				<div className="rounded-lg">
					<button className={ className + " border w-full flex justify-between items-center p-2 font-semibold bg-gray-100"} onClick={() => toggleAccordion('profileSection')}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
					</svg>
					Profile
					<span>+</span>
					</button>
					<div id="profileSection" className={ className + " overflow-hidden max-h-0 transition-all duration-500 ease-in-out px-4 bg-gray-50 dark:bg-gray-900"}>
					<table className="w-full border border-gray-300">
						<tbody>
							<tr>
								<td className="border border-gray-300 text-sm font-semibold px-3 py-2">Name:</td>
								<td className="border border-gray-300 text-sm px-3 py-2"><span id="userName">{userData.name} </span></td>
							</tr>
							<tr>
								<td className="border border-gray-300 text-sm font-semibold px-3 py-2">Email:</td>
								<td className="border border-gray-300 text-sm px-3 py-2"><span id="userEmail">{userData.email} </span></td>
							</tr>
							<tr>
								<td className="border border-gray-300 text-sm font-semibold px-3 py-2">Role:</td>
								<td className="border border-gray-300 text-sm px-3 py-2"><span id="userRole">{userData.role} </span></td>
							</tr>
						</tbody>
					</table>
					<button className="bg-red-600 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700">
						Update Profile
					</button>
					</div>
				</div>				  
			</div>
		</section>
	)
}

const ActionsSection: React.FC<ActionsSectionProps> = ({className=''}) => {
	return (
		<section className={className + " bg-white border rounded-xl shadow p-6 flex flex-col justify-between col-span-3 lg:col-span-1"}>
			<div>
				<h2 className="text-lg font-semibold">Actions</h2>							
			</div>
			<hr/><br/>
			<button className="bg-blue-600 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700" id="addProjectButton">Add Project</button>
		</section>
	)
}
export default Dashboard;