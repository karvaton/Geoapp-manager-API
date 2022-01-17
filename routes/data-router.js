import Router from "express";
import * as dataControl from "../controller/data-controller.js";

const router = new Router();

router.get('/parameters/:login', dataControl.getParameters);
router.post('/parameters', dataControl.getParameters);

export default router;