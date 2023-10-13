import axios from 'axios';

// If in production will use backend url if in dev will use proxy set in package.json
const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.BACKEND_URL
      : null,
});

export default api;