import {
  IronSessionOptions,
  getIronSession,
  IronSessionData,
} from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: "j4PbGWknF8sBcwQgV9MZXTRLHDphUryCJEfm",
  cookieName: "cookieLutweetAuth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: { email: string; name: string };
  }
}

const getSession = async (req: Request, res: Response) => {
  const session = getIronSession<IronSessionData>(req, res, sessionOptions);
  return session;
};

export { getSession };
