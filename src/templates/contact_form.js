function contactForm({ name, email, reason, message }) {
  return {
    subject: `New contact form submission — ${reason}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px 40px">
          <h1 style="margin:0;color:#fff;font-size:20px;font-weight:600">New Contact Form Submission</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px">FlowCore Systems — flowcoresystemsai.com</p>
        </div>
        <div style="padding:32px 40px;background:#fff">
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;width:100px">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:500">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px"><a href="mailto:${email}" style="color:#4f46e5">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px">Reason</td>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px">${reason}</td>
            </tr>
          </table>
          <div style="margin-top:24px">
            <p style="margin:0 0 8px;color:#64748b;font-size:13px">Message</p>
            <div style="background:#f8fafc;border-radius:8px;padding:16px;color:#0f172a;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</div>
          </div>
          <div style="margin-top:24px">
            <a href="mailto:${email}" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500">Reply to ${name}</a>
          </div>
        </div>
        <div style="padding:16px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px">
          Sent via FlowCore Mailer — mail.2309apt.com
        </div>
      </div>
    `,
  };
}

module.exports = contactForm;
