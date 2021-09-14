# React App with Youtube Data API

React.js Web Application

This project is built by integrating Youtube Data API to get video urls and embed into an iframe player.

Before running the app:
1. Please follow the <a href="https://developers.google.com/youtube/v3/getting-started">Youtube API Explorer</a> to create an API key
2. Replace your newly created API key to `YTAPI.API_KEY` in `src/class/YTAPI.js`
3. Install Node.js from https://nodejs.org/en/
4. Navigate to the project folder, install `axios` library by typing `npm install axios` in Visual Studio Code terminal
5. Finally, you can now run the app by typing `npm start` in the VS Code terminal

Dependencies:
- CSS library `Bootstrap 5` is included in `public/index.html` via CDN to perform some simple styling (without responsive mobile view).
- `axios` library is installed to aid the process of sending network requests to the Youtube Data API. 
