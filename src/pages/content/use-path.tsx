import { createContext, useContext, useEffect, useState } from "react";

const getPathParts = (fullPath: string) => {
  const [tradeLit, searchLit, league, tradeString] = fullPath
    .split("/")
    .filter(Boolean);

  if (tradeLit !== "trade" || searchLit !== "search" || !league)
    return {
      tradeString: "",
      basePath: fullPath,
    };

  return {
    tradeString: tradeString || "",
    basePath: `/${tradeLit}/${searchLit}/${league}`,
  };
};

const PathContext = createContext({
  ...getPathParts(window.location.pathname),
  history: null,
});

export const PathProvider = ({ children }: { children: React.ReactNode }) => {
  const [basePath, setBasePath] = useState(window.location.pathname);
  const [tradeString, setTradeString] = useState("");
  const [history, setHistory] = useState(window.history.state);

  useEffect(() => {
    const handleUrlChange = () => {
      const { basePath, tradeString: newTradeString } = getPathParts(
        window.location.pathname,
      );
      setBasePath(basePath);
      setTradeString(newTradeString);
      if (newTradeString !== tradeString) setHistory(window.history.state);
    };

    const intervalId = setInterval(() => {
      handleUrlChange();
    }, 500);

    return () => clearInterval(intervalId);
  }, [tradeString]);

  console.log({
    tradeString,
    history,
  });

  return (
    <PathContext.Provider value={{ basePath, tradeString, history }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => useContext(PathContext);
export const useTradePath = (tradeString: string) => {
  const { basePath, tradeString: currentTradeString } = usePath();

  return {
    tradePath: `${basePath}/${tradeString}`,
    isActive: tradeString === currentTradeString,
  };
};
