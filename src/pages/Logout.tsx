import API_BASE from "../components/config";

const Logout = () => {
	const access_token = localStorage.getItem("access_token");
	if (!access_token) {
		console.log("You are not logged in.");
		window.location.href = "/login"; // Redirect to login page
		return;
	}
	fetch(`${API_BASE}/logout`, {
		method: "GET",
		headers: { 
			"Content-Type": "application/json", 
			"Authorization": `Bearer ${access_token}` 
		}
	})
	.then(async (res) => {
		const data = await res.json();
		if (res.ok) {
			console.log(data.message);
			localStorage.removeItem("access_token");
			localStorage.removeItem("user");
			window.location.href = "/login"; // Redirect to login page
		} else {
			alert(data.message || "Logout failed.");
		}
	})
	.catch((err) => {
		console.error("Logout error:", err);
		//alert("Something went wrong.");
	});
	return (
		<div>
			<h1>Logging out...</h1>
		</div>
	);
}

export default Logout