export interface User {
  id?: string;
  username: string;
  password: string;
}

export interface UrlInput {
  token?: string | null;
  originalUrl?: string;
}

export interface Url {
  shortUrl?: string;
  originalUrl?: string;
  user: User;
}
