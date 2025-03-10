# Personalized Postcards App - React Native

A **React Native** application that allows users to personalize their photos by adding SVG elements and text, then save them as custom postcards.

## Features

- 🧭 **Smooth Navigation** – Built with `Expo Router` for seamless screen transitions.

- 🤳 **Image Upload & Capture** – Users can choose an image from their gallery or capture a new one using the camera.
- ✂️ **Image Cropping** – Cropping is available via `Expo Image Picker`.
- 🖍️ **SVG & Text Customization** – Add SVG elements and custom text to personalize the image.
- 🫳 **Drag, Drop & Rotate** – Implemented using `Gesture.Pan()` for drag, and `Gesture.Pinch()` for rotation.
- 🤏 **Pinch to Zoom**: Resize SVGs using `Gesture.Pinch()`.
- 🎚️ **Slide to Zoom**: Resize text using Slider from `react-native-community/slider`.
- 🖼️ **Screenshot Feature**: Captures the final postcard using `react-native-view-shot`.

- 💾 **Save & Manage Postcards** – Store customized postcards and view them later in the cards section.
- 📦 **Persistent Storage** – Saves images permanently using `expo-file-system` instead of cache storage, to prevent loss on app restart.
- 🌍 **Context API + Reducer**: Manages global state efficiently.  
- 🛬 **API Integration**: Uses `axios` to communicate with the Node.js backend.  

- 🖌️ **Custom Colors & Fonts** – Supports various Google Fonts and color selection.
- 🔁 **Animations**: Implemented using `react-native-reanimated`.
- 🎥 **Animated Home Screen** – `Lottie animation` created with `Figma`.

## Limitations
⚠️  **Device-Specific Storage**  
- Currently, the app is tied to a single device. If you switch to a new device or restart the emulator, the app may fail to retrieve previously saved images from the backend.
- This issue will be addressed in future updates.

⚠️ **No Login/Registration UI Yet**  
- The app currently does not include a UI for login or registration.
- Authentication and validation are implemented on the backend, but the frontend lacks the login and registration screens.
- The AuthContext is not yet implemented on the frontend to manage authentication state.
- ✅ The backend authentication functionality has been tested using Postman and is working as expected.



## Tech Stack

**FRONTEND (React Native & Expo)**
- **Framework:** *React Native (Expo)* 
- **Navigation:** *Expo Router*
- **State Management:** *React Context + Reducer*
- **HTTP Requests:** *Axios*
- **Animations & Gestures:**
  - *react-native-reanimated* → Used for smooth animations 
  - *Gesture Handler* → Used for drag & drop, rotate, and pinch zoom
- **Image Handling:**
  - *expo-image-picker* → Allows picking, capturing, and cropping images
  - *react-native-svg* → Renders SVG components
  - *react-native-view-shot* → Takes screenshots of the view
  - *expo-file-system* → Saves images permanently instead of cache storage
- **Custom Fonts:** *Google Fonts via expo-google-fonts*
- **UI Enhancements**: *Lottie Animations*

**BACKEND(Node.js, Express & SQLite)**

- **Database:** *SQLite* (Lightweight and efficient storage)
- **API:** *RESTful API* built with Express.js
- **Data Persistence:** Stores postcards in a database with metadata (text, colors, SVGs, etc.)

## Getting Started

1. **Clone the Repository**

``` bash
 git clone https://github.com/DianaEP/personalized-cards.git
 cd personalized-cards

```


2. **Setup the Backend**

```bash

cd backend
npm install
npm start

```

*Note*
- Backend runs on **port 5000** by default.
- Uses .env for configuration → *(Set PORT=5000 if needed)*.

**API Endpoints**

| **Method** | **Endpoint**        | **Description**                |
|------------|---------------------|--------------------------------|
| **GET**    | `/postcards`        | Fetch all saved images         |
| **POST**   | `/postcards`        | Save a new image               |
| **PUT**    | `/postcards/:id`    | Update an existing image       |
| **DELETE** | `/postcards/:id`    | Delete an image                |



3. **Setup the Frontend**

```bash

cd frontend
npm install
npm start

```



## ***Important Notes***
The app is designed to run on **Android Emulator**.
  - If testing on a **real device**, update the **API base URL** in axiosInstance with your IP Address:

```ts
  const axiosInstance = axios.create({
    baseURL: 'http://YOUR_IP_ADDRESS:5000',
    headers: {
      'Content-Type': 'application/json'
    }
  });

```
1. Open the terminal on your device and type:

```bash 

  ipconfig

```

2. Look for the IPv4 address in the output, which is your local IP address.

3. Replace **YOUR_IP_ADDRESS** with your local network IP.












