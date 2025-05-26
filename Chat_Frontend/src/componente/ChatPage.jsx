import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import SockJS from "sockjs-client";
import { baseURL } from "../Services/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import { getMessagessApi } from "../Services/roomService";
import {timeAgo} from "../Services/TimeHelper"

function ChatPage() {
  const { roomId, currentUser, connected,setconnected,setRoomId,setCurrentUser } = useChatContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [roomId, currentUser, connected]);

  const [message, setMessange] = useState([]);

  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  //load the messages
  useEffect(() => {
    async function loadMessages() {
      try {
        const mess = await getMessagessApi(roomId);
        setMessange(mess);
        console.log(mess);
      } catch (error) {}
    }
    if(connected){
      loadMessages();
    }
  }, []);

  //scroll message box afet insert new messages
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [message]);

  //stompClient inplement
  useEffect(() => {
    const connectWebSocket = () => {
      //SockJS
      const protocol = window.location.protocol === 'https:' ? 'https://' : 'http://';
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("connected");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);
          const newMessage = JSON.parse(message.body);
          setMessange((preview) => [...preview, newMessage]);
        });
      });
    };
    if(connected){
    connectWebSocket();
    }
  }, [roomId]);

  //Send message
  const sendMessange = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);

      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };
      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  function chatLoagout() {
    stompClient.disconnect()
    setconnected(false)
    setRoomId("")
    setCurrentUser("")
    navigate("/");
    
  }


  return (
    <div className="">
      <header className="flex fixed w-full justify-around py-3 items-center dark:bg-gray-800">
        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>1234</span>
          </h1>
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>
        <div>
          <button onClick={chatLoagout} className="dark:bg-red-600 dark:hover:bg-red-800 px-2 py-3 rounded-md">
            Leave Room
          </button>
        </div>
      </header>

      <main
        ref={chatBoxRef}
        className="py-20 top-3 px-6 w-2/3 dark:bg-slate-500 h-screen mx-auto overflow-auto"
      >
        {message.map((message, index) => (
          
          <div
            key={index}
            className={`flex items-center gap-1 ${
              message.sender == currentUser ? "justify-end" : "justify-start "
            }`}
          >
            {message.sender !== currentUser && (
              <img
                className="w-8 h-8 rounded-full self-end"
                src="https://avatar.iran.liara.run/public/boy"
                alt="Avatar"
              />
            )}

            <div
              className={` my-2 p-2 max-w-xs ${
                message.sender == currentUser
                  ? "bg-green-800  rounded-l-2xl rounded-t-3xl"
                  : "bg-gray-700  rounded-r-3xl rounded-t-3xl"
              }  `}
            >
              <div className="flex flex-row gap-2 ">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold">{message.sender}</p>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>




              <p className="text-xs text-gray-400">{timeAgo(message.timeStamp)}</p>
            </div>
            {message.sender === currentUser && (
              <img
                className="w-8 h-8 rounded-full self-end"
                src="https://avatar.iran.liara.run/public/boy"
                alt="Avatar"
              />
            )}
          </div>
        ))}
      </main>

      <div className="fixed bottom-2 w-full h-16">
        <div className="h-full pr-10 gap-3 flex justify-between items-center  w-1/2 mx-auto dark:bg-gray-800 rounded-full">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                sendMessange()
              }
                
            }}
            type="text"
            placeholder="Type your message ...."
            name=""
            id=""
            className="dark:bg-gray-700 px-3 py-2 h-full w-full rounded-full focus:outline-none"
          />

          <div className="flex gap-3">
            <button className="dark:bg-purple-600 h-12 w-12 rounded-full flex justify-center items-center ">
              <MdAttachFile size={25} />
            </button>

            <button
              onClick={sendMessange}
              className="dark:bg-green-600 h-12 w-12 rounded-full flex justify-center items-center "
            >
              <MdSend size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
