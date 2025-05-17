import React from 'react';
import { dark_mode_init } from './../utils_tsx/darkmode';
const About = () => {
	React.useEffect(() => {
		dark_mode_init();
	})
  return (
	<>
		<main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 text-justify darkm">
			<section className="max-w-5xl mx-auto px-6 py-16">
				<h1 className="text-4xl font-bold mb-6 text-center">About Let's Lance</h1>
				<p className="text-lg leading-relaxed text-center mb-10">
				Let’s Lance is a new-age freelancing platform that empowers independent professionals 
				and businesses to collaborate, grow, and thrive—without the clutter.
				</p>				

				<div className="bg-blue-50 border p-4 rounded-2xl shadow-md mb-14 darkm">
					<h2 className="text-3xl font-semibold mb-4 text-blue-800 darkm text-center">Our Unique Edge</h2>
					<p className="text-md leading-relaxed max-w-3xl mx-auto mb-4">
						Unlike traditional freelancing platforms, Let’s Lance doesn’t just connect freelancers and clients—we 
						nurture relationships. With our no-noise dashboard, reward-based payouts, and simplified onboarding, 
						we remove the chaos so that trust, quality, and creativity can thrive.
						Let’s Lance is built different — we believe everyone deserves a fair start, not just a chance.
					</p>
					<ul className="text-base leading-relaxed list-disc list-inside max-w-3xl mx-auto text-center md:text-left">
						<li>
						<strong>Guaranteed First Gig:</strong> Every new freelancer gets their first gig — no cold starts, no endless bidding.
						</li>
						<li>
						<strong>Verified Resume Booster:</strong> Get a certificate of completion you can proudly attach to your resume or LinkedIn profile.
						</li>
						<li>
						<strong>Welcome Bonus:</strong> Choose a one-time gift — either a cash reward or digital voucher — after your first project wraps up.
						</li>
						<li>
						<strong>Human-Centered Design:</strong> Clean dashboard, no-nonsense contracts, and transparent expectations for all.
						</li>
					</ul>
				</div>

				<div className="grid md:grid-cols-2 gap-10">
					<div className="bg-gray-100 darkm border p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
						<h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
						<p>
						We aim to simplify freelancing by offering a clean, flexible, and supportive space where 
						creators can focus on what they do best: delivering great work.
						</p>
					</div>					

					

					<div className="bg-gray-100 darkm border p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
						<h2 className="text-2xl font-semibold mb-3">Global Collaboration</h2>
						<p>
						Whether you're a solo developer, designer, or entrepreneur, Let's Lance connects talent 
						from around the world with opportunities that matter.
						</p>
					</div>

					<div className="bg-gray-100 darkm border p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
						<h2 className="text-2xl font-semibold mb-3">Transparent Workflows</h2>
						<p>
						No hidden fees. No unnecessary rules. Just clean workflows, milestone tracking, 
						and real communication—no middleman clutter.
						</p>
					</div>

					<div className="bg-gray-100 darkm border p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
						<h2 className="text-2xl font-semibold mb-3">For Freelancers & Clients</h2>
						<p>
						Let's Lance isn’t just for freelancers. It’s also for startups, agencies, and anyone 
						who needs smart talent without hiring headaches.
						</p>
					</div>
				</div>

				<div className="mt-16 text-center">
				<p className="text-md">
					Want to know more? <span className="underline decoration-dotted cursor-pointer hover:text-blue-500 transition">Contact us</span> or explore our <span className="underline decoration-dotted cursor-pointer hover:text-blue-500 transition">FAQs</span>.
				</p>
				</div>
			</section>
		</main>
	</>
  )
}

export default About