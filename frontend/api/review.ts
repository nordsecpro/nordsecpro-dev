import axios from 'axios';

const NEXT_BACKEND_URL =
  `${process.env.NEXT_PUBLIC_BACKEND_URL}` || 'http://localhost:5000';

const getReviews = async (page: number, limit = 3) => {
  const res = await axios.get(`${NEXT_BACKEND_URL}/api/trustpilot/reviews`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      page,
      limit,
    },
  });
  return res.data;
};

const getProfile = async () => {
  const res = await axios.get(`${NEXT_BACKEND_URL}/api/trustpilot/profile`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export { getReviews, getProfile };
