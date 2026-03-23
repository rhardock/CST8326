# RonaldHardockPOC

A simple Node.js/Express food menu proof-of-concept application.

## Architecture

- **Runtime**: Node.js 20
- **Framework**: Express 5
- **Frontend**: Static HTML (served by Express from `public/`)
- **Backend**: Express REST API

## Project Structure

```
RonaldHardockPOC/
  server/
    server.js       - Express server, serves static files and API routes
    food-model.js   - Singleton in-memory food data model
  public/
    index.html      - Frontend UI that fetches and displays menu items
  tests/
    products.test.js - Jest tests for the API
  package.json
```

## Running the App

The app runs on port 5000 (required for Replit webview).

```bash
cd RonaldHardockPOC && node server/server.js
```

## API Routes

- `GET /foods` - Returns all food items as JSON
- Static files served from `public/`

## Dependencies

- **express** ^5.2.1 - Web framework
- **jest** ^30.3.0 (dev) - Testing
- **supertest** ^7.2.2 (dev) - HTTP testing
