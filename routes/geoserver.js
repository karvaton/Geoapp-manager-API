import Router from "express";
import * as gs from "../controller/gs.controller.js";

const router = new Router();

router.post('/workspaces', gs.getWorkspaces);
router.post('/datastores', gs.getDataStores);
router.post('/datastore/entry', gs.getDataStoreEntry);
router.post('/layers', gs.getLayerList);

export default router;
