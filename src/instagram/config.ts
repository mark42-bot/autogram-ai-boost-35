// ===== INSTAGRAM GRAPH API CONFIGURATION =====
// Replace these placeholders with your actual credentials from the Facebook Developer Dashboard.

// -----------------------------------------------------------------------
// Your Facebook App ID
// Go to: https://developers.facebook.com/apps/ -> Your App -> Settings -> Basic
// Copy the "App ID" value and paste it below.
// -----------------------------------------------------------------------
export const INSTAGRAM_APP_ID = 'YOUR_FACEBOOK_APP_ID_HERE';

// -----------------------------------------------------------------------
// Your Facebook App Secret (KEEP THIS SECRET!)
// WARNING: This should only be used server-side (e.g., in an edge function).
// DO NOT expose this in client-side code in production.
// Go to: https://developers.facebook.com/apps/ -> Your App -> Settings -> Basic
// Copy the "App Secret" value and paste it below.
// -----------------------------------------------------------------------
export const INSTAGRAM_APP_SECRET = 'YOUR_FACEBOOK_APP_SECRET_HERE';

// -----------------------------------------------------------------------
// The OAuth Redirect URI
// This must match EXACTLY what you registered in your Facebook App.
// Go to: Facebook App -> Facebook Login -> Settings -> Valid OAuth Redirect URIs
// For local development, use: http://localhost:5173/auth/instagram/callback
// For production, use: https://your-domain.com/auth/instagram/callback
// -----------------------------------------------------------------------
export const INSTAGRAM_REDIRECT_URI = 'YOUR_REDIRECT_URI_HERE';

// -----------------------------------------------------------------------
// Instagram Graph API Base URL (do not change unless API version updates)
// -----------------------------------------------------------------------
export const GRAPH_API_BASE_URL = 'https://graph.instagram.com';

// -----------------------------------------------------------------------
// Facebook Graph API Base URL (used for OAuth token exchange)
// -----------------------------------------------------------------------
export const FACEBOOK_GRAPH_API_URL = 'https://graph.facebook.com/v18.0';

// -----------------------------------------------------------------------
// OAuth Scopes - the permissions your app requests
// Docs: https://developers.facebook.com/docs/instagram-basic-display-api/overview#permissions
// For Instagram Graph API (Business/Creator accounts):
//   - instagram_basic: read profile info and media
//   - instagram_manage_insights: read insights for media and account
//   - pages_show_list: required for business accounts
//   - pages_read_engagement: required to read page engagement data
// -----------------------------------------------------------------------
export const INSTAGRAM_SCOPES = [
  'instagram_basic',
  'instagram_manage_insights',
  'pages_show_list',
  'pages_read_engagement',
].join(',');
