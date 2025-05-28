import nodemailer from "nodemailer";

// Tạo transporter cho nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "linh304204@gmail.com", 
    pass: "xmxh qutu eulf fklu" 
  }
});

// Mẫu email xác minh
const getVerificationEmailTemplate = (name, verificationUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Xác minh tài khoản</h2>
      <p>Chào bạn,</p>
      <p>Cảm ơn bạn đã đăng ký tài khoản tại TechShop. Vui lòng nhấp vào nút bên dưới để xác minh email của bạn:</p>
      <div style="margin: 30px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Xác minh email của tôi
        </a>
      </div>
      <p>Hoặc bạn có thể sao chép và dán đường dẫn sau vào trình duyệt:</p>
      <p style="word-break: break-all;">${verificationUrl}</p>
      <p>Đường dẫn này sẽ hết hạn sau 24 giờ.</p>
      <p>Trân trọng,<br>TechShop</p>
    </div>
  `;
};

export { transporter, getVerificationEmailTemplate };