import Router from "express";
import * as layersControl from "../controller/layers-control.js";

const router = new Router();

router.get("/", layersControl.getData);
router.get("/:login", layersControl.getUserData);
router.post("/:login", layersControl.loadData);

export default router;
