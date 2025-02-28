# Personalized Postcards - React Native

- **Backend Setup**:
  - Created an Express server to handle API requests for saving and fetching image data.
  - Integrated SQLite3 as a lightweight database for storing image URIs and their metadata.
  - Implemented API routes:
    - `POST /images`: To save a new image URI to the database.
    - `GET /images`: To fetch the image history from the database.
  - Set up basic error handling and response formatting.

- **Frontend Integration**:
  - Updated frontend state management to handle image history via the backend.
  - Added a new `ADD_IMAGE_HISTORY` action to reducer to update the `imageHistory` state from backend data.
  - Refactored reducer to include the `ADD_IMAGE_HISTORY` action for handling image history updates.
  - Modified `Cards` component to fetch and display images from the backend on initial load.
  - Implemented `useEffect` hook to fetch image data from the backend and populate the reducer store when the app initializes.
  - Enhanced dispatch logic to save image history to the backend after taking a new photo and update the frontend.

- **Backend and Frontend Connection**:
  - Added Axios requests to interact with backend API for saving and fetching images.
  - Configured reducer to handle new state updates for image history from the backend.
  - Ensured the frontend correctly updates and displays images after fetching from the backend or adding new images.

- **Refactor Reducer and Actions**:
  - Added a new action type `ADD_IMAGE_HISTORY` to manage the image history in reducer.
  - Refactored the reducer to support adding a new image and maintaining the latest 10 images in the state.

- **Database**:
  - Created a SQLite3 database schema to store images with their URIs.
  - Used Sequelize for interacting with the SQLite database for storing and retrieving image data.

