import { Router } from "express";
import { validationSchema } from "../middlewares/schema.validation.middleware.js";
import userSchema from "../schemas/users.schemas.js";
import usersControllers from "../controllers/users.controllers.js";

const userRoutes = Router();

userRoutes.post('/singin', validationSchema(userSchema.singinSchema), usersControllers.enter);
userRoutes.post('/singup', validationSchema(userSchema.singupSchema), usersControllers.create);

export default userRoutes;