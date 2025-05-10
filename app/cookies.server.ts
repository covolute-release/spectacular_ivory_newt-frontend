import { createCookie, createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

export const medusaJWT = createCookie("_medusa_jwt", {
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
});

export const medusaCartId = createCookie("_medusa_cart_id", {
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
});

const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    ...(isProduction ? { secure: true } : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
