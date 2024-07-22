import express from "express";
import { router } from "./Router/routes"
import cors from "cors"

export const server = express();
const opcionCors = {
    origin:"*",
    methods: "GET,POST,PUT,DELETE",
    allowedHaders:"Content-Type,Authoeization"
}
server.use(cors())
server.use(express.json());
server.use("/",router)