import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/authenticateUser/AutenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/session", authenticateUserController.handle);

export { authenticateRoutes };