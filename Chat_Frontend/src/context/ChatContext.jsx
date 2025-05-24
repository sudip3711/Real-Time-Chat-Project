import {createContext,useContext,useState} from 'react';

const ChatContext = createContext();

export const ChatProvider = ({children})=>{
    const [roomId,setRoomId] =useState("");
    const [currentUser,setCurrentUser]=useState("");
    const [connected,setconnected]=useState(false);


    return(
        <ChatContext.Provider value={{roomId,currentUser,setRoomId,setCurrentUser,connected,setconnected}}>
            {children}
        </ChatContext.Provider>
    )
}

const useChatContext =()=>useContext(ChatContext);
export default useChatContext;