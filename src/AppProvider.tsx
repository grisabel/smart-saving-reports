import { BrowserRouter } from "react-router-dom";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default AppProvider;
