import { Router } from "express";
import paymentRouter from "./paymentRouter.js";
import paymentZaloRouter from "./paymentZaloRouter.js";

const router = Router();

router.use("/", paymentRouter);
router.use("/zalo", paymentZaloRouter);

export default router;
