package com.SudipChatApp.chat_backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    private String sender;
    private String content;
    private LocalDateTime timeStamp;

//    public  Message(String sender, String content){
//        this.content= content;
//        this.sender = sender;
//        this.timeStamp = LocalDateTime.now();
//    }
}
