package com.SudipChatApp.chat_backend.controllers;

import com.SudipChatApp.chat_backend.model.Message;
import com.SudipChatApp.chat_backend.model.MessageRequest;
import com.SudipChatApp.chat_backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@CrossOrigin("http://localhost:5174")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(@RequestBody MessageRequest request , @DestinationVariable String roomId){
        return chatService.sendMessage(request,roomId);
    }
}
