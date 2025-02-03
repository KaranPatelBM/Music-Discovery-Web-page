# Music Discovery Webpage

## Overview

This project is a **Music Discovery Webpage** built using **React.js**. The main goal of this application is to provide users with the ability to explore trending music, discover new songs, albums, and artists. The data is sourced from the **Last.fm API**, which provides information about the most popular tracks across the world.

## Key Features

- **Trending Music**: Users can view a list of trending music tracks in real time.
- **Search Functionality**: Users can search for tracks, albums, or artists by name.
- **Audio Preview**: Clicking on a track will allow users to play a 30-second preview of the song (if available).
- **Responsive Design**: The interface adapts to different screen sizes for a seamless experience on desktops and mobile devices.

## Technology Stack

- **Frontend**: React.js
- **API**: Last.fm API (https://www.last.fm/api) for fetching trending music data.
- **Styling**: Custom CSS for the layout and responsive design.

## How It Works

This web application uses React's **useState** and **useEffect** hooks to manage the state and handle side effects. When the component mounts, it makes an API request to **Last.fm** to fetch the top tracks using the `chart.gettoptracks` method from the Last.fm API. The tracks are then displayed to the user in a list format, and users can interact with them to play previews.

- **Search**: A search bar allows the user to filter the displayed tracks based on their query. The search checks both the track name and the artist name.
- **Play/Pause Audio**: Users can play a 30-second preview of any track that has an available preview URL. Clicking on a track will either start or stop the audio playback.

## Installation

1. Clone the repository:
2. Navigate into the project directory:
3. Install dependencies:
4. Start the development server:

The app will be available at `http://localhost:5174`.

## Acknowledgments
Last.fm API: Provides the music data for this application.
React.js: A JavaScript library for building user interfaces

## Environment Variables

The application makes use of the **Last.fm API** to fetch music data. You will need to replace the placeholder API key in `HomePage.jsx` with your own API key.

```javascript
const apiKey = 'YOUR_LASTFM_API_KEY'; // Replace with your actual API key
.
