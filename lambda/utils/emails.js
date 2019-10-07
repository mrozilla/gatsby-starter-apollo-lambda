// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const sgMail = require('@sendgrid/mail');
const errors = require('./errors');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

module.exports = Object.freeze({
  sendEmailVerification: ({ email, token }) => {
    try {
      sgMail.send({
        to:                    email,
        from:                  'test@example.com',
        templateId:            'd-68ca96a9cb1943948dd15a9289cfc5ff',
        dynamic_template_data: {
          subject: 'COMPANY email verification',
          link:    `http://localhost:8000/u/verify/?token=${token}`,
        },
      });
    } catch (error) {
      throw new Error(errors.emailNotSent);
    }
  },
  sendPasswordReset: ({ email, token }) => {
    try {
      sgMail.send({
        to:                    email,
        from:                  'test@example.com',
        templateId:            'd-9ae88a5e9d524d078e059f58ad1b4d3f',
        dynamic_template_data: {
          subject: 'COMPANY password reset',
          link:    `http://localhost:8000/u/reset/?token=${token}`,
        },
      });
    } catch (error) {
      throw new Error(errors.emailNotSent);
    }
  },
});
