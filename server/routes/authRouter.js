import { Router } from "express";
import { createVerificationToken, verifyEmailToken } from "../models/userStore.js";
import { transporter, getVerificationEmailTemplate } from "../config/emailConfig.js";

const authRouter = Router();

// API để gửi email xác minh
authRouter.post("/send-verification", async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        meta: { code: 400, message: "Email không hợp lệ" }
      });
    }
    
    // Tạo userData với thông tin email
    const userData = {
      email
    };
    
    // Tạo token xác minh
    const verificationToken = createVerificationToken(userData);
    
    // Tạo URL xác minh - thay bằng URL frontend của bạn
    const verificationUrl = `http://localhost:3000/verify-email/${verificationToken}`;
    
    // Gửi email xác minh
    await transporter.sendMail({
      from: "linh304204@gmail.com",
      to: email,
      subject: "Xác minh email của bạn",
      html: getVerificationEmailTemplate("", verificationUrl) // Để trống tên vì chưa có
    });
    
    res.status(200).json({
      meta: { code: 200, message: "Email xác minh đã được gửi" },
      data: { email }
    });
    
  } catch (error) {
    console.error("Send verification error:", error);
    res.status(500).json({
      meta: { code: 500, message: "Lỗi server, vui lòng thử lại sau" }
    });
  }
});

// API xác minh email
authRouter.post("/verify-email", (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        meta: { code: 400, message: "Token không hợp lệ" }
      });
    }
    
    // Kiểm tra token
    const verification = verifyEmailToken(token);
    
    if (!verification.valid) {
      return res.status(400).json({
        meta: { code: 400, message: verification.reason }
      });
    }
    
    // Trả về email đã xác minh
    res.status(200).json({
      meta: { code: 200, message: "Email đã được xác minh thành công" },
      data: {
        email: verification.userData.email
      }
    });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({
      meta: { code: 500, message: "Lỗi server" }
    });
  }
});

export default authRouter;