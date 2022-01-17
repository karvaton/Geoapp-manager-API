import Router from "express";
import userRouter from './user-routes.js';
import layersRouter from './layers-routes.js';
import geoserver from './geoserver.js';
import dataRouter from './data-router.js';


const router = new Router();

router.use('/users', userRouter);
router.use('/layers', layersRouter);
router.use('/gs', geoserver);
router.use('/data', dataRouter);


export default router;
