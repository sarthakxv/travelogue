"use server";

export async function verifyAdminPasscode(passcode: string): Promise<boolean> {
  return passcode === process.env.ADMIN_PASSCODE;
}
