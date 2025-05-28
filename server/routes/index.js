import { Router } from "express";
import paymentRouter from "./paymentRouter.js";
import paymentZaloRouter from "./paymentZaloRouter.js";
import authRouter from "./authRouter.js";

const router = Router();

router.use("/", paymentRouter);
router.use("/zalo", paymentZaloRouter);
router.use("/auth", authRouter); 

export default router;