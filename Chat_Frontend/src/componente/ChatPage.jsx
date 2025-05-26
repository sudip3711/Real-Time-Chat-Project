// import React, { useEffect, useRef, useState } from "react";
// import { MdAttachFile, MdSend } from "react-icons/md";
// import SockJS from "sockjs-client";
// import { baseURL } from "../Services/AxiosHelper";
// import { Stomp } from "@stomp/stompjs";
// import toast from "react-hot-toast";
// import useChatContext from "../context/ChatContext";
// import { useNavigate } from "react-router";
// import { getMessagessApi } from "../Services/roomService";
// import {timeAgo} from "../Services/TimeHelper"

// function ChatPage() {
//   const { roomId, currentUser, connected,setconnected,setRoomId,setCurrentUser } = useChatContext();

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!connected) {
//       navigate("/");
//     }
//   }, [roomId, currentUser, connected]);

//   const [message, setMessange] = useState([]);

//   const [input, setInput] = useState("");
//   const inputRef = useRef(null);
//   const chatBoxRef = useRef(null);
//   const [stompClient, setStompClient] = useState(null);

//   //load the messages
//   useEffect(() => {
//     async function loadMessages() {
//       try {
//         const mess = await getMessagessApi(roomId);
//         setMessange(mess);
//         console.log(mess);
//       } catch (error) {}
//     }
//     if(connected){
//       loadMessages();
//     }
//   }, []);

//   //scroll message box afet insert new messages
//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scroll({
//         top: chatBoxRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [message]);

//   //stompClient inplement
//   useEffect(() => {
//     const connectWebSocket = () => {
//       //SockJS
//       const protocol = window.location.protocol === 'https:' ? 'https://' : 'http://';
//       // const sock = new SockJS(`${baseURL}/chat`);
//       const sock = new SockJS(`${protocol}${baseURL.replace(/^https?:\/\//, '')}/chat`);
//       const client = Stomp.over(sock);
//       client.connect({}, () => {
//         setStompClient(client);
//         toast.success("connected");
//         client.subscribe(`/topic/room/${roomId}`, (message) => {
//           console.log(message);
//           const newMessage = JSON.parse(message.body);
//           setMessange((preview) => [...preview, newMessage]);
//         });
//       });
//     };
//     if(connected){
//     connectWebSocket();
//     }
//   }, [roomId]);

//   //Send message
//   const sendMessange = async () => {
//     if (stompClient && connected && input.trim()) {
//       console.log(input);

//       const message = {
//         sender: currentUser,
//         content: input,
//         roomId: roomId,
//       };
//       stompClient.send(
//         `/app/sendMessage/${roomId}`,
//         {},
//         JSON.stringify(message)
//       );
//       setInput("");
//     }
//   };

//   function chatLoagout() {
//     stompClient.disconnect()
//     setconnected(false)
//     setRoomId("")
//     setCurrentUser("")
//     navigate("/");
    
//   }


//   return (
//     <div className="">
//       <header className="flex fixed w-full justify-around py-3 items-center dark:bg-gray-800">
//         <div>
//           <h1 className="text-xl font-semibold">
//             Room : <span>1234</span>
//           </h1>
//         </div>
//         <div>
//           <h1 className="text-xl font-semibold">
//             User : <span>{currentUser}</span>
//           </h1>
//         </div>
//         <div>
//           <button onClick={chatLoagout} className="dark:bg-red-600 dark:hover:bg-red-800 px-2 py-3 rounded-md">
//             Leave Room
//           </button>
//         </div>
//       </header>

//       <main
//         ref={chatBoxRef}
//         className="py-20 top-3 px-6 w-2/3 dark:bg-slate-500 h-screen mx-auto overflow-auto"
//       >
//         {message.map((message, index) => (
          
//           <div
//             key={index}
//             className={`flex items-center gap-1 ${
//               message.sender == currentUser ? "justify-end" : "justify-start "
//             }`}
//           >
//             {message.sender !== currentUser && (
//               <img
//                 className="w-8 h-8 rounded-full self-end"
//                 src="https://avatar.iran.liara.run/public/boy"
//                 alt="Avatar"
//               />
//             )}

//             <div
//               className={` my-2 p-2 max-w-xs ${
//                 message.sender == currentUser
//                   ? "bg-green-800  rounded-l-2xl rounded-t-3xl"
//                   : "bg-gray-700  rounded-r-3xl rounded-t-3xl"
//               }  `}
//             >
//               <div className="flex flex-row gap-2 ">
//                 <div className="flex flex-col gap-2">
//                   <p className="text-xs font-bold">{message.sender}</p>
//                   <p className="text-sm">{message.content}</p>
//                 </div>
//               </div>




//               <p className="text-xs text-gray-400">{timeAgo(message.timeStamp)}</p>
//             </div>
//             {message.sender === currentUser && (
//               <img
//                 className="w-8 h-8 rounded-full self-end"
//                 src="https://avatar.iran.liara.run/public/boy"
//                 alt="Avatar"
//               />
//             )}
//           </div>
//         ))}
//       </main>

//       <div className="fixed bottom-2 w-full h-16">
//         <div className="h-full pr-10 gap-3 flex justify-between items-center  w-1/2 mx-auto dark:bg-gray-800 rounded-full">
//           <input
//             value={input}
//             onChange={(e) => {
//               setInput(e.target.value);
//             }}
//             onKeyDown={(e)=>{
//               if(e.key==="Enter"){
//                 sendMessange()
//               }
                
//             }}
//             type="text"
//             placeholder="Type your message ...."
//             name=""
//             id=""
//             className="dark:bg-gray-700 px-3 py-2 h-full w-full rounded-full focus:outline-none"
//           />

//           <div className="flex gap-3">
//             <button className="dark:bg-purple-600 h-12 w-12 rounded-full flex justify-center items-center ">
//               <MdAttachFile size={25} />
//             </button>

//             <button
//               onClick={sendMessange}
//               className="dark:bg-green-600 h-12 w-12 rounded-full flex justify-center items-center "
//             >
//               <MdSend size={25} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;



// 2222



// import React, { useEffect, useRef, useState } from "react";
// import { MdAttachFile, MdSend, MdExitToApp, MdPerson, MdGroup } from "react-icons/md";
// import SockJS from "sockjs-client";
// import { baseURL } from "../Services/AxiosHelper";
// import { Stomp } from "@stomp/stompjs";
// import toast from "react-hot-toast";
// import useChatContext from "../context/ChatContext";
// import { useNavigate } from "react-router";
// import { getMessagessApi } from "../Services/roomService";
// import { timeAgo } from "../Services/TimeHelper";

// function ChatPage() {
//   const { roomId, currentUser, connected, setconnected, setRoomId, setCurrentUser } = useChatContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!connected) {
//       navigate("/");
//     }
//   }, [roomId, currentUser, connected]);

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const inputRef = useRef(null);
//   const chatBoxRef = useRef(null);
//   const [stompClient, setStompClient] = useState(null);
//   const [isTyping, setIsTyping] = useState(false);

//   // Load the messages
//   useEffect(() => {
//     async function loadMessages() {
//       try {
//         const mess = await getMessagessApi(roomId);
//         setMessages(mess);
//       } catch (error) {
//         console.error("Error loading messages:", error);
//       }
//     }
//     if (connected) {
//       loadMessages();
//     }
//   }, [connected, roomId]);

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTo({
//         top: chatBoxRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);

//   // WebSocket connection
//   useEffect(() => {
//     const connectWebSocket = () => {
//       const protocol = window.location.protocol === 'https:' ? 'https://' : 'http://';
//       const sock = new SockJS(`${protocol}${baseURL.replace(/^https?:\/\//, '')}/chat`);
//       const client = Stomp.over(sock);
      
//       client.connect({}, () => {
//         setStompClient(client);
//         toast.success("Connected to chat");
        
//         client.subscribe(`/topic/room/${roomId}`, (message) => {
//           const newMessage = JSON.parse(message.body);
//           setMessages((prev) => [...prev, newMessage]);
//         });
//       });
      
//       return () => {
//         if (client && client.connected) {
//           client.disconnect();
//         }
//       };
//     };
    
//     if (connected) {
//       connectWebSocket();
//     }
//   }, [roomId, connected]);

//   // Send message
//   const sendMessage = async () => {
//     if (stompClient && connected && input.trim()) {
//       const message = {
//         sender: currentUser,
//         content: input,
//         roomId: roomId,
//       };
//       stompClient.send(
//         `/app/sendMessage/${roomId}`,
//         {},
//         JSON.stringify(message)
//       );
//       setInput("");
//       setIsTyping(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     setIsTyping(e.target.value.length > 0);
//   };

//   function chatLogout() {
//     if (stompClient && stompClient.connected) {
//       stompClient.disconnect();
//     }
//     setconnected(false);
//     setRoomId("");
//     setCurrentUser("");
//     navigate("/");
//   }

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Header */}
//       <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md z-10">
//         <div className="flex items-center space-x-4">
//           <MdGroup className="text-2xl text-indigo-600 dark:text-indigo-400" />
//           <div>
//             <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//               Room: <span className="font-normal">{roomId}</span>
//             </h1>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               {messages.length} messages
//             </p>
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <MdPerson className="text-indigo-600 dark:text-indigo-400" />
//             <span className="text-gray-800 dark:text-gray-200">{currentUser}</span>
//           </div>
          
//           <button 
//             onClick={chatLogout}
//             className="flex items-center space-x-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
//           >
//             <MdExitToApp />
//             <span>Leave</span>
//           </button>
//         </div>
//       </header>

//       {/* Chat Area */}
//       <main
//         ref={chatBoxRef}
//         className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700"
//       >
//         <div className="max-w-3xl mx-auto space-y-4">
//           {messages.length === 0 ? (
//             <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//               No messages yet. Start the conversation!
//             </div>
//           ) : (
//             messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`flex max-w-xs lg:max-w-md ${message.sender === currentUser ? "flex-row-reverse" : ""}`}
//                 >
//                   {message.sender !== currentUser && (
//                     <div className="flex-shrink-0 mr-2 self-end">
//                       <img
//                         className="w-8 h-8 rounded-full"
//                         src={`https://avatar.iran.liara.run/username?username=${message.sender}`}
//                         alt={message.sender}
//                       />
//                     </div>
//                   )}
                  
//                   <div
//                     className={`p-3 rounded-2xl ${message.sender === currentUser 
//                       ? "bg-indigo-500 text-white rounded-tr-none" 
//                       : "bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-tl-none"}`}
//                   >
//                     {message.sender !== currentUser && (
//                       <div className="font-bold text-xs mb-1">
//                         {message.sender}
//                       </div>
//                     )}
//                     <div className="text-sm">{message.content}</div>
//                     <div 
//                       className={`text-xs mt-1 ${message.sender === currentUser 
//                         ? "text-indigo-200" 
//                         : "text-gray-500 dark:text-gray-400"}`}
//                     >
//                       {timeAgo(message.timeStamp)}
//                     </div>
//                   </div>
                  
//                   {message.sender === currentUser && (
//                     <div className="flex-shrink-0 ml-2 self-end">
//                       <img
//                         className="w-8 h-8 rounded-full"
//                         src={`https://avatar.iran.liara.run/username?username=${message.sender}`}
//                         alt={message.sender}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </main>

//       {/* Input Area */}
//       <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
//         <div className="max-w-3xl mx-auto flex items-center space-x-2">
//           <button 
//             className="p-2 rounded-full text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
//             aria-label="Attach file"
//           >
//             <MdAttachFile size={24} />
//           </button>
          
//           <div className="flex-1 relative">
//             <input
//               ref={inputRef}
//               value={input}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyDown}
//               type="text"
//               placeholder="Type your message..."
//               className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-800 dark:text-gray-200"
//             />
//             {isTyping && (
//               <span className="absolute right-3 top-3 text-xs text-gray-500 dark:text-gray-400">
//                 Press Enter to send
//               </span>
//             )}
//           </div>
          
//           <button
//             onClick={sendMessage}
//             disabled={!input.trim()}
//             className={`p-3 rounded-full ${input.trim() 
//               ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
//               : "bg-gray-200 dark:bg-gray-700 text-gray-400"} transition-colors duration-200`}
//             aria-label="Send message"
//           >
//             <MdSend size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;


// 3333

// import React, { useEffect, useRef, useState } from "react";
// import { 
//   MdSend, 
//   MdOutlineAttachFile, 
//   MdOutlineExitToApp,
//   MdOutlinePerson,
//   MdOutlineGroup,
//   MdOutlineEmojiEmotions,
//   MdOutlineGif,
//   MdOutlineMic,
//   MdMoreVert
// } from "react-icons/md";
// import { FiSearch } from "react-icons/fi";
// import SockJS from "sockjs-client";
// import { baseURL } from "../Services/AxiosHelper";
// import { Stomp } from "@stomp/stompjs";
// import toast from "react-hot-toast";
// import useChatContext from "../context/ChatContext";
// import { useNavigate } from "react-router";
// import { getMessagessApi } from "../Services/roomService";
// import { timeAgo } from "../Services/TimeHelper";

// function ChatPage() {
//   const { roomId, currentUser, connected, setconnected, setRoomId, setCurrentUser } = useChatContext();
//   const navigate = useNavigate();

//   // State management
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [activeTab, setActiveTab] = useState("chat");
//   const chatBoxRef = useRef(null);
//   const inputRef = useRef(null);
//   const [stompClient, setStompClient] = useState(null);

//   // Responsive breakpoints
//   const isMobile = window.innerWidth < 768;

//   // Check connection status
//   useEffect(() => {
//     if (!connected) {
//       navigate("/");
//     }
//   }, [connected, navigate]);

//   // Load messages
//   useEffect(() => {
//     async function loadMessages() {
//       try {
//         const mess = await getMessagessApi(roomId);
//         setMessages(mess);
//       } catch (error) {
//         console.error("Error loading messages:", error);
//       }
//     }
//     if (connected) {
//       loadMessages();
//     }
//   }, [connected, roomId]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTo({
//         top: chatBoxRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);

//   // WebSocket connection
//   useEffect(() => {
//     const connectWebSocket = () => {
//       const protocol = window.location.protocol === 'https:' ? 'https://' : 'http://';
//       const sock = new SockJS(`${protocol}${baseURL.replace(/^https?:\/\//, '')}/chat`);
//       const client = Stomp.over(sock);
      
//       client.connect({}, () => {
//         setStompClient(client);
//         toast.success("Connected to chat");
        
//         client.subscribe(`/topic/room/${roomId}`, (message) => {
//           const newMessage = JSON.parse(message.body);
//           setMessages((prev) => [...prev, newMessage]);
//         });
//       });
      
//       return () => {
//         if (client && client.connected) {
//           client.disconnect();
//         }
//       };
//     };
    
//     if (connected) {
//       connectWebSocket();
//     }
//   }, [roomId, connected]);

//   // Send message
//   const sendMessage = async () => {
//     if (stompClient && connected && input.trim()) {
//       const message = {
//         sender: currentUser,
//         content: input,
//         roomId: roomId,
//       };
//       stompClient.send(
//         `/app/sendMessage/${roomId}`,
//         {},
//         JSON.stringify(message)
//       );
//       setInput("");
//       setIsTyping(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     setIsTyping(e.target.value.length > 0);
//   };

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   const chatLogout = () => {
//     if (stompClient && stompClient.connected) {
//       stompClient.disconnect();
//     }
//     setconnected(false);
//     setRoomId("");
//     setCurrentUser("");
//     navigate("/");
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
//       {/* Sidebar (hidden on mobile by default) */}
//       <div className={`${showSidebar ? 'flex' : 'hidden'} md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
//         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold">Chat Rooms</h2>
//             <button 
//               onClick={toggleSidebar}
//               className="md:hidden p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               <MdMoreVert size={20} />
//             </button>
//           </div>
//           <div className="mt-4 relative">
//             <input
//               type="text"
//               placeholder="Search messages..."
//               className="w-full pl-8 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <FiSearch className="absolute left-3 top-3 text-gray-400" />
//           </div>
//         </div>
        
//         <div className="flex-1 overflow-y-auto p-2">
//           {/* Room list would go here */}
//           <div className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
//                 <MdOutlineGroup size={20} className="text-indigo-600 dark:text-indigo-400" />
//               </div>
//               <div>
//                 <h3 className="font-medium">Room {roomId}</h3>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Active now</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//           <div className="flex items-center">
//             <img
//               className="w-10 h-10 rounded-full mr-3"
//               src={`https://avatar.iran.liara.run/username?username=${currentUser}`}
//               alt={currentUser}
//             />
//             <div>
//               <h3 className="font-medium">{currentUser}</h3>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center">
//             <button 
//               onClick={toggleSidebar}
//               className="md:hidden mr-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               <MdMoreVert size={20} />
//             </button>
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
//                 <MdOutlineGroup size={20} className="text-indigo-600 dark:text-indigo-400" />
//               </div>
//               <div>
//                 <h1 className="font-semibold">Room {roomId}</h1>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {messages.length} messages • {messages.length > 0 ? timeAgo(messages[messages.length-1].timeStamp) : 'No messages yet'}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//               <FiSearch size={18} />
//             </button>
//             <button 
//               onClick={chatLogout}
//               className="flex items-center space-x-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm"
//             >
//               <MdOutlineExitToApp size={18} />
//               <span className="hidden sm:inline">Leave</span>
//             </button>
//           </div>
//         </header>

//         {/* Chat Messages */}
//         <main
//           ref={chatBoxRef}
//           className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700/50"
//         >
//           <div className="max-w-3xl mx-auto space-y-3">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-center py-10 text-gray-500 dark:text-gray-400">
//                 <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
//                   <MdOutlineGroup size={32} className="text-indigo-500 dark:text-indigo-400" />
//                 </div>
//                 <h3 className="text-lg font-medium mb-1">No messages yet</h3>
//                 <p className="max-w-xs">Start the conversation by sending your first message!</p>
//               </div>
//             ) : (
//               messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`flex max-w-xs lg:max-w-md ${message.sender === currentUser ? "flex-row-reverse" : ""}`}
//                   >
//                     {message.sender !== currentUser && (
//                       <div className="flex-shrink-0 mr-2 self-end">
//                         <img
//                           className="w-8 h-8 rounded-full"
//                           src={`https://avatar.iran.liara.run/username?username=${message.sender}`}
//                           alt={message.sender}
//                         />
//                       </div>
//                     )}
                    
//                     <div
//                       className={`p-3 rounded-2xl ${message.sender === currentUser 
//                         ? "bg-indigo-500 text-white rounded-br-none" 
//                         : "bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-bl-none"}`}
//                     >
//                       {message.sender !== currentUser && (
//                         <div className="font-bold text-xs mb-1">
//                           {message.sender}
//                         </div>
//                       )}
//                       <div className="text-sm">{message.content}</div>
//                       <div 
//                         className={`text-xs mt-1 flex justify-end ${message.sender === currentUser 
//                           ? "text-indigo-200" 
//                           : "text-gray-500 dark:text-gray-400"}`}
//                       >
//                         {timeAgo(message.timeStamp)}
//                       </div>
//                     </div>
                    
//                     {message.sender === currentUser && (
//                       <div className="flex-shrink-0 ml-2 self-end">
//                         <img
//                           className="w-8 h-8 rounded-full"
//                           src={`https://avatar.iran.liara.run/username?username=${message.sender}`}
//                           alt={message.sender}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </main>

//         {/* Input Area */}
//         <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
//           <div className="max-w-3xl mx-auto">
//             {isTyping && (
//               <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 ml-2">
//                 Press Enter to send, Shift+Enter for new line
//               </div>
//             )}
//             <div className="flex items-center space-x-2">
//               <div className="flex space-x-1">
//                 <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
//                   <MdOutlineEmojiEmotions size={20} />
//                 </button>
//                 <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
//                   <MdOutlineGif size={20} />
//                 </button>
//                 <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
//                   <MdOutlineAttachFile size={20} />
//                 </button>
//               </div>
              
//               <div className="flex-1 relative">
//                 <input
//                   ref={inputRef}
//                   value={input}
//                   onChange={handleInputChange}
//                   onKeyDown={handleKeyDown}
//                   type="text"
//                   placeholder="Type your message..."
//                   className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-800 dark:text-gray-200"
//                 />
//               </div>
              
//               <button
//                 onClick={sendMessage}
//                 disabled={!input.trim()}
//                 className={`p-3 rounded-full ${input.trim() 
//                   ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"} transition-colors duration-200`}
//               >
//                 {input.trim() ? <MdSend size={20} /> : <MdOutlineMic size={20} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;


// 444444

// import React, { useEffect, useRef, useState } from "react";
// import {
//   MdSend,
//   MdOutlineExitToApp,
//   MdOutlineGroup,
//   MdOutlineEmojiEmotions,
//   MdOutlineGif,
//   MdMoreVert
// } from "react-icons/md";
// import { FiSearch } from "react-icons/fi";
// import EmojiPicker from "emoji-picker-react";
// import GifPicker from "gif-picker-react";
// import SockJS from "sockjs-client";
// import { baseURL } from "../Services/AxiosHelper";
// import { Stomp } from "@stomp/stompjs";
// import toast from "react-hot-toast";
// import useChatContext from "../context/ChatContext";
// import { useNavigate } from "react-router";
// import { getMessagessApi } from "../Services/roomService";

// function formatMessageTime(timestamp) {
//   if (!timestamp) return "Just now";
//   const messageTime = typeof timestamp === "number"
//     ? new Date(timestamp)
//     : new Date(parseInt(timestamp));
//   if (isNaN(messageTime) || messageTime > new Date()) return "Just now";
//   const now = new Date();
//   const diffMs = now - messageTime;
//   const diffSec = Math.floor(diffMs / 1000);
//   if (diffSec < 0) return "Just now";
//   if (diffSec < 60) return "Just now";
//   if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
//   if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
//   const options = { month: "short", day: "numeric" };
//   return messageTime.toLocaleDateString(undefined, options);
// }

// function ChatPage() {
//   const { roomId, currentUser, connected, setconnected, setRoomId, setCurrentUser } = useChatContext();
//   const navigate = useNavigate();

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showGifPicker, setShowGifPicker] = useState(false);
//   const chatBoxRef = useRef(null);
//   const inputRef = useRef(null);
//   const pickerRef = useRef(null);
//   const [stompClient, setStompClient] = useState(null);

//   useEffect(() => {
//     if (!connected) navigate("/");
//   }, [connected, navigate]);

//   useEffect(() => {
//     async function loadMessages() {
//       try {
//         const mess = await getMessagessApi(roomId);
//         setMessages(mess);
//       } catch (error) {
//         console.error("Error loading messages:", error);
//       }
//     }
//     if (connected) loadMessages();
//   }, [connected, roomId]);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTo({
//         top: chatBoxRef.current.scrollHeight,
//         behavior: "smooth"
//       });
//     }
//   }, [messages]);

//   useEffect(() => {
//     const connectWebSocket = () => {
//       const protocol = window.location.protocol === "https:" ? "https://" : "http://";
//       const sock = new SockJS(`${protocol}${baseURL.replace(/^https?:\/\//, "")}/chat`);
//       const client = Stomp.over(sock);
//       client.connect({}, () => {
//         setStompClient(client);
//         toast.success("Connected to chat");
//         client.subscribe(`/topic/room/${roomId}`, (message) => {
//           const newMessage = JSON.parse(message.body);
//           setMessages((prev) => [...prev, newMessage]);
//         });
//       });
//       return () => {
//         if (client && client.connected) client.disconnect();
//       };
//     };
//     if (connected) connectWebSocket();
//   }, [roomId, connected]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (pickerRef.current && !pickerRef.current.contains(event.target)) {
//         setShowEmojiPicker(false);
//         setShowGifPicker(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const sendMessage = async () => {
//     if (stompClient && connected && input.trim()) {
//       const message = {
//         sender: currentUser,
//         content: input,
//         roomId: roomId
//       };
//       stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
//       setInput("");
//       setIsTyping(false);
//     }
//   };

//   const sendGifMessage = (gif) => {
//     if (stompClient && connected) {
//       const message = {
//         sender: currentUser,
//         content: gif.url,
//         roomId: roomId,
//         isGif: true
//       };
//       stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
//       setShowGifPicker(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     setIsTyping(e.target.value.length > 0);
//   };

//   const toggleSidebar = () => setShowSidebar(!showSidebar);

//   const chatLogout = () => {
//     if (stompClient && stompClient.connected) stompClient.disconnect();
//     setconnected(false);
//     setRoomId("");
//     setCurrentUser("");
//     navigate("/");
//   };

//   const onEmojiClick = (emojiData) => {
//     setInput((prev) => prev + emojiData.emoji);
//     setShowEmojiPicker(false);
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 overflow-hidden">
//       {/* Sidebar */}
//       <div className={`${showSidebar ? "flex" : "hidden"} md:flex flex-col w-72 bg-white/80 dark:bg-gray-800/80 border-r border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-md`}>
//         <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-2xl">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold tracking-wide">Chat Rooms</h2>
//             <button onClick={toggleSidebar} className="md:hidden p-1 rounded-full hover:bg-white/20">
//               <MdMoreVert size={20} />
//             </button>
//           </div>
//           <div className="mt-4 relative">
//             <input
//               type="text"
//               placeholder="Search messages..."
//               className="w-full pl-8 pr-4 py-2 bg-white/30 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
//             />
//             <FiSearch className="absolute left-3 top-3 text-white/70" />
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-2">
//           <div className="p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer transition-all duration-200">
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mr-3 shadow-md">
//                 <MdOutlineGroup size={20} className="text-white" />
//               </div>
//               <div>
//                 <h3 className="font-medium">Room {roomId}</h3>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Active now</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
//           <div className="flex items-center">
//             <div className="relative">
//               <img
//                 className="w-10 h-10 rounded-full mr-3 border-2 border-indigo-500 p-0.5"
//                 src={`https://avatar.iran.liara.run/username?username=${currentUser}`}
//                 alt={currentUser}
//               />
//               <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
//             </div>
//             <div>
//               <h3 className="font-medium">{currentUser}</h3>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/90 border-b border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-md">
//           <div className="flex items-center">
//             <button onClick={toggleSidebar} className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//               <MdMoreVert size={20} />
//             </button>
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mr-3 shadow-md">
//                 <MdOutlineGroup size={20} className="text-white" />
//               </div>
//               <div>
//                 <h1 className="font-bold tracking-wide">Room {roomId}</h1>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {messages.length} messages • {messages.length > 0 ? formatMessageTime(messages[messages.length - 1].timeStamp) : "No messages yet"}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//               <FiSearch size={18} />
//             </button>
//             <button
//               onClick={chatLogout}
//               className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 text-sm shadow-sm"
//             >
//               <MdOutlineExitToApp size={18} />
//               <span className="hidden sm:inline">Leave</span>
//             </button>
//           </div>
//         </header>

//         {/* Chat Messages */}
//         <main ref={chatBoxRef} className="flex-1 overflow-y-auto p-6 bg-white/60 dark:bg-gray-900/60 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
//           <div className="max-w-3xl mx-auto space-y-4">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-center py-10 text-gray-500 dark:text-gray-400">
//                 <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
//                   <MdOutlineGroup size={40} className="text-white" />
//                 </div>
//                 <h3 className="text-xl font-medium mb-2">No messages yet</h3>
//                 <p className="max-w-xs">Start the conversation by sending your first message!</p>
//               </div>
//             ) : (
//               messages.map((message, index) => (
//                 <div key={index} className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}>
//                   <div className={`flex max-w-xs lg:max-w-md ${message.sender === currentUser ? "flex-row-reverse" : ""}`}>
//                     {message.sender !== currentUser && (
//                       <div className="flex-shrink-0 mr-2 self-end">
//                         <img
//                           className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900 p-0.5"
//                           src={`https://avatar.iran.liara.run/username?username=${message.sender}`}
//                           alt={message.sender}
//                         />
//                       </div>
//                     )}
//                     <div className={`p-4 rounded-2xl shadow-md ${message.sender === currentUser
//                         ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
//                         : "bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 rounded-bl-none"
//                       }`}>
//                       {message.sender !== currentUser && (
//                         <div className="font-bold text-xs mb-1">{message.sender}</div>
//                       )}
//                       <div className="text-base">
//                         {message.isGif ? (
//                           <img src={message.content} alt="gif" className="rounded-lg max-w-xs" />
//                         ) : (
//                           message.content
//                         )}
//                       </div>
//                       <div className={`text-xs mt-2 flex justify-end ${message.sender === currentUser
//                           ? "text-indigo-100"
//                           : "text-gray-500 dark:text-gray-400"
//                         }`}>
//                         {formatMessageTime(message.timeStamp)}
//                       </div>
//                     </div>
//                     {message.sender === currentUser && (
//                       <div className="flex-shrink-0 ml-2 self-end">
//                         <img
//                           className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900 p-0.5"
//                           src={`https://avatar.iran.liara.run/username?username=${message.sender}`}
//                           alt={message.sender}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </main>

//         {/* Input Area */}
//         <div className="p-5 bg-white/90 dark:bg-gray-800/90 border-t border-gray-200 dark:border-gray-700 shadow-lg relative">
//           {/* Emoji Picker */}
//           {showEmojiPicker && (
//             <div ref={pickerRef} className="absolute bottom-20 left-8 z-20">
//               <EmojiPicker onEmojiClick={onEmojiClick} theme="auto" />
//             </div>
//           )}
//           {/* GIF Picker */}
//           {showGifPicker && (
//             <div ref={pickerRef} className="absolute bottom-20 left-24 z-20">
//               <GifPicker tenorApiKey="YOUR_TENOR_API_KEY" onGifClick={sendGifMessage} />
//             </div>
//           )}
//           <div className="max-w-3xl mx-auto">
//             {isTyping && (
//               <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 ml-2">
//                 Press Enter to send, Shift+Enter for new line
//               </div>
//             )}
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => {
//                   setShowEmojiPicker(!showEmojiPicker);
//                   setShowGifPicker(false);
//                 }}
//                 className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all duration-200"
//                 title="Emoji"
//               >
//                 <MdOutlineEmojiEmotions size={22} />
//               </button>
//               <button
//                 onClick={() => {
//                   setShowGifPicker(!showGifPicker);
//                   setShowEmojiPicker(false);
//                 }}
//                 className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all duration-200"
//                 title="GIF"
//               >
//                 <MdOutlineGif size={22} />
//               </button>
//               <div className="flex-1 relative">
//                 <input
//                   ref={inputRef}
//                   value={input}
//                   onChange={handleInputChange}
//                   onKeyDown={handleKeyDown}
//                   type="text"
//                   placeholder="Type your message..."
//                   className="w-full py-3 px-5 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-800 dark:text-gray-200 shadow-inner text-base"
//                 />
//               </div>
//               <button
//                 onClick={sendMessage}
//                 disabled={!input.trim()}
//                 className={`p-3 rounded-full shadow-md transition-all duration-200 ${input.trim()
//                   ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
//                   }`}
//                 title="Send"
//               >
//                 <MdSend size={22} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;


// 5555*******


// import React, { useEffect, useRef, useState } from "react";
// import {
//   MdSend,
//   MdOutlineExitToApp,
//   MdOutlineGroup,
//   MdOutlineEmojiEmotions,
//   MdOutlineGif,
//   MdMoreVert
// } from "react-icons/md";
// import { FiSearch } from "react-icons/fi";
// import EmojiPicker from "emoji-picker-react";
// import GifPicker from "gif-picker-react";
// import SockJS from "sockjs-client";
// import { baseURL } from "../Services/AxiosHelper";
// import { Stomp } from "@stomp/stompjs";
// import toast from "react-hot-toast";
// import useChatContext from "../context/ChatContext";
// import { useNavigate } from "react-router";
// import { getMessagessApi } from "../Services/roomService";

// // Modern readable time
// function formatMessageTime(timestamp) {
//   if (!timestamp) return "Just now";
//   const messageTime = typeof timestamp === "number"
//     ? new Date(timestamp)
//     : new Date(parseInt(timestamp));
//   if (isNaN(messageTime) || messageTime > new Date()) return "Just now";
//   const now = new Date();
//   const diffMs = now - messageTime;
//   const diffSec = Math.floor(diffMs / 1000);
//   if (diffSec < 0) return "Just now";
//   if (diffSec < 60) return "Just now";
//   if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
//   if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hr ago`;
//   return messageTime.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
// }

// function ChatPage() {
//   const { roomId, currentUser, connected, setconnected, setRoomId, setCurrentUser } = useChatContext();
//   const navigate = useNavigate();

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showGifPicker, setShowGifPicker] = useState(false);
//   const chatBoxRef = useRef(null);
//   const inputRef = useRef(null);
//   const pickerRef = useRef(null);
//   const [stompClient, setStompClient] = useState(null);

//   useEffect(() => {
//     if (!connected) navigate("/");
//   }, [connected, navigate]);

//   useEffect(() => {
//     async function loadMessages() {
//       try {
//         const mess = await getMessagessApi(roomId);
//         setMessages(mess);
//       } catch (error) {
//         console.error("Error loading messages:", error);
//       }
//     }
//     if (connected) loadMessages();
//   }, [connected, roomId]);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTo({
//         top: chatBoxRef.current.scrollHeight,
//         behavior: "smooth"
//       });
//     }
//   }, [messages]);

//   useEffect(() => {
//     const connectWebSocket = () => {
//       const protocol = window.location.protocol === "https:" ? "https://" : "http://";
//       const sock = new SockJS(`${protocol}${baseURL.replace(/^https?:\/\//, "")}/chat`);
//       const client = Stomp.over(sock);
//       client.connect({}, () => {
//         setStompClient(client);
//         toast.success("Connected to chat");
//         client.subscribe(`/topic/room/${roomId}`, (message) => {
//           const newMessage = JSON.parse(message.body);
//           setMessages((prev) => [...prev, newMessage]);
//         });
//       });
//       return () => {
//         if (client && client.connected) client.disconnect();
//       };
//     };
//     if (connected) connectWebSocket();
//   }, [roomId, connected]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (pickerRef.current && !pickerRef.current.contains(event.target)) {
//         setShowEmojiPicker(false);
//         setShowGifPicker(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const sendMessage = async () => {
//     if (stompClient && connected && input.trim()) {
//       const message = {
//         sender: currentUser,
//         content: input,
//         roomId: roomId
//       };
//       stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
//       setInput("");
//       setIsTyping(false);
//     }
//   };

//   const sendGifMessage = (gif) => {
//     if (stompClient && connected) {
//       const message = {
//         sender: currentUser,
//         content: gif.url,
//         roomId: roomId,
//         isGif: true
//       };
//       stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
//       setShowGifPicker(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     setIsTyping(e.target.value.length > 0);
//   };

//   const toggleSidebar = () => setShowSidebar(!showSidebar);

//   const chatLogout = () => {
//     if (stompClient && stompClient.connected) stompClient.disconnect();
//     setconnected(false);
//     setRoomId("");
//     setCurrentUser("");
//     navigate("/");
//   };

//   const onEmojiClick = (emojiData) => {
//     setInput((prev) => prev + emojiData.emoji);
//     setShowEmojiPicker(false);
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-indigo-200 via-white to-purple-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 overflow-hidden">
//       {/* Sidebar */}
//       <div className={`${showSidebar ? "flex" : "hidden"} md:flex flex-col w-72 bg-white/80 dark:bg-gray-800/80 border-r border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-md`}>
//         <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-2xl">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold tracking-wide">Chat Room</h2>
//             <button onClick={toggleSidebar} className="md:hidden p-1 rounded-full hover:bg-white/20">
//               <MdMoreVert size={20} />
//             </button>
//           </div>
//           <div className="mt-4 relative">
//             <input
//               type="text"
//               placeholder="Search messages..."
//               className="w-full pl-8 pr-4 py-2 bg-white/30 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
//             />
//             <FiSearch className="absolute left-3 top-3 text-white/70" />
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-2">
//           <div className="p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer transition-all duration-200">
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mr-3 shadow-md">
//                 <MdOutlineGroup size={20} className="text-white" />
//               </div>
//               <div>
//                 <h3 className="font-medium">Room {roomId}</h3>
//                 <p className="text-xs text-gray-100/80 dark:text-gray-300/80">Active now</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
//           <div className="flex items-center">
//             <div className="relative">
//               <img
//                 className="w-10 h-10 rounded-full mr-3 border-2 border-indigo-500 p-0.5"
//                 src={`https://avatar.iran.liara.run/username?username=${currentUser}`}
//                 alt={currentUser}
//               />
//               <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
//             </div>
//             <div>
//               <h3 className="font-medium">{currentUser}</h3>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/90 border-b border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-md">
//           <div className="flex items-center">
//             <button onClick={toggleSidebar} className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//               <MdMoreVert size={20} />
//             </button>
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mr-3 shadow-md">
//                 <MdOutlineGroup size={20} className="text-white" />
//               </div>
//               <div>
//                 <h1 className="font-bold tracking-wide">Room {roomId}</h1>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {messages.length} messages
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//               <FiSearch size={18} />
//             </button>
//             <button
//               onClick={chatLogout}
//               className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 text-sm shadow-sm"
//             >
//               <MdOutlineExitToApp size={18} />
//               <span className="hidden sm:inline">Leave</span>
//             </button>
//           </div>
//         </header>

//         {/* Chat Messages */}
//         <main ref={chatBoxRef} className="flex-1 overflow-y-auto p-6 bg-white/60 dark:bg-gray-900/60 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
//           <div className="max-w-3xl mx-auto space-y-4">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-center py-10 text-gray-500 dark:text-gray-400">
//                 <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
//                   <MdOutlineGroup size={40} className="text-white" />
//                 </div>
//                 <h3 className="text-xl font-medium mb-2">No messages yet</h3>
//                 <p className="max-w-xs">Start the conversation by sending your first message!</p>
//               </div>
//             ) : (
//               messages.map((message, index) => (
//                 <div key={index} className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}>
//                   <div className={`flex max-w-xs lg:max-w-md ${message.sender === currentUser ? "flex-row-reverse" : ""}`}>
//                     {message.sender !== currentUser && (
//                       <div className="flex-shrink-0 mr-2 self-end">
//                         <img
//                           className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900 p-0.5"
//                           src={`https://avatar.iran.liara.run/username?username=${message.sender}`}
//                           alt={message.sender}
//                         />
//                       </div>
//                     )}
//                     <div className={`p-4 rounded-2xl shadow-md ${message.sender === currentUser
//                         ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
//                         : "bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 rounded-bl-none"
//                       }`}>
//                       {message.sender !== currentUser && (
//                         <div className="font-bold text-xs mb-1">{message.sender}</div>
//                       )}
//                       <div className="text-base">
//                         {message.isGif ? (
//                           <img src={message.content} alt="gif" className="rounded-lg max-w-xs" />
//                         ) : (
//                           message.content
//                         )}
//                       </div>
//                       <div className={`text-xs mt-2 flex justify-end ${message.sender === currentUser
//                           ? "text-indigo-100"
//                           : "text-gray-500 dark:text-gray-400"
//                         }`}>
//                         {formatMessageTime(message.timeStamp)}
//                       </div>
//                     </div>
//                     {message.sender === currentUser && (
//                       <div className="flex-shrink-0 ml-2 self-end">
//                         <img
//                           className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900 p-0.5"
//                           src={`https://avatar.iran.liara.run/username?username=${message.sender}`}
//                           alt={message.sender}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </main>

//         {/* Input Area */}
//         <div className="p-5 bg-white/90 dark:bg-gray-800/90 border-t border-gray-200 dark:border-gray-700 shadow-lg relative">
//           {/* Emoji Picker */}
//           {showEmojiPicker && (
//             <div ref={pickerRef} className="absolute bottom-20 left-8 z-20">
//               <EmojiPicker onEmojiClick={onEmojiClick} theme="auto" />
//             </div>
//           )}
//           {/* GIF Picker */}
//           {showGifPicker && (
//             <div ref={pickerRef} className="absolute bottom-20 left-24 z-20">
//               <GifPicker tenorApiKey="YOUR_TENOR_API_KEY" onGifClick={sendGifMessage} />
//             </div>
//           )}
//           <div className="max-w-3xl mx-auto">
//             {isTyping && (
//               <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 ml-2">
//                 Press Enter to send, Shift+Enter for new line
//               </div>
//             )}
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => {
//                   setShowEmojiPicker(!showEmojiPicker);
//                   setShowGifPicker(false);
//                 }}
//                 className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all duration-200"
//                 title="Emoji"
//               >
//                 <MdOutlineEmojiEmotions size={22} />
//               </button>
//               <button
//                 onClick={() => {
//                   setShowGifPicker(!showGifPicker);
//                   setShowEmojiPicker(false);
//                 }}
//                 className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all duration-200"
//                 title="GIF"
//               >
//                 <MdOutlineGif size={22} />
//               </button>
//               <div className="flex-1 relative">
//                 <input
//                   ref={inputRef}
//                   value={input}
//                   onChange={handleInputChange}
//                   onKeyDown={handleKeyDown}
//                   type="text"
//                   placeholder="Type your message..."
//                   className="w-full py-3 px-5 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-800 dark:text-gray-200 shadow-inner text-base"
//                 />
//               </div>
//               <button
//                 onClick={sendMessage}
//                 disabled={!input.trim()}
//                 className={`p-3 rounded-full shadow-md transition-all duration-200 ${input.trim()
//                   ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
//                   }`}
//                 title="Send"
//               >
//                 <MdSend size={22} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;

// 666666


// import React, { useEffect, useRef, useState } from "react";
// import { MdSend } from "react-icons/md";
// import SockJS from "sockjs-client";
// import { baseURL } from "../Services/AxiosHelper";
// import { Stomp } from "@stomp/stompjs";
// import toast from "react-hot-toast";
// import useChatContext from "../context/ChatContext";
// import { useNavigate } from "react-router";
// import { getMessagessApi } from "../Services/roomService";
// import { timeAgo } from "../Services/TimeHelper";

// function ChatPage() {
//   const { roomId, currentUser, connected, setconnected, setRoomId, setCurrentUser } = useChatContext();
//   const navigate = useNavigate();
//   const [message, setMessange] = useState([]);
//   const [input, setInput] = useState("");
//   const chatBoxRef = useRef(null);
//   const [stompClient, setStompClient] = useState(null);

//   useEffect(() => {
//     if (!connected) navigate("/");
//   }, [connected]);

//   useEffect(() => {
//     async function loadMessages() {
//       try {
//         const mess = await getMessagessApi(roomId);
//         setMessange(mess);
//       } catch (error) {}
//     }
//     connected && loadMessages();
//   }, []);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scroll({
//         top: chatBoxRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [message]);

//   useEffect(() => {
//     const connectWebSocket = () => {
//       const protocol = window.location.protocol === 'https:' ? 'https://' : 'http://';
//       const sock = new SockJS(`${protocol}${baseURL.replace(/^https?:\/\//, '')}/chat`);
//       const client = Stomp.over(sock);
//       client.connect({}, () => {
//         setStompClient(client);
//         client.subscribe(`/topic/room/${roomId}`, (message) => {
//           const newMessage = JSON.parse(message.body);
//           setMessange((prev) => [...prev, newMessage]);
//         });
//       });
//     };
//     connected && connectWebSocket();
//   }, [roomId]);

//   const sendMessange = async () => {
//     if (stompClient && connected && input.trim()) {
//       const message = {
//         sender: currentUser,
//         content: input,
//         roomId: roomId,
//       };
//       stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
//       setInput("");
//     }
//   };

//   const chatLogout = () => {
//     stompClient?.disconnect();
//     setconnected(false);
//     setRoomId("");
//     setCurrentUser("");
//     navigate("/");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar */}
//       <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
//         <div className="p-4">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white">Room 1234</h2>
//           <p className="text-sm text-green-500 mt-1">Active now</p>
//         </div>
        
//         <div className="mt-4 px-2">
//           <div className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Members</div>
//           <div className="space-y-2">
//             <div className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span className="text-gray-800 dark:text-white">Sucip</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//           <div>
//             <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Room: 1234</h1>
//             <p className="text-sm text-gray-600 dark:text-gray-400">{currentUser}</p>
//           </div>
//           <button 
//             onClick={chatLogout}
//             className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
//           >
//             Leave Room
//           </button>
//         </div>

//         {/* Messages Container */}
//         <div 
//           ref={chatBoxRef}
//           className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
//         >
//           {message.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${msg.sender === currentUser ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${
//                   msg.sender === currentUser
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-white dark:bg-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 <div className="text-sm">{msg.content}</div>
//                 <div className={`text-xs mt-1 ${
//                   msg.sender === currentUser ? "text-blue-100" : "text-gray-500"
//                 }`}>
//                   {timeAgo(msg.timeStamp)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input Area */}
//         <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
//           <div className="flex items-center gap-2">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessange()}
//               placeholder="Type your message..."
//               className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//             />
//             <button
//               onClick={sendMessange}
//               className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
//             >
//               <MdSend size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;



// 777777

import React, { useEffect, useRef, useState } from "react";
import {
  MdSend,
  MdOutlineExitToApp,
  MdOutlineGroup,
  MdOutlineEmojiEmotions,
  MdOutlineGif,
  MdMoreVert
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import GifPicker from "gif-picker-react";
import SockJS from "sockjs-client";
import { baseURL } from "../Services/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import { getMessagessApi } from "../Services/roomService";
import { timeAgo } from "../Services/TimeHelper"; // <-- Import the helper

function ChatPage() {
  const { roomId, currentUser, connected, setconnected, setRoomId, setCurrentUser } = useChatContext();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const pickerRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (!connected) navigate("/");
  }, [connected, navigate]);

  useEffect(() => {
    async function loadMessages() {
      try {
        const mess = await getMessagessApi(roomId);
        setMessages(mess);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }
    if (connected) loadMessages();
  }, [connected, roomId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  useEffect(() => {
    const connectWebSocket = () => {
      const protocol = window.location.protocol === "https:" ? "https://" : "http://";
      const sock = new SockJS(`${protocol}${baseURL.replace(/^https?:\/\//, "")}/chat`);
      const client = Stomp.over(sock);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected to chat");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
      return () => {
        if (client && client.connected) client.disconnect();
      };
    };
    if (connected) connectWebSocket();
  }, [roomId, connected]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
        setShowGifPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId
      };
      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
      setInput("");
      setIsTyping(false);
    }
  };

  const sendGifMessage = (gif) => {
    if (stompClient && connected) {
      const message = {
        sender: currentUser,
        content: gif.url,
        roomId: roomId,
        isGif: true
      };
      stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
      setShowGifPicker(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const chatLogout = () => {
    if (stompClient && stompClient.connected) stompClient.disconnect();
    setconnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  };

  const onEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-200 via-white to-purple-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className={`${showSidebar ? "flex" : "hidden"} md:flex flex-col w-72 bg-white/80 dark:bg-gray-800/80 border-r border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-md`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-wide">Chat Room</h2>
            <button onClick={toggleSidebar} className="md:hidden p-1 rounded-full hover:bg-white/20">
              <MdMoreVert size={20} />
            </button>
          </div>
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-8 pr-4 py-2 bg-white/30 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
            />
            <FiSearch className="absolute left-3 top-3 text-white/70" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer transition-all duration-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mr-3 shadow-md">
                <MdOutlineGroup size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium">Room {roomId}</h3>
                <p className="text-xs text-gray-100/80 dark:text-gray-300/80">Active now</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center">
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full mr-3 border-2 border-indigo-500 p-0.5"
                src={`https://avatar.iran.liara.run/username?username=${currentUser}`}
                alt={currentUser}
              />
              <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div>
              <h3 className="font-medium">{currentUser}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
        </div>
      </div>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/90 border-b border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-md">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <MdMoreVert size={20} />
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mr-3 shadow-md">
                <MdOutlineGroup size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold tracking-wide">Room {roomId}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {messages.length} messages
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiSearch size={18} />
            </button>
            <button
              onClick={chatLogout}
              className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 text-sm shadow-sm"
            >
              <MdOutlineExitToApp size={18} />
              <span className="hidden sm:inline">Leave</span>
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <main ref={chatBoxRef} className="flex-1 overflow-y-auto p-6 bg-white/60 dark:bg-gray-900/60 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10 text-gray-500 dark:text-gray-400">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <MdOutlineGroup size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2">No messages yet</h3>
                <p className="max-w-xs">Start the conversation by sending your first message!</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-xs lg:max-w-md ${message.sender === currentUser ? "flex-row-reverse" : ""}`}>
                    {message.sender !== currentUser && (
                      <div className="flex-shrink-0 mr-2 self-end">
                        <img
                          className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900 p-0.5"
                          src={`https://avatar.iran.liara.run/username?username=${message.sender}`}
                          alt={message.sender}
                        />
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl shadow-md ${message.sender === currentUser
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
                        : "bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 rounded-bl-none"
                      }`}>
                      {message.sender !== currentUser && (
                        <div className="font-bold text-xs mb-1">{message.sender}</div>
                      )}
                      <div className="text-base">
                        {message.isGif ? (
                          <img src={message.content} alt="gif" className="rounded-lg max-w-xs" />
                        ) : (
                          message.content
                        )}
                      </div>
                      <div className={`text-xs mt-2 flex justify-end ${message.sender === currentUser
                          ? "text-indigo-100"
                          : "text-gray-500 dark:text-gray-400"
                        }`}>
                        {timeAgo(message.timeStamp)}
                      </div>
                    </div>
                    {message.sender === currentUser && (
                      <div className="flex-shrink-0 ml-2 self-end">
                        <img
                          className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900 p-0.5"
                          src={`https://avatar.iran.liara.run/username?username=${message.sender}`}
                          alt={message.sender}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
        {/* Input Area */}
        <div className="p-5 bg-white/90 dark:bg-gray-800/90 border-t border-gray-200 dark:border-gray-700 shadow-lg relative">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div ref={pickerRef} className="absolute bottom-20 left-8 z-20">
              <EmojiPicker onEmojiClick={onEmojiClick} theme="auto" />
            </div>
          )}
          {/* GIF Picker */}
          {showGifPicker && (
            <div ref={pickerRef} className="absolute bottom-20 left-24 z-20">
              <GifPicker tenorApiKey="YOUR_TENOR_API_KEY" onGifClick={sendGifMessage} />
            </div>
          )}
          <div className="max-w-3xl mx-auto">
            {isTyping && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 ml-2">
                Press Enter to send, Shift+Enter for new line
              </div>
            )}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                  setShowGifPicker(false);
                }}
                className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all duration-200"
                title="Emoji"
              >
                <MdOutlineEmojiEmotions size={22} />
              </button>
              <button
                onClick={() => {
                  setShowGifPicker(!showGifPicker);
                  setShowEmojiPicker(false);
                }}
                className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-all duration-200"
                title="GIF"
              >
                <MdOutlineGif size={22} />
              </button>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Type your message..."
                  className="w-full py-3 px-5 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-800 dark:text-gray-200 shadow-inner text-base"
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`p-3 rounded-full shadow-md transition-all duration-200 ${input.trim()
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                title="Send"
              >
                <MdSend size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;



// // 888888

