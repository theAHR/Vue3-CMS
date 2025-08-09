const config = {
  development: {
    baseURL: 'https://apilanding.trustedtsp.ir',
    imageBaseURL: 'https://apilanding.trustedtsp.ir/images/',
    videoBaseURL: 'https://apilanding.trustedtsp.ir/videos/',
    fileBaseURL: 'https://apilanding.trustedtsp.ir/files/'
  },
  production: {
    baseURL: 'https://apilanding.sadadtsp.ir',
    imageBaseURL: 'https://apilanding.sadadtsp.ir/images/',
    videoBaseURL: 'https://apilanding.sadadtsp.ir/videos/',
    fileBaseURL: 'https://apilanding.sadadtsp.ir/files/'
  }
};

const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
const currentEnv = isDevelopment ? 'development' : 'production';

export const apiConfig = config[currentEnv];

export const {
  baseURL,
  imageBaseURL,
  videoBaseURL,
  fileBaseURL
} = apiConfig;

export default apiConfig; 