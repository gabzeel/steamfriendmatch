import 'dotenv/config'
import express from "express";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import User from "./models/entities/User";
import { createConnection } from "typeorm";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import { createUser, getUsers, updateUser, uploadProfilePhoto } from "./controllers/users";
import { login } from "./controllers/auth";
import { ConnectedSocketUser, MessageObject } from "./models/interfaces";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "./controllers/post";
import { getFile } from './controllers/files';
import fileUpload from 'express-fileupload';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SecretTestKey";
const PORT = Number(process.env.SERVER_PORT) || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "*" } });
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    return done(null, jwt_payload);
  })
);

// const usersConnected: ConnectedSocketUser[] = [];
// io.on("connection", (socket) => {
//   console.log("Nova conexão");
//   socket.on("sendMessage", (messageObject: MessageObject) => {
//     console.log("Novo evento de envio de mensagem");
//     const messageReceive = usersConnected.find((connectedSocketUser) => {
//       return messageObject.userId === connectedSocketUser.user.id;
//     });

//     if (messageReceive) {
//       messageReceive.socket.emit("receiveMessage", {
//         message: messageObject.message,
//       });
//     }
//   });
// });

createConnection()
  .then(async (connection) => {
    // io.use(async (socket, next) => {
    //   if (socket.handshake.query && socket.handshake.query.token) {
    //     jwt.verify(
    //       socket.handshake.query.token as string,
    //       JWT_SECRET_KEY,
    //       async (err, decoded) => {
    //         if (err) return next(new Error("Authentication error"));
    //         const { email } = (decoded as any).user as User;

    //         const user = await User.findOne({ email });

    //         if (!user) return next(new Error("Authentication error"));

    //         if (
    //           !usersConnected.some(
    //             (userSocket) => userSocket.user.id == user.id
    //           )
    //         ) {
    //           usersConnected.push({ user, socket });
    //         }

    //         next();
    //       }
    //     );
    //   }
    //   next(new Error("Authentication error"));
    // });

    app.get("/users", getUsers);
    app.get("/users/:id", getUsers);
    app.post("/users", createUser);
    app.post("/users/:id/profile", uploadProfilePhoto);
    app.put("/users/:id", updateUser);

    app.get("/posts", getPosts);
    app.get("/posts/:id", getPostById);
    app.post("/posts", createPost);
    app.put("/posts/:id", updatePost);
    app.delete("/posts/:id", deletePost);

    app.get("/files/:fileKey", getFile);

    app.post("/auth/login", login);
  })
  .catch((error) => console.log("TypeORM connection error: ", error));

server.listen(PORT, "0.0.0.0",  () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
