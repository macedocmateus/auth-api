import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";

interface TokenPayload {
    role: string;
    sub: string;
}

function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    // Pegando o token do cabeçalho da requisição
    const authHeader = request.headers.authorization;

    // Verificando se o token existe e lançando uma exceção se caso ele não exista
    if (!authHeader) {
        throw new AppError("JWT token não informado", 401);
    }

    // Extraindo somente o token, usando a desestruturação de arrays para excluir o prefixo "Bearer", retornando um novo array chamado "token" com apenas o valor do token
    const [, token] = authHeader.split(" ");

    // Verifica se o token é válido
    const { sub: user_id, role } = verify(
        token,
        authConfig.jwt.secret,
    ) as TokenPayload;

    request.user = {
        id: String(user_id),
        role,
    };

    return next();
}

export { ensureAuthenticated };
