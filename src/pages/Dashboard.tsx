import React, { useEffect, useState } from "react";
import API_BASE from "../components/config";
import { dark_mode_init } from '../utils_tsx/darkmode';

interface DashboardProps {
  className?: string;
}

interface SystemMessage {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  type: string;
  status: string;
  severity: string;
}
interface DetailsAtGlanceProps {
  className?: string;
  userData: any;
}

const Dashboard: React.FC<DashboardProps> = ({ className = '' }) => {
  const [sysMessages, setSysMessages] = useState<SystemMessage[]>([]);

  const fetchData = async (url: string, method: string = "GET", body: any = null) => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      window.location.href = "/login";
      return;
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json();
    if (!res.ok) alert(data.message || "Data fetch failed.");
    return data;
  };

  const fetchUserData = async () => {
    if (!localStorage.getItem("user")) {
      const data = await fetchData(`${API_BASE}/dashboard`);
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      }
    }
  };

  const fetchMessages = async () => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData?.id) {
      const data = await fetchData(`${API_BASE}/messages/system/${userData.id}`);
      setSysMessages(data);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchMessages();
    dark_mode_init();
  }, []);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  if (!userData) return null;

  return (
	<main>
		<div className={`${className} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4 bg-gray-100`}>
			<NotificationSection className={`${className} col-span-3 lg:col-span-2`} sysMessages={sysMessages} />
			<DetailsAtGlanceSection className={`${className} col-span-3 lg:col-span-1`} userData={userData} />
			<ActionsSection className={`${className} col-span-3 lg:col-span-1`} />
		</div>
	</main>
  );
};

const NotificationSection: React.FC<{ className: string; sysMessages: SystemMessage[] }> = ({ className, sysMessages }) => {
  const switchTabs = (tabSeq: string) => {
    const systemTab = document.getElementById('systemTab');
    const userTab = document.getElementById('userTab');
    const systemMessages = document.getElementById('systemMessages');
    const userMessages = document.getElementById('userMessages');
    
    if (tabSeq === 'user_to_system') {
      systemMessages?.classList.remove('hidden');
      userMessages?.classList.add('hidden');
      systemTab?.classList.add('font-semibold', 'border-b-2', 'border-blue-600');
      userTab?.classList.remove('font-semibold', 'border-b-2', 'border-blue-600');
    } else if (tabSeq === 'system_to_user') {
      userMessages?.classList.remove('hidden');
      systemMessages?.classList.add('hidden');
      userTab?.classList.add('font-semibold', 'border-b-2', 'border-blue-600');
      systemTab?.classList.remove('font-semibold', 'border-b-2', 'border-blue-600');
    }
  };

  return (
    <section className={`${className} bg-white rounded-xl shadow p-6 col-span-3 lg:col-span-2 border border-gray-500`}>
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
      </div>

      <div className="flex border-b mb-4">
        <button id="systemTab" onClick={() => switchTabs('user_to_system')} className="px-4 py-2 text-sm bg-grey-800 font-semibold text-white-600 hover:text-blue-600 border-b-2 border-blue-600 focus:outline-none">
          System Messages
        </button>
        <button id="userTab" onClick={() => switchTabs('system_to_user')} className="px-4 py-2 text-sm text-white-600 hover:text-blue-600 focus:outline-none">
          User Messages
        </button>
      </div>

      <div id="systemMessages" className="space-y-2 text-sm">
        <ul className="list-disc list-inside">
          {sysMessages.map((msg) => (
            <li key={msg.id}>{msg.content}</li>
          ))}
        </ul>
      </div>

      <div id="userMessages" className="space-y-2 text-sm hidden">
        <ul className="list-disc list-inside">
          <li>Refreshing...</li>
        </ul>
      </div>
    </section>
  );
};

const DetailsAtGlanceSection: React.FC<DetailsAtGlanceProps> = ({ className, userData }) => {
  const toggleAccordion = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.classList.toggle('max-h-0');	
    section?.classList.toggle('max-h-screen');
  };

  return (
    <section className={`${className} bg-white border border-gray-500 rounded-xl shadow p-6 col-span-3 lg:col-span-1`}>
      <h2 className="text-lg font-semibold mb-4">Your details at a glance</h2>
      <hr />
      <div className="space-y-4">
        <div className="rounded-lg">
          <button className={`${className} border w-full flex justify-between items-center p-2 font-semibold bg-gray-100`} onClick={() => toggleAccordion('walletSection')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
            Wallet
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
          </button>
          <div id="walletSection" className={`${className} border overflow-hidden max-h-0 transition-all duration-500 ease-in-out px-4 bg-gray-50`}>
			<p className="text-2xl font-bold mt-2">$245.50</p>
			<button className="bg-red-500 text-white px-3 py-1 text-xs rounded-md mt-4">Withdraw</button>
			<div className="mt-4"></div>
		  </div>		    
        </div>

        <div className="rounded-lg">
          <button className={`${className} border w-full flex justify-between items-center p-2 font-semibold bg-gray-100`} onClick={() => toggleAccordion('accountSection')}>			            
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
			</svg>

			Account Info
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
          </button>
          <div id="accountSection" className={`${className} border overflow-hidden max-h-0 transition-all duration-500 ease-in-out px-4 bg-gray-50`}>
            <table className={`${className} w-full text-sm text-left text-gray-500`}>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Username
                  </th>
                  <td className="px-6 py-4">
                    {userData?.name}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Email
                  </th>
                  <td className="px-6 py-4">
                    {userData?.email}
                  </td>
                </tr>
              </tbody>
            </table>            
            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ActionsSection: React.FC<{ className: string }> = ({ className }) => (
  <section className={`${className} bg-white rounded-xl border border-gray-500 shadow p-6`}>
    <h2 className="text-lg font-semibold mb-4">Actions</h2>
    <div className="flex flex-col space-y-3">
      <button className="bg-blue-500 text-white p-3 rounded-xl">Upload Project</button>
      <button className="bg-green-500 text-white p-3 rounded-xl">View Assignments</button>
    </div>
  </section>
);

export default Dashboard;
