import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const BACKEND_URL = env.BACKEND_URL;

export const userService = {
  getSession: async function () {
    let providerData;
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      if (session.user.role === "PROVIDER") {
        const res = await fetch(`${BACKEND_URL}/api/providers?id=${session?.user.id}`);
        const providerRes = await res.json();
        providerData = providerRes;
      }
      session.user.providerProfile = providerData;

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
