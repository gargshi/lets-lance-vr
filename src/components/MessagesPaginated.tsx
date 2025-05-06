import React, { useEffect, useState } from 'react';
import API_BASE from '../components/config';

type Message = {
  id: number;
  sender: string;
  content: string;
  received_at: string;
};

const limit = 10;

const MessageList: React.FC = () => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetch(`${API_BASE}/messages/system/${userData.id}`)
      .then((res) => res.json())
      .then((data) => {
        setAllMessages(data);
      })
      .catch((err) => console.error('Error fetching messages:', err));
  }, []);

  const totalPages = Math.ceil(allMessages.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const reversedMessages = [...allMessages].reverse();  
  const currentMessages = reversedMessages.slice(startIndex, startIndex + limit);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>		
		<Paginator currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
		<div>        
			<table className="table-auto w-full border-collapse border border-gray-300">
				<thead>
					<tr>
						<th className="border border-gray-300 px-4 py-2">Sender</th>
						<th className="border border-gray-300 px-4 py-2">Content</th>
						<th className="border border-gray-300 px-4 py-2">Received At</th>
					</tr>
				</thead>
				<tbody>
					{currentMessages.map((msg) => (
						<tr key={msg.id}>						
							<td className="border border-gray-300 px-4 py-2">{msg.sender}</td>
							<td className="border border-gray-300 px-4 py-2">{msg.content}</td>
							<td className="border border-gray-300 px-4 py-2">{new Date(msg.received_at).toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>         
		</div>
		<Paginator currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  );
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
			<button onClick={handleNext} disabled={currentPage === totalPages} 
				className={`bg-green-500 text-white px-4 py-2 rounded ${currentPage === totalPages ? 'bg-red-600 opacity-50 cursor-not-allowed' :'' }`}>
			Next
			</button>
		</div>
	);
}


export default MessageList;
