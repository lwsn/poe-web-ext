import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getLeagues = () => {
  try {
    const scriptTag = window.document
      .querySelectorAll("script")
      .values()
      .map((v) => v.innerText)
      .filter(Boolean)
      .find((v) => v.includes("leagues"));

    if (!scriptTag) throw new Error("League raw not found");

    const [, leaguesRaw] = scriptTag.match(/"leagues":(\[\{.*\}\])/) || [];

    if (!leaguesRaw) throw new Error("League raw not matched");

    console.log(leaguesRaw);

    const leagues = (
      JSON.parse(leaguesRaw || "") as {
        id: string;
        realm: string;
        text: string;
      }[]
    ).filter(({ realm }) => realm === "pc");

    return leagues;
  } catch (e) {
    console.error(e);
  }

  return [];
};

export const getCurrentLeague = () => {
  const leagues = getLeagues();
  return leagues?.length ? getLeagues()[0] : undefined;
};

export const getTradeParam = () => {
  const [tradeLit, searchLit, league, param] = window.location.pathname
    .split("/")
    .filter(Boolean);
  if (tradeLit !== "trade" || searchLit !== "search" || !league || !param)
    return null;
  return param;
};
