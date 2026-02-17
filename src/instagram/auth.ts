// ===== Instagram Graph API Auth & Data Functions =====
import {
  INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET,
  INSTAGRAM_REDIRECT_URI,
  INSTAGRAM_SCOPES,
  GRAPH_API_BASE_URL,
  FACEBOOK_GRAPH_API_URL,
} from './config';
import type {
  InstagramTokenResponse,
  InstagramLongLivedTokenResponse,
  InstagramGraphUser,
  InstagramGraphMedia,
  InstagramMediaResponse,
  InstagramInsightsResponse,
} from './types';

// -----------------------------------------------------------------------
// Step 1: Build the Instagram OAuth Authorization URL
// Redirects the user to Instagram's login page.
// -----------------------------------------------------------------------
export function getInstagramAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: INSTAGRAM_APP_ID,       // <-- YOUR APP ID goes in config.ts
    redirect_uri: INSTAGRAM_REDIRECT_URI, // <-- YOUR REDIRECT URI goes in config.ts
    scope: INSTAGRAM_SCOPES,
    response_type: 'code',
  });

  return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
}

// -----------------------------------------------------------------------
// Step 2: Exchange the authorization code for a short-lived access token
// NOTE: In production, this should be done SERVER-SIDE to protect your App Secret.
//       For now, this runs client-side with a placeholder App Secret.
// -----------------------------------------------------------------------
export async function exchangeCodeForToken(code: string): Promise<InstagramTokenResponse> {
  const formData = new URLSearchParams({
    client_id: INSTAGRAM_APP_ID,           // <-- YOUR APP ID goes in config.ts
    client_secret: INSTAGRAM_APP_SECRET,   // <-- YOUR APP SECRET goes in config.ts (move to server in production!)
    grant_type: 'authorization_code',
    redirect_uri: INSTAGRAM_REDIRECT_URI,  // <-- YOUR REDIRECT URI goes in config.ts
    code,
  });

  const response = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error_message || 'Failed to exchange code for token');
  }

  return response.json();
}

// -----------------------------------------------------------------------
// Step 3: Exchange short-lived token for a long-lived token (60 days)
// -----------------------------------------------------------------------
export async function getLongLivedToken(shortLivedToken: string): Promise<InstagramLongLivedTokenResponse> {
  const params = new URLSearchParams({
    grant_type: 'ig_exchange_token',
    client_secret: INSTAGRAM_APP_SECRET, // <-- YOUR APP SECRET goes in config.ts
    access_token: shortLivedToken,
  });

  const response = await fetch(`${GRAPH_API_BASE_URL}/access_token?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to get long-lived token');
  }

  return response.json();
}

// -----------------------------------------------------------------------
// Step 4: Fetch the authenticated user's Instagram profile
// Docs: https://developers.facebook.com/docs/instagram-api/reference/user
// -----------------------------------------------------------------------
export async function getInstagramUserProfile(accessToken: string): Promise<InstagramGraphUser> {
  const fields = 'id,username,name,account_type,media_count,followers_count,follows_count,profile_picture_url';

  const response = await fetch(
    `${GRAPH_API_BASE_URL}/me?fields=${fields}&access_token=${accessToken}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Instagram user profile');
  }

  return response.json();
}

// -----------------------------------------------------------------------
// Step 5: Fetch the user's recent media (posts)
// Docs: https://developers.facebook.com/docs/instagram-api/reference/user/media
// -----------------------------------------------------------------------
export async function getInstagramUserMedia(
  accessToken: string,
  limit: number = 25
): Promise<InstagramMediaResponse> {
  const fields = 'id,media_type,media_url,permalink,caption,timestamp,like_count,comments_count,thumbnail_url';

  const response = await fetch(
    `${GRAPH_API_BASE_URL}/me/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Instagram user media');
  }

  return response.json();
}

// -----------------------------------------------------------------------
// Step 6: Fetch insights for a specific media item
// Docs: https://developers.facebook.com/docs/instagram-api/reference/ig-media/insights
// Available metrics for IMAGE/VIDEO: impressions, reach, engagement, saved
// -----------------------------------------------------------------------
export async function getMediaInsights(
  accessToken: string,
  mediaId: string
): Promise<InstagramInsightsResponse> {
  const metrics = 'impressions,reach,engagement,saved';

  const response = await fetch(
    `${GRAPH_API_BASE_URL}/${mediaId}/insights?metric=${metrics}&access_token=${accessToken}`
  );

  if (!response.ok) {
    // Insights may not be available for all media types (e.g., carousel children)
    console.warn(`Could not fetch insights for media ${mediaId}`);
    return { data: [] };
  }

  return response.json();
}
