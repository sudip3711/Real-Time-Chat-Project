package com.SudipChatApp.chat_backend.repo;

import com.SudipChatApp.chat_backend.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepo extends MongoRepository<Room,String> {


}
