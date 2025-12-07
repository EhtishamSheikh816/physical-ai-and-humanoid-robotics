# GitHub OAuth API Contract

## Overview
This document describes the OAuth integration contract for user authentication and progress tracking using GitHub services.

## Authentication Flow

### 1. Authorization Request
**Endpoint**: `https://github.com/login/oauth/authorize`
**Method**: GET
**Parameters**:
- `client_id`: (string, required) GitHub OAuth App client ID
- `redirect_uri`: (string, required) Callback URL for authentication response
- `scope`: (string, required) Permissions requested ("gist" for progress tracking)
- `state`: (string, required) CSRF protection token

**Example Request**:
```
GET https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/auth/callback&scope=gist&state=CSRF_TOKEN
```

### 2. Token Exchange
**Endpoint**: `https://github.com/login/oauth/access_token`
**Method**: POST
**Headers**:
- `Content-Type`: application/json
- `Accept`: application/json

**Body**:
```json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "code": "AUTHORIZATION_CODE",
  "redirect_uri": "http://localhost:3000/auth/callback"
}
```

**Response**:
```json
{
  "access_token": "ACCESS_TOKEN",
  "token_type": "bearer",
  "scope": "gist"
}
```

## Gist API for Progress Tracking

### 1. Create User Progress Gist
**Endpoint**: `https://api.github.com/gists`
**Method**: POST
**Headers**:
- `Authorization`: token ACCESS_TOKEN
- `Accept`: application/vnd.github.v3+json

**Body**:
```json
{
  "description": "Physical AI Textbook Progress",
  "public": false,
  "files": {
    "progress.json": {
      "content": "{ \"chapters\": {}, \"capstone\": {}, \"lastUpdated\": \"TIMESTAMP\" }"
    }
  }
}
```

**Response**:
```json
{
  "id": "GIST_ID",
  "url": "https://api.github.com/gists/GIST_ID",
  "files": {
    "progress.json": {
      "content": "{ \"chapters\": {}, \"capstone\": {}, \"lastUpdated\": \"TIMESTAMP\" }"
    }
  }
}
```

### 2. Get User Progress
**Endpoint**: `https://api.github.com/gists/{GIST_ID}`
**Method**: GET
**Headers**:
- `Authorization`: token ACCESS_TOKEN
- `Accept`: application/vnd.github.v3+json

**Response**:
```json
{
  "id": "GIST_ID",
  "files": {
    "progress.json": {
      "content": "{ \"chapters\": { \"chapter-id\": { \"completed\": true, \"progress\": 100 } }, \"capstone\": {}, \"lastUpdated\": \"TIMESTAMP\" }"
    }
  }
}
```

### 3. Update User Progress
**Endpoint**: `https://api.github.com/gists/{GIST_ID}`
**Method**: PATCH
**Headers**:
- `Authorization`: token ACCESS_TOKEN
- `Accept`: application/vnd.github.v3+json

**Body**:
```json
{
  "files": {
    "progress.json": {
      "content": "{ \"chapters\": { \"new-chapter\": { \"completed\": true, \"progress\": 100 } }, \"lastUpdated\": \"NEW_TIMESTAMP\" }"
    }
  }
}
```

## Error Handling

### Common Error Responses
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Invalid or expired access token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource does not exist
- `422 Validation Failed`: Validation errors in request

### Error Response Format
```json
{
  "message": "Error description",
  "documentation_url": "URL to relevant documentation"
}
```

## Rate Limits
- Authenticated requests: 5000 requests per hour
- Unauthenticated requests: 60 requests per hour
- Gist-specific limits apply per GitHub's API documentation