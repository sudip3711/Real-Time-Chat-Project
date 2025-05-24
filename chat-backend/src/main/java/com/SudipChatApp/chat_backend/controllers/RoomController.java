package com.SudipChatApp.chat_backend.controllers;


import com.SudipChatApp.chat_backend.model.Message;
import com.SudipChatApp.chat_backend.model.Room;
import com.SudipChatApp.chat_backend.repo.RoomRepo;
import com.SudipChatApp.chat_backend.service.RoomServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:5174")
@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {

    @Autowired
    private RoomServices roomServices;

    @GetMapping("/{roomId}")
    public ResponseEntity<?> getData(@PathVariable String roomId){
        Room room= roomServices.findByRoomId(roomId);
        if (room!=null)
            return ResponseEntity.ok(room);
        return ResponseEntity.badRequest().body("Room not found");

    }
    

    @PostMapping("")
    public ResponseEntity<?> createRoom(@RequestBody String roomId){
        if (roomServices.findByRoomId(roomId)!= null){
            return ResponseEntity.badRequest().body("Room already present");
        }
        return new ResponseEntity<>(roomServices.createRoom(roomId),HttpStatus.CREATED);
    }

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>>getMessages(@PathVariable String roomId, @RequestParam(value = "page",defaultValue = "0",required = false)int page,
                                                    @RequestParam(value = "size",defaultValue = "20",required = false)int size){

        Room room= roomServices.findByRoomId(roomId);
        if (room==null)
            return ResponseEntity.badRequest().build();

        List<Message> messages = room.getMessages();

        int start = Math.max(0,messages.size()-(page+1)*size);
        int end = Math.min(messages.size(),start+size);
         List<Message> paginationMessages = messages.subList(start,end);
        return  ResponseEntity.ok(paginationMessages);

    }







}
