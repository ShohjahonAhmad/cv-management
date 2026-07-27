import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Toaster } from "sonner";

import type { Route } from "./+types/root";
import "./app.css";
import "./config/i18n";
import { DarkModeProvider } from "./context/DarkModeProvider";
import { useEffect } from "react";
import i18n from "./config/i18n";
import { useTranslation } from "react-i18next";
import BrandName from "./components/BrandName";
import { Bug, Home, TriangleAlert } from "lucide-react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        try {
          if (JSON.parse(localStorage.getItem('isDark') ?? 'false')) {
            document.documentElement.classList.add('dark');
          }
        } catch {}
      `,
        }}
      ></script>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    const language = localStorage.getItem("lang");

    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);
  return (
    <DarkModeProvider>
      <Outlet />
      <Toaster richColors closeButton position="top-right" />
    </DarkModeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  const { t } = useTranslation();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        title = t("error.401.title");
        details = t("error.401.details");
        break;
      case 403:
        title = t("error.403.title");
        details = t("error.403.details");
        break;
      case 404:
        title = t("error.404.title");
        details = t("error.404.details");
        break;
      default:
        title = t("error.default.title");
        details = error.statusText || t("error.default.details");
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex flex-col bg-table-header min-h-screen">
      <div className="flex items-center gap-4 px-8 py-3 bg-header border-b border-table-border">
        <BrandName />
      </div>
      <div className="flex flex-col items-center px-10 py-12 gap-4 max-w-215 w-full mx-auto text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-miss-bg border border-miss-border">
          <TriangleAlert className="w-6.5 h-6.5 text-miss-text" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-nav-text-active tracking-[-0.4px]">
            {title}
          </h1>
          <p className="text-[13px] text-nav-text mt-1.5 max-w-105">
            {details}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-header border border-table-border text-[13px] text-hr"
          >
            <Home className="w-[13px] h-[13px]" />
            {t("error.backToHome")}
          </NavLink>
        </div>
      </div>
    </main>
  );
}
