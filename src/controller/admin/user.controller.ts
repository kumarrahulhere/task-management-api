import { Request, Response } from "express";
import {
  deleteUserById,
  findAllUser,
  findUser,
  findUserById,
} from "../../service/user.service";
import Joi, { valid } from "joi";
import { validateData } from "../../validation/common.validation";

export const getUsers = async (req: Request, res: Response) => {
  let users = await findAllUser();
  return res.sendRes(200, "User list", { users });
};

export const toggleUserVerification = async (req: Request, res: Response) => {
  let validateSchema = {
    id: Joi.string().required(),
    verified: Joi.boolean().required(),
  };
  const error = validateData(validateSchema, req.body);
  if (error) {
    return res.sendRes(400, "Invalid input!", error);
  }
  let user = await findUserById(req.body.id);
  if (!user) return res.sendRes(400, "User not exist");

  user.verified = req.body.verified;
  await user.save();
  return res.sendRes(200, "User updated", { user });
};

export const deleteUser = async (req: Request, res: Response) => {
  let validateSchema = {
    id: Joi.string().required(),
  };
  const error = validateData(validateSchema, req.body);
  if (error) {
    return res.sendRes(400, "Invalid input!", error);
  }
  let user = await findUserById(req.body.id);
  if (!user) return res.sendRes(400, "User not exist");

  await deleteUserById(req.body.id);
  return res.sendRes(200, "User deleted");
};
