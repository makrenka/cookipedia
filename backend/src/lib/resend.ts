import { Resend } from "resend";
import { env } from "./env";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmailThroughResend = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const response = await resend.emails.send({
    from: `${env.FROM_EMAIL_NAME} <${env.FROM_EMAIL_ADDRESS}>`,
    to,
    subject,
    html,
  });

  return {
    loggableResponse: {
      status: response.error ? 400 : 200,
      statusText: response.error ? response.error.message : "OK",
      data: response,
    },
  };
};
