import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import User from "./entities/User";

interface MessageObject {
  userId: string;
  message: string;
}

interface ConnectedSocketUser {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  user: User;
}

export { ConnectedSocketUser, MessageObject };
