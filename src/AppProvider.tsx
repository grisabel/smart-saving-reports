import { createContext, useContext, useState } from "react";
import Spinner from "./components/stories/atoms/Spinner/Spinner";

interface AppContextInterface {
  setLoading: (value: boolean) => void;
}

const AppContext = createContext<AppContextInterface | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const context = {
    setLoading,
  };

  return (
    <AppContext.Provider value={context}>
      {children}
      <Spinner open={loading} />
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppCtx = (): AppContextInterface => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppCtx must be used within a AppProvider");
  }
  return context;
};
