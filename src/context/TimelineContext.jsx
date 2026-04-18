import { createContext, useContext, useState } from "react";
const TimelineContext = createContext(null);
export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const addEntry = (entry) => {
    setEntries((prev) => [entry, ...prev]);
  };
  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}
export function useTimeline() {
  return useContext(TimelineContext);
}