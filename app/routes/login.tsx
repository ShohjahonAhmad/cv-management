import { Trans, useTranslation } from "react-i18next";
import GitHub from "~/utils/GitHub";
import Google from "~/utils/Google";

export default function Login() {
  const login = (provider: "google" | "github") => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
  };
  const { t } = useTranslation();
  return (
    <main className="flex-1 flex items-center justify-center px-16 py-14">
      <div className="w-full max-w-sm flex flex-col">
        <h2 className="font-bold text-2xl text-[#111111] tracking-[-0.5px]">
          {t("page.auth.title")}
        </h2>
        <p className="text-sm mt-1.5 text-zinc-500">
          {t("page.auth.subtitle")}
        </p>
        <hr className="my-8 border-0 h-px bg-[#e8e8e4]" />
        <div className="flex flex-col gap-3">
          <button
            onClick={() => login("google")}
            className="flex items-center justify-center gap-3 w-full border border-border rounded-lg py-3 bg-white text-sm font-medium color text-[#111111]"
          >
            <Google />
            <span>{t("page.auth.googleSignIn")}</span>
          </button>
          <button
            onClick={() => login("github")}
            className="flex items-center justify-center gap-3 w-full rounded-lg py-3 bg-[#111111] text-sm font-medium text-white"
          >
            <GitHub />
            <span>{t("page.auth.githubSignIn")}</span>
          </button>
        </div>
        <p className="text-xs text-[#a1a1aa] mt-8 text-center leading-[1.6]">
          <Trans
            i18nKey="page.auth.agreement"
            components={{
              terms: (
                <a
                  className="mx-1 underline text-[#71717a]"
                  href="https://github.com/ShohjahonAhmad/cv-management"
                />
              ),
              privacy: (
                <a
                  className="mx-1 underline text-[#71717a]"
                  href="https://github.com/ShohjahonAhmad/cv-management"
                />
              ),
            }}
          ></Trans>
        </p>
      </div>
    </main>
  );
}
