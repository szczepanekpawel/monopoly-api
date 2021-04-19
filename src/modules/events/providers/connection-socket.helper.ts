import { Socket } from "socket.io";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConnectionSocketHelper {


  public sendEventToSender(socket: Socket, room, eventName, eventData) {
    socket.emit(eventName, eventData);
  }

  public sendEventToRoomExceptSender(socket: Socket, room, eventName, eventData) {
    socket.broadcast.to(room).emit(eventName, eventData);
  }

  public sendEventToRoom(socket: Socket, room, eventName, eventData) {
    socket.server.in(room).emit(eventName, eventData);
  }

  public sendEventToParticularClient(socket, clientId, eventName, eventData) {
    socket.to(clientId).emit(eventName, eventData);
  }

}
