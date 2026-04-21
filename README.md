# KeenKeeper — Keep Your Friendships Alive

## About The Project

KeenKeeper is a friendship management web application that helps users stay connected with the people who matter most. The app lets you track when you last reached out to friends, log interactions like calls, texts, and video chats, and visualize your communication patterns over time. Each friend has a dedicated profile page where you can see their contact history, set relationship goals, and quickly log a new check-in with a single click. The timeline page keeps a running log of every interaction, and the stats page gives you a visual breakdown of how you communicate. The whole project is fully responsive and works great on mobile, tablet, and desktop.

## Technologies I Used

**React.js** - For building the UI with reusable components and managing application state
**React Router DOM** - For handling client-side navigation between Home, Timeline, Stats, and Friend Detail pages
**Tailwind CSS** - For styling everything quickly and building a fully responsive layout
**DaisyUI** - As a Tailwind component plugin for cards, badges, buttons, and modals
**Recharts** - For rendering the pie chart on the Friendship Analytics page
**React Toastify** - For showing toast notifications when users log check-ins
**SVG Icons** - For all icons across the navbar, buttons, cards, and timeline entries
**Vite** - As the build tool for fast development and optimized production builds


## Key Features



**Friend Tracking with Status System** - Every friend card on the home page shows how many days have passed since your last contact, along with a color-coded status badge that updates automatically based on whether you are on-track, almost due, or overdue. This gives you an instant visual overview of which friendships need attention without reading any numbers.

**Interactive Check-In Logging** - On each friend's detail page, you can log a Call, Text, or Video interaction with a single button click. The interaction is instantly added to the global timeline with the current date, the correct icon, and a properly formatted title. A toast notification confirms every action so nothing happens silently, and all entries persist across page navigation using React state lifted to the app level.

**Friendship Analytics with Pie Chart** - The Stats page uses Recharts to render a pie chart that breaks down all your logged interactions by type, showing exactly how many calls, texts, and video chats you have had across all friends. The Timeline page also includes filter buttons so you can isolate entries by interaction type, making it easy to review specific communication patterns at a glance.
