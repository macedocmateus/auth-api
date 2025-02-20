import { Router } from "express";
import { ProductsController } from "@/controllers/products-controller";

import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const productsRoutes = Router();
const productsController = new ProductsController();

/* Colocando autenticação e autorização de forma global
productsRoutes.use(verifyUserAuthorization(["sale", "admin"]));
*/

productsRoutes.get("/", productsController.index);

// Colocando autenticação e autorização de forma local em uma rota específica
productsRoutes.post(
    "/",
    // Middleware para confirma se o usuário está autenticado
    ensureAuthenticated,
    // Middleware para confirma se o usuário tem permissão para fazer essa requisição de criar produto, só podendo fazer a requisição se ele for um vendedor (sale) ou administrador (admin)
    verifyUserAuthorization(["sale", "admin"]),
    productsController.create,
);

export { productsRoutes };
