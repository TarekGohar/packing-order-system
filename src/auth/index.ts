import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  email?: string;
  img?: string;
  isLoggedIn?: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "gtsession",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    sameSite: true,
  },
  ttl: 24 * 60 * 60, // 24 hours
};
