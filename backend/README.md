# Backend Server - Avurudu Ulela

Basic Node.js/Express server to serve the React frontend build.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the React frontend first:**
   ```bash
   cd ../frontend
   npm run build
   cd ../backend
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## Configuration

- **Port**: Default is `5050`. Set `PORT` environment variable to change it.
  ```bash
   PORT=3000 npm start
   ```

## How it works

- Serves static files from `../frontend/build`
- All routes (except API routes) serve the React app's `index.html`
- API routes can be added in `server.js` before the catchall route

## API Routes

Add your API routes in `server.js` before the catchall handler:

```javascript
app.get('/api/example', (req, res) => {
  res.json({ message: 'API endpoint' });
});
```

## Production Deployment

1. Build the React app: `cd ../frontend && npm run build`
2. Start the server: `cd ../backend && npm start`
3. The server will serve the React app on the configured port

