import { Router } from "express";
import { renderIndex, ping, renderCatalogo} from "../controllers/index.controller.js";

const router = Router();

router.get("/", renderIndex);

router.get('/ping',ping);

router.get('/catalogo',renderCatalogo);

export default router;