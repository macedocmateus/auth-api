import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";

// Simular um usuário válido

class SessionsController {
    async create(request: Request, response: Response) {
        const { username, password } = request.body;

        const fakeUser = {
            id: "1",
            username: "mateus",
            password: "123",
            role: "customer",
        };

        // Verificando se o usuário e senha estão corretos
        if (username !== fakeUser.username || password !== fakeUser.password) {
            throw new AppError("Usuário e/ou senha incorreta", 401);
        }
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({ role: fakeUser.role }, secret, {
            expiresIn,
            subject: String(fakeUser.id),
        });

        return response.json(token);
    }
}

export { SessionsController };
