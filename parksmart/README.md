# ParkSmart (prototype)

Smart parking and journey planning for Bengaluru commuters. A clickable front-end prototype built with plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run it
Open `index.html` in a browser. (Or serve the folder: `python3 -m http.server` and visit http://localhost:8000.)

## Files
- `index.html`: page shell
- `styles.css`: styles (light and dark mode, responsive: phone, tablet, desktop)
- `app.js`: all app logic and screens

## What is in it
- Demo sign-in (phone + OTP 1234, email, or guest) and log out
- Onboarding: who you are (commuter, cab driver, Gen Z/student, parking owner) and what services you need
- Parking operator listings, operator pages, map, booking, payment, journey, feedback
- AI-style recommendation (rules-based scoring of drive, park and ride, public transport)
- Driver Hub, Rewards, split bill, English/Kannada/Hindi (partial)
- Parking owners can list their own parking; it then appears to commuters in this browser
- Partner dashboards (operator, ParkSmart team, transit and city, merchant) exist in the code but are not linked from the commuter UI

## Important
- All data is simulated. No real payments, maps, traffic, SMS or accounts.
- Sign-in is a demo: passwords are not stored or checked.
- Data is saved per account in the browser's localStorage only.
- Operator names, ratings and prices are sample data.
- Kannada and Hindi text should be reviewed by a native speaker.

## Next steps for a real product
Backend and database, real authentication (OTP provider), payment gateway (UPI), maps and traffic APIs, live parking inventory, operator verification, native apps.
