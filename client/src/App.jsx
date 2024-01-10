import { useEffect, useState } from "react";
import io from 'socket.io-client';

function App() {
  const [Messages, setMessages] = useState([]);

  const [message, setmessage] = useState('');


  useEffect(() => {
    const socket = io('http://localhost:3000');

    // Example: handling a socket event
    socket.on('chat message', (data) => {
      setMessages([...Messages, data])
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [Messages]);

  const handleSend = (e) => {
    e.preventDefault()
    const socket = io('http://localhost:3000');



    if (message) {
      socket.emit('chat message', message);
    }

    setmessage("")


  }


  return (
    <div className="min-h-screen relative">
      <h1 className="p-4">Messages</h1>

      <div className="p-4">
        {
          Messages?.map((item, i) => (
            <p key={i}>
              {item}
            </p>
          ))
        }
      </div>


      <form onSubmit={handleSend} className="fixed bottom-0 p-4 w-full flex z-50 ">
        <input onChange={(e) => setmessage(e.target.value)} value={message} type="text" className="bg-gray-300 w-full rounded-l p-2 font-medium" name="" id="" />
        <button className="text-lg font-medium rounded-r px-4 py-1.5 bg-gray-800 text-white">Send</button>
      </form>


    </div>
  )
}

export default App
