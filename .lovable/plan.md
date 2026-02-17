

## Plan: Real Instagram OAuth Integration with Logout Button

### Overview
Replace the simulated Instagram login with a real Instagram Graph API OAuth 2.0 flow, add login/logout toggle in navigation, remove all mock data from analytics pages, and create a dedicated folder for Instagram auth files. All API keys and OAuth credentials will use placeholder constants with clear comments for where to add real values.

### Changes Summary

#### 1. Create `src/instagram/` folder with auth files

**`src/instagram/config.ts`** - Central config file with all placeholders:
- `INSTAGRAM_APP_ID` - placeholder for Facebook App ID
- `INSTAGRAM_APP_SECRET` - placeholder (comment: only use server-side)
- `INSTAGRAM_REDIRECT_URI` - placeholder for OAuth redirect URL
- `GRAPH_API_BASE_URL` - Instagram Graph API base
- Required permissions/scopes
- Clear comments on each field explaining where to get the value

**`src/instagram/auth.ts`** - OAuth flow functions:
- `getInstagramAuthUrl()` - builds the OAuth authorization URL
- `exchangeCodeForToken(code)` - exchanges auth code for access token (placeholder for server-side call)
- `getInstagramUserProfile(accessToken)` - fetches real user profile via Graph API
- `getInstagramUserMedia(accessToken)` - fetches real user posts via Graph API
- `getMediaInsights(accessToken, mediaId)` - fetches real post insights (likes, reach, impressions, etc.)

**`src/instagram/types.ts`** - TypeScript interfaces for Instagram API responses

#### 2. Update `src/contexts/InstagramAuthContext.tsx`
- Remove ALL mock/sample user data and posts
- `login()` now redirects to Instagram OAuth URL (using `getInstagramAuthUrl()`)
- Add `handleOAuthCallback(code)` to process the redirect callback
- `user` and `recentPosts` populated from real API calls
- `logout()` clears token and user state
- Store access token in localStorage
- On app load, check for stored token and restore session

#### 3. Update Navigation (`src/components/ui/navigation.tsx`)
- Import `useInstagramAuth` context
- When `isConnected === false`: show "Login" button (as current)
- When `isConnected === true`: replace "Login" button with a "Logout" button that calls `logout()`
- Optionally show user's profile picture next to logout

#### 4. Update Login Page (`src/pages/Login.tsx`)
- Instagram button calls the real OAuth redirect
- After login, show profile picture and "Logout" button instead of login button
- Keep Google button as-is

#### 5. Create OAuth Callback Route
- New page `src/pages/InstagramCallback.tsx` to handle the redirect from Instagram
- Extracts `code` from URL params
- Calls `handleOAuthCallback(code)` from context
- Redirects to analytics or home page after success
- Add route in `App.tsx`: `/auth/instagram/callback`

#### 6. Update Analytics Pages (remove all mock data)
All analytics sub-pages already gate on `isConnected` and read from `user.recentPosts`. Since we are removing mock data from the context, they will now show only real posts after real login. Specific changes:

- **`AnalyticsPage.tsx`** - No mock data changes needed (already reads from context)
- **`RealTimeAnalyticsPage.tsx`** - Remove hardcoded fallback calculations; use real insights from API
- **`AudienceInsightsPage.tsx`** - Remove the `getAudienceData()` function with fake demographics; show a "coming soon" or call real insights API
- **`PerformanceReportsPage.tsx`** - Remove `getInsights()` hardcoded strings; use real metrics from API

### Technical Details

#### File Structure
```text
src/
  instagram/
    config.ts        -- All API placeholders with comments
    auth.ts          -- OAuth + Graph API functions
    types.ts         -- TypeScript interfaces
  contexts/
    InstagramAuthContext.tsx  -- Updated (no mock data)
  pages/
    InstagramCallback.tsx    -- OAuth callback handler
```

#### Placeholder Format Example (config.ts)
```typescript
// ===== INSTAGRAM GRAPH API CONFIGURATION =====
// Replace these placeholders with your actual credentials

// Your Facebook App ID (found in Facebook Developer Dashboard)
// Go to: https://developers.facebook.com/apps/ -> Your App -> Settings -> Basic
export const INSTAGRAM_APP_ID = 'YOUR_FACEBOOK_APP_ID_HERE';

// Your Facebook App Secret (KEEP THIS SECRET - use server-side only)
// Go to: https://developers.facebook.com/apps/ -> Your App -> Settings -> Basic
export const INSTAGRAM_APP_SECRET = 'YOUR_FACEBOOK_APP_SECRET_HERE';

// The redirect URI registered in your Facebook App
// Must match exactly what you set in: Facebook App -> Facebook Login -> Settings -> Valid OAuth Redirect URIs
export const INSTAGRAM_REDIRECT_URI = 'YOUR_REDIRECT_URI_HERE';
```

#### OAuth Flow
1. User clicks "Login with Instagram" -> redirects to Instagram authorization URL
2. User authorizes -> Instagram redirects to `/auth/instagram/callback?code=XXX`
3. Callback page exchanges code for access token
4. Access token used to fetch profile + media + insights
5. Data stored in context, token in localStorage

#### Navigation Login/Logout Toggle
- Checks `isConnected` from `useInstagramAuth()`
- Logged out: shows "Login" link to `/login`
- Logged in: shows user avatar + "Logout" button calling `logout()`

