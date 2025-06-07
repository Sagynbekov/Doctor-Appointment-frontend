# Doctor Appointment Frontend

**Doctor Appointment Frontend** is a mobile application built with React Native for scheduling appointments with doctors online. It allows users to register, browse doctors by specialization, book appointments, manage favorites, leave ratings and reviews, and for admins — to manage doctors and specializations.

---

## Features

- **User Registration & Login:** Create a new account and securely authenticate.
- **Browse Doctors:** View a list of doctors, filter by specialization, see detailed profiles (photo, experience, rating, reviews).
- **Book Appointments:** Select a doctor, choose a date and time (with live availability), and confirm your booking.
- **User Profile:** View your personal data, see your upcoming and past appointments, and leave reviews after visits.
- **Favorites:** Add doctors to your favorites for quick access.
- **Ratings & Reviews:** Rate your visit and write a review for doctors you've seen.
- **Admin Panel:** Admins can add/edit/delete doctors and specializations, and upload doctor avatars.

---

## Purpose

This app is designed to simplify the process of booking medical appointments for patients and to automate scheduling for clinics. Patients can quickly find the right specialist, see ratings and reviews, choose a convenient time slot, and book without phone calls or queues.

---

## How It Works

1. **User Registration:** Sign up and log in.
2. **Browse & Select:** Find a doctor by specialization, read reviews, check ratings.
3. **Book Appointment:** Choose an available time slot and confirm your booking.
4. **Manage Appointments:** See all your bookings in your personal profile.
5. **Leave Reviews:** After your visit, rate your doctor and leave feedback.
6. **Admin Management:** Admins manage doctors, services, and specializations via a dedicated panel.

---

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (recommended for easier development)
- Backend server (see notes below)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Sagynbekov/Doctor-Appointment-frontend.git
    cd Doctor-Appointment-frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn
    ```

3. **Configure API URL:**
    - The API URL is hardcoded as `http://192.168.0.105:8080` in several files.
    - Change this to your backend server address if needed.

4. **Start the app:**
    ```bash
    npx expo start
    ```
    - Or, for React Native CLI:
    ```bash
    npx react-native run-android
    npx react-native run-ios
    ```

5. **Backend requirements:**
    - This frontend requires a compatible backend REST API (coming soon).

---

## Project Structure

- `/screens/` — Main screens (registration, profile, doctor list, booking, favorites, etc.)
- `/components/` — Reusable UI components
- `/assets/` — Images and icons
- API endpoints are set per screen in the `API_URL` constant

---

## Tech Stack

- **React Native** (mobile app)
- **AsyncStorage** (for storing user info/tokens)
- **React Navigation** (screen navigation)
- **FontAwesome** (icons)
- **Expo** (easy development, optional)

---

## Notes

- The app distinguishes between regular users and admins.
- After booking, appointments appear in the user's profile.
- Only after visiting a doctor can users leave a review.
- Admins manage doctors and specializations from a special admin panel.
- Make sure your backend is up and reachable at the API URL specified in the code.

---

## Next Steps

- Backend development coming soon!
- Want to contribute? Open issues and pull requests are welcome.

---
