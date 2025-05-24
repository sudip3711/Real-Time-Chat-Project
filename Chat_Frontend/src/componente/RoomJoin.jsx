import React, { useState } from "react";
import toast from "react-hot-toast";
import { createRoomApi, joinRoomApi } from "../Services/roomService";
import { cache } from "react";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

function RoomJoin() {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const {
    roomId,
    currentUser,
    setRoomId,
    setCurrentUser,
    connected,
    setconnected,
  } = useChatContext();

  const navigate = useNavigate();

  function handleFromInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateFrom() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid Imput!.");
      return false;
    }
    return true;
  }

  async function joinRoom() {
    if (validateFrom()) {

        try{ const room = await joinRoomApi(detail.roomId);
            toast.success("Join Successfully..");
            setCurrentUser(detail.userName);
            setRoomId(detail.roomId);
            setconnected(true);
            navigate("/chat");
        }catch (error) {
            if (error.status == 400) {
              toast.error("Room not found");
            } else {
              toast("Error in join room");
            }
            console.log(error);
          }
      
    }
  }

  async function createRoom() {
    if (validateFrom()) {
      console.log(detail);
      try {
        const resp = await createRoomApi(detail.roomId);
        console.log(resp);
        toast.success("Room Created Successfully.");

        setCurrentUser(detail.userName);
        setRoomId(detail.roomId);
        setconnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status == 400) {
          toast.error("Room already present");
        } else {
          toast("Error in created room");
        }
        console.log(error);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 dark:border-gray-700 border w-full flex flex-col gap-3 max-w-md rounded-md dark:bg-gray-900 shadow-lg outline-none">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Join / Create Room..
        </h1>
        <div className="">
          <label className="block font-medium mb-2">Name</label>
          <input
            onChange={handleFromInputChange}
            value={detail.userName}
            type="text"
            name="userName"
            id=""
            placeholder="Enter the name."
            className="w-full dark:bg-gray-600 px-4 border
             dark:border-gray-600 rounded-md 
             focus:outline-none h-9"
          />
        </div>
        <div className="">
          <label className="block font-medium mb-2">Room Id</label>
          <input
            onChange={handleFromInputChange}
            value={detail.roomId}
            type="text"
            name="roomId"
            id="Id"
            placeholder="Enter the room Id"
            className="w-full dark:bg-gray-600 px-4 border
             dark:border-gray-600 rounded-md 
             focus:outline-none h-9"
          />
          {/* focus:ring-1 focus:ring-green-400 */}
        </div>
        <div className="flex justify-center gap-24 mt-4">
          <button
            onClick={joinRoom}
            className="px-4 py-2 dark:bg-blue-500 hover:dark:bg-blue-700 rounded-md  border-none"
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="px-4 py-2 dark:bg-orange-400 hover:dark:bg-orange-600 rounded-md  border-none"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomJoin;
