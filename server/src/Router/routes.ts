import { Router } from "express";
import { PostRegister } from "../controller/Post/PostRegister";
import { PostLogin } from "../controller/Post/PostLogin";
export const router = Router();

router.post("/Registro", PostRegister);
router.post("/Login", PostLogin);
router.post("/Perfil", PostLogin);

