import React, { useEffect, useState } from 'react';
import { dark_mode_init } from '../utils_tsx/darkmode';
import { LobbyProject } from '../components/ProjectSection';
import API_BASE from "../components/config";

interface BidSectionProps {
	className?: string;
}

interface Bid {
	"id": number;
	"created_at": string;
	"created_by": string;
	"status": string;
	"amount": number;
	"project":LobbyProject | null; // Assuming project is of type LobbyProject	
}

const BidSection: React.FC<BidSectionProps> = ({ className }) => {
	const [isBidSectionOpen, setIsBidSectionOpen] = useState(false); // State to track modal reveal

	const [bids, setBids] = React.useState<Bid[]>([]);

	const fetchBids = async () => {
		const access_token = localStorage.getItem("access_token");
		if (!access_token) {
			window.location.href = "/login";
			return;
		}
		const res = await fetch(`${API_BASE}/bid/user`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${access_token}`			
			}
		});
		const data = await res.json();
		if (!res.ok) alert(data.message || "Data fetch failed.");
		if (data) {
			// console.log("Bids fetched:", data);
			setBids(data);
		}
	};


	useEffect(() => {
		dark_mode_init();
		fetchBids(); // Replace 1 with the actual project ID you want to fetch bids for
	}, []);

	return (
		<section className={`${className} project-section bg-white rounded-xl shadow p-6 border border-gray-500`}>
			<div className="flex items-center gap-4 mb-5" onClick={() => setIsBidSectionOpen(!isBidSectionOpen)}>
				<div className="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
					</svg>
					<h2 className="text-lg font-semibold">Bids Section</h2>
				</div>
			</div>
			{/* <div className={ `transition-all ease-in-out duration-300 overflow-y-scroll elegant-scrollbar ${isBidSectionOpen ? 'max-h-96' : `max-h-0`}` }>
				<ul className="list-disc list-inside">
					{bids.map((bid) => (
						<li key={bid.id} className="">
							<span className="font-semibold">Bid ID:</span> {bid.id} <br />
							<span className="font-semibold">Amount:</span> {bid.amount} <br />
							<span className="font-semibold">Created At:</span> {new Date(bid.created_at).toLocaleString()} <br />
							<span className="font-semibold">Created By:</span> {bid.created_by} <br />
							<span className="font-semibold">Project ID:</span> {bid.project?.project_id}
							{bid.project && (
								<>
									<br />
									<span className="font-semibold">Project Name:</span> {bid.project.title} <br />
									<span className="font-semibold">Project Description:</span> {bid.project.description}
								</>
							)}
						</li>
					))}
				</ul>
			</div> */}
			<div
				className={`transition-all ease-in-out duration-300 overflow-y-auto elegant-scrollbar px-4 ${
					isBidSectionOpen ? 'max-h-96' : 'max-h-0'
				}`}
				>
				<div className="space-y-4">
					{bids.map((bid) => (
					<div
						key={bid.id}
						className=" shadow-md rounded-2xl p-4 border border-gray-500"
					>
						<div className="text-sm darkm">
							<p>
								<span className="font-semibold darkm">Bid ID:</span> {bid.id}
							</p>
							<p>
								<span className="font-semibold darkm">Amount:</span> ${bid.amount}
							</p>
							<p>
								<span className="font-semibold  darkm">Created At:</span>{' '}
								{new Date(bid.created_at).toLocaleString()}
							</p>
							<p>
								<span className="font-semibold  darkm">Created By:</span> {bid.created_by}
							</p>
							<p>
								<span className="font-semibold darkm">Project ID:</span>{' '}
								{bid.project?.project_id || 'N/A'}
							</p>

						{bid.project && (
							<div className="mt-2 border-t pt-2">
							<p>
								<span className="font-semibold  darkm">Project Name:</span>{' '}
								{bid.project.title}
							</p>
							<p>
								<span className="font-semibold  darkm">Project Description:</span>{' '}
								{bid.project.description}
							</p>
							</div>
						)}
						</div>
					</div>
					))}
				</div>
			</div>

			<div onClick={() => setIsBidSectionOpen(!isBidSectionOpen)} className="flex cursor-pointer justify-center items-center gap-2">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
					className={`transition-all ease-in-out duration-300 w-6 h-6 ${!isBidSectionOpen ? 'rotate-180' : ''}`}>
				<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
				</svg>
			</div>
		</section>
	);
};

export default BidSection;