import { createContext, useContext, useState } from "react";
const TimelineContext = createContext();
const initialTimeline = [
    {
        id: 1,
        type: "meetup",
        title: "Meetup with Sara Banet",
        date: "March 26, 2026",
        timestamp: new Date("2026-03-26").getTime(),
    },
    {
        id: 2,
        type: "text",
        title: "Text with Bacon Chen",
        date: "March 25, 2026",
        timestamp: new Date("2026-03-25").getTime(),
    },
    {
        id: 3,
        type: "meetup",
        title: "Meetup with Olivia Martinez",
        date: "March 24, 2026",
        timestamp: new Date("2026-03-24").getTime(),
    },
    {
        id: 4,
        type: "video",
        title: "Video with Priya Patel",
        date: "March 23, 2026",
        timestamp: new Date("2026-03-23").getTime(),
    },
    {
        id: 5,
        type: "meetup",
        title: "Meetup with Sarah Chen",
        date: "March 22, 2026",
        timestamp: new Date("2026-03-22").getTime(),
    },
    {
        id: 6,
        type: "call",
        title: "Call with Marcus Johnson",
        date: "March 19, 2026",
        timestamp: new Date("2026-03-19").getTime(),
    },
    {
        id: 7,
        type: "meetup",
        title: "Meetup with Aisha Foster",
        date: "March 15, 2026",
        timestamp: new Date("2026-03-15").getTime(),
    },
    {
        id: 8,
        type: "text",
        title: "Text with Olivia Martinez",
        date: "March 12, 2026",
        timestamp: new Date("2026-03-12").getTime(),
    },
    {
        id: 9,
        type: "call",
        title: "Call with Lisa Nakamura",
        date: "March 11, 2026",
        timestamp: new Date("2026-03-11").getTime(),
    },
    {
        id: 10,
        type: "call",
        title: "Call with Sarah Chen",
        date: "March 8, 2026",
        timestamp: new Date("2026-03-08").getTime(),
    },
    {
        id: 11,
        type: "video",
        title: "Video with Marcus Johnson",
        date: "March 6, 2026",
        timestamp: new Date("2026-03-06").getTime(),
    },
    {
        id: 12,
        type: "video",
        title: "Video with Ryan O'Brien",
        date: "February 24, 2026",
        timestamp: new Date("2026-02-24").getTime(),
    },
];
export function TimelineProvider({ children }) {
    const [timeline, setTimeline] = useState(initialTimeline);
    const addEntry = (type, friendName) => {
        const now = new Date();
        const dateStr = now.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        const newEntry = {
            id: Date.now(),
            type,
            title: `${capitalize(type)} with ${friendName}`,
            date: dateStr,
            timestamp: now.getTime(),
        };
        setTimeline((prev) => [newEntry, ...prev]);
    };
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    return (
        <TimelineContext.Provider value={{ timeline, addEntry }}>
            {children}
        </TimelineContext.Provider>
    );
}
export function useTimeline() {
    return useContext(TimelineContext);
}