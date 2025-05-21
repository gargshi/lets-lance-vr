import React, { useEffect, useState } from 'react';
import API_BASE from '../components/config';

type Message = {
  id: number;
  sender: string;
  content: string;
  received_at: string;
  severity: string;
};

interface MessageListProps {
	className?: string;
	type?: string;
}
const limit = 10;

const MessageList: React.FC<MessageListProps> = ({type = 'system'}) => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetch(`${API_BASE}/messages/${type}/${userData.id}`)
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
  const sevClr: Record<string, string> = {
	'error': 'bg-red-400 border-red-900',
	'warning': 'bg-yellow-400 border-yellow-900',
	'normal': 'bg-blue-400 border-blue-900',
	'success': 'bg-green-400 border-green-900',
  }

  const sevClrBdr: Record<string, string> = {
	'error': 'hover:border-red-400',
	'warning': 'hover:border-yellow-400',
	'normal': 'hover:border-blue-400',
	'success': 'hover:border-green-400',
  }

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDelete = (id: number,type: string) => {
	fetch(`${API_BASE}/messages/${type}/delete/${id}`, {
	  method: 'DELETE',	  
	})
	  .then((res) => res.json())
	  .then(() => {
		setAllMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
	  })
	  .catch((err) => console.error('Error deleting message:', err));
  };

  return (
	<>		
		<div className={`flex items-center justify-center p-4 ${ allMessages.length === 0 ? '' : 'hidden' }`}>
			<h2>
				No messages to show yet.
			</h2>
		</div>
		<div className={`${ allMessages.length === 0 ? 'hidden' : '' }`}>		
			<Paginator currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
			<div>
				<div className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4`}>
					{currentMessages.map((msg) => (						
						<div
							className={`rounded-lg border border-gray-500 p-4 md:p-2 shadow-sm transition duration-300 ${sevClrBdr[msg.severity]} hover:border-1 cursor-default`}
							key={msg.id}
							>
							<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
								<div className="flex flex-col sm:flex-row sm:items-center gap-4">
									<div className='flex justify-between'>
										<p className="text-xs flex space-x-2">
											<span className={`border-4 p-1 w-1 h-1 rounded-xl ${sevClr[msg.severity]}`}></span>
											<span className="font-medium ">{msg.sender}</span>
										</p>
										<button
											className="text-red-800 hover:text-red-700 text-xs font-semibold px-1 py-1 rounded border border-red-500 hover:border-red-200 transition sm:hidden"
											onClick={() => handleDelete(msg.id, 'system')}
											title="Dismiss"
										>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
											</svg>
										</button>
									</div>
									<div className="text-sm">
										
										<p>{msg.content}</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<p className="text-xs ">{new Date(msg.received_at).toLocaleString()}</p>
									<button
											className={`text-red-500 hover:text-red-700 text-xs font-semibold px-1 py-1 rounded border border-red-500 hover:border-red-200 transition hidden sm:block`}
											onClick={() => handleDelete(msg.id, 'system')}
											title="Dismiss"
										>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
											</svg>
									</button>
								</div>
							</div>
						</div>						
					))}
				</div>				
			</div>
			<Paginator currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
		</div>
	</>
  );
};

const Paginator: React.FC<{ currentPage: number; totalPages: number; handlePrev: () => void; handleNext: () => void }> = ({ currentPage, totalPages, handlePrev, handleNext }) => {
  return (
	<div className="flex items-center justify-center p-4">
			<button onClick={handlePrev} disabled={currentPage === 1 && totalPages <= 1} 
				className={`bg-green-500 text-white px-2 py-2 rounded ${currentPage === 1 && totalPages <= 1 ? 'bg-red-600 opacity-50 cursor-not-allowed' :'' }`}>
			Previous
			</button>
			<span className="mx-4">
			Page {currentPage} of {totalPages}
			</span>
			<button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0} 
				className={`bg-green-500 text-white px-2 py-2 rounded ${currentPage === totalPages || totalPages === 0 ? 'bg-red-600 opacity-50 cursor-not-allowed' :'' }`}>
			Next
			</button>
		</div>
	);
}


export default MessageList;
