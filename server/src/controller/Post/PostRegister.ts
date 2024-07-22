import { Request, Response } from "express";
import bcrypt from "bcryptjs"; // Importamos bcryptjs
import { db } from "../../db";

const saltRounds = 10; // Número de saltos para generar el hash

export const PostRegister = async (req: Request, res: Response) => {
    const { email, password, first_name, last_name } =
        req.body;
    console.log({ email, password, first_name, last_name });
    // Validación de campos obligatorios
    if (!email || !password || !first_name || !last_name ) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    // Verificar si el correo electrónico ya está registrado
    try {
        const existingUser = await db.user.findUnique({
            where:{
                email:email
            },
        });
console.log(existingUser)
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "El correo electrónico ya está registrado" });
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear el usuario con la contraseña hasheada
        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword, // Guardamos la contraseña hasheada
                first_name,
                last_name,
            },
        });

        // Remover la contraseña del objeto newUser antes de enviar la respuesta
        const { password: omitPassword, ...userData } = newUser;

        res.json({
            message: "Usuario registrado exitosamente",
            user: userData,
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "No se pudo crear el usuario" });
    }
};
