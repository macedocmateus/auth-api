import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

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

    console.log(token);

    return next();
}

export { ensureAuthenticated };
