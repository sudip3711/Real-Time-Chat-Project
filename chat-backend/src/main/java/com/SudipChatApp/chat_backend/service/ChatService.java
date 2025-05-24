package com.SudipChatApp.chat_backend.service;

import com.SudipChatApp.chat_backend.model.Message;
import com.SudipChatApp.chat_backend.model.MessageRequest;
import com.SudipChatApp.chat_backend.model.Room;
import com.SudipChatApp.chat_backend.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private RoomRepo roomRepo;
    @Autowired
    private RoomServices roomServices;


    public Message sendMessage(MessageRequest request, String roomId) {

//        Optional<Room> roomOptional = r.findById(request.getRoomId());
        Room room = roomServices.findByRoomId(request.getRoomId());
        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTimeStamp(LocalDateTime.now());
        if (room!=null){
            room.getMessages().add(message);
            roomRepo.save(room);
        }else {
            // Handle the case when the room is not found (optional)
            throw new RuntimeException("Room with ID " + request.getRoomId() + " not found");
        }

//        if(roomOptional.isPresent()) {
//            Room room = roomOptional.get(); // Safely retrieve the Room
//            room.getMessages().add(message); // Add the message to the room's messages
//            roomRepo.save(room); // Save the updated room
//        }else {
//            // Handle the case when the room is not found (optional)
//            throw new RuntimeException("Room with ID " + request.getRoomId() + " not found");
//        }
//
        return  message;
    }



}
