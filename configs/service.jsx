const { default: axios } = require('axios');

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const getVideos = async (query) => {
  const params = {
    part: 'snippet',
    maxResults: 1,
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    q: query,
    type: 'video',
  };

  const response = await axios.get(YOUTUBE_BASE_URL, { params });
  return response.data.items;
};

export default { getVideos };
