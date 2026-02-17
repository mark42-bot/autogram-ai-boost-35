// ===== Instagram Graph API TypeScript Types =====

/** Raw token response from Facebook OAuth */
export interface InstagramTokenResponse {
  access_token: string;
  token_type: string;
  expires_in?: number;
}

/** Long-lived token response */
export interface InstagramLongLivedTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/** Instagram user profile from Graph API */
export interface InstagramGraphUser {
  id: string;
  username: string;
  name?: string;
  account_type: string;
  media_count: number;
  followers_count?: number;
  follows_count?: number;
  profile_picture_url?: string;
}

/** Instagram media item from Graph API */
export interface InstagramGraphMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  thumbnail_url?: string;
}

/** Media insights from Graph API */
export interface InstagramMediaInsight {
  name: string;
  period: string;
  values: Array<{
    value: number;
  }>;
  title: string;
  description: string;
  id: string;
}

/** Paginated media response */
export interface InstagramMediaResponse {
  data: InstagramGraphMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

/** Insights response */
export interface InstagramInsightsResponse {
  data: InstagramMediaInsight[];
}
