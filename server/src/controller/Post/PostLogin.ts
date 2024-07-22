import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../db";

const saltRounds = 10;

export const PostLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);

    // Validación de campos obligatorios
    if (!email || !password) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    try {
        // Verificar si el usuario existe en la base de datos
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!passwordMatch) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Generar JWT
        const token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" } // Token expira en 1 hora
        );

        // Enviar el token como cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Cookie solo se envía en HTTPS en producción
            sameSite: "strict",
        });

        // Devolver datos del usuario
        res.status(200).json({
            userId: existingUser.id,
            email: existingUser.email,
            firstName: existingUser.first_name,
            lastName: existingUser.last_name,
        });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};
