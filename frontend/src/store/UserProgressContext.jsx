import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "", //cart, checkout
  showCart: () => {},
  showCheckout: () => {},
  resetProgress: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  const progressCtx = {
    progress: userProgress,
    showCart: () => setUserProgress("cart"),
    showCheckout: () => setUserProgress("checkout"),
    resetProgress: () => setUserProgress(""),
  };

  return (
    <UserProgressContext.Provider value={progressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
