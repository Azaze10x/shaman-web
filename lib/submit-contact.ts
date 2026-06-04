export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("FORM_NOT_CONFIGURED");
  }

  const body = new FormData();
  body.append("access_key", accessKey);
  body.append("subject", `Shaman Tech — message from ${payload.name}`);
  body.append("from_name", payload.name);
  body.append("name", payload.name);
  body.append("email", payload.email);
  body.append("replyto", payload.email);
  body.append("message", payload.message);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body,
  });

  const result = (await response.json()) as { success?: boolean };

  if (!response.ok || !result.success) {
    throw new Error("SEND_FAILED");
  }
}
