import Router from "express";
import * as userControl from "../controller/user-control.js";
import * as dataControl from "../controller/layers-control.js";

const router = new Router();

router.get("/", userControl.getUsers);
router.get("/layers", userControl.getUsersFullData);
router.get("/:login", userControl.getUser);
router.get("/:login/layers", dataControl.getUserData);
router.post("/", userControl.createUser);
router.put("/:login", userControl.update);
router.delete("/:login", userControl.deleteUser);

export default router;