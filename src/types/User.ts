export interface user {
  id?: string;
  username: string;
  password: string;
}

export interface UrlInput {
  token?: string | null;
  originalUrl?: string;
}

export interface url {
  shortUrl?: string;
  originalUrl?: string;
  token?: string | null;
  user: user;
}
