import React from "react";
import API_BASE from "../components/config";
import Logout from "./Logout";
interface DashboardProps {
  className?: string;
  username?: string;
  email?: string;
}

const Dashboard: React.FC<DashboardProps> = ( { className = '' }) => {
	async function fetchUserData() {
		const access_token = localStorage.getItem("access_token");
		if (!access_token) {
			// alert("You are not logged in.");
			window.location.href = "/login"; // Redirect to login page
			return;
		}
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
	
	const userData = JSON.parse(localStorage.getItem("user") || "{}");
	if (!userData) {
		console.log("User data not found.");
		return;
	}


	return (
		<>
			<div className={ className + "flex flex-col items-center justify-center h-screen"}>
				<h1 className="text-3xl font-bold"> { userData.name } Dashboard </h1>
				<h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
				<p className="mt-2">This is where you can manage your account and settings.</p>
				<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Settings</button>
				<button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={Logout}>
					Logout
				</button>
			</div>
		</>
	)
}


export default Dashboard;