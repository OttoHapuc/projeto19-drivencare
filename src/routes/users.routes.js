import { Router } from "express";
import { validationSchema } from "../middlewares/schema.validation.middleware.js";
import userSchema from "../schemas/users.schemas.js";
import usersControllers from "../controllers/users.controllers.js";
import authValidation from '../middlewares/auth.middleware.js'

const userRoutes = Router();

userRoutes.post('/singin', validationSchema(userSchema.singinSchema), usersControllers.enter);
userRoutes.post('/singup', validationSchema(userSchema.singupSchema), usersControllers.create);
userRoutes.get('/search', authValidation.authValidation, usersControllers.searchMedics);
userRoutes.get('/schedule', validationSchema(userSchema.schedule), authValidation.authValidation, usersControllers.schedule);

export default userRoutes;