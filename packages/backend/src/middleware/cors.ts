import cors from 'cors';

const allowedOrigins = [
  'https://fission-buidl-ai-frontend.vercel.app',
  'http://localhost:5173',
];

const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});

export default corsMiddleware;
