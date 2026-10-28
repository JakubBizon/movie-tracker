export function isDemoUser(email: string | null | undefined) {
  const demoEmail = process.env.DEMO_USER_EMAIL;
  if (!demoEmail || !email) return false;

  return email.toLowerCase() === demoEmail.toLowerCase();
}
