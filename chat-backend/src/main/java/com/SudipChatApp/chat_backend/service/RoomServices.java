package com.SudipChatApp.chat_backend.service;

import com.SudipChatApp.chat_backend.model.Room;
import com.SudipChatApp.chat_backend.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class RoomServices {

    @Autowired
    private RoomRepo roomRepo;


    public Room findByRoomId(String roomId){
        return  roomRepo.findById(roomId).orElse(null);
    }


    public Room createRoom(String roomId){
        Room room= new Room();
        room.setRoom_id(roomId);
        return  roomRepo.save(room);
    }


}
