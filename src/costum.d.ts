import { user } from './types/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: user;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: string }
    }
  }
}
