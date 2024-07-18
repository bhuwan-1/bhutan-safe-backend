"use strict";

const sgMail = require("@sendgrid/mail");

const FROM_EMAIL_ADDRESS = process.env.SENDGRID_FROM_ADDRESS;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function buildRecipient(list = []) {
    return list.map((r) => {
      return {
        email: r,
      };
    });
  }

  class EmailService {
    static sendSimpleEmail(
      subject,
      text,
      recipients,
      from,
      html,
      templateName,
      templateData,
      delay = false,
      attachment,
      attachmentName,
      isStream
    ) {
      const to = buildRecipient(recipients.to);
      const cc = buildRecipient(recipients.cc);
      const bcc = buildRecipient(recipients.bcc);
      if (!html && !!templateName) {
        html = EmailService.getHTMLTemplate(templateName, templateData);
      }
      const attachments = [];
      if (attachment) {
        attachments.push({
          filename: attachmentName || attachment,
          content: isStream
            ? attachment
            : EmailService.getBase64AttachmentContent(attachment),
          disposition: "attachment",
        });
      }
  
      const emailData = {
        personalizations: [{ to, cc, bcc }],
        replyTo: from || FROM_EMAIL_ADDRESS,
        from: { email: from || FROM_EMAIL_ADDRESS, name: "Beyul" },
        subject,
        text: text || " ",
        html: text || " ",
        attachments,
      };
      return sgMail.send(emailData);
    }

  }
  
  module.exports = EmailService;
  