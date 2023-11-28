import {
  // IronSessionOptions,
  SessionOptions,
  getIronSession,
} from "iron-session";

export const sessionOptions: SessionOptions = {
  password: "j4PbGWknF8sBcwQgV9MZXTRLHDphUryCJEfm",
  cookieName: "cookieLutweetAuth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export interface SessionData {
  user: {
    email: string;
    name: string;
  };
  isLoggedIn: boolean;
  ok?: boolean;
}

export const defaultSession: SessionData = {
  user: {
    email: "",
    name: "",
  },
  isLoggedIn: false,
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

declare module "iron-session" {
  interface IronSessionData {
    user?: { email: string; name: string };
  }
}

const getSession = async (req: Request, res: Response) => {
  const session = getIronSession(req, res, sessionOptions);
  return session;
};

export { getSession };
