import axios, { AxiosError } from 'axios';

import { ErrorEventBus } from 'src/utils/eventBus';

const axiosApiInstance = axios.create();

type ApiError = {
  status: number;
  message: string;
};

// Response interceptor to get error message and emit new 'responseError' event with it
// We listen to 'responseError' event in Snackbar provider to show errors in the app
axiosApiInstance.interceptors.response.use(
  (value) => value,
  (error: AxiosError<ApiError>) => {
    ErrorEventBus.emit('responseError', error.response?.data?.message);

    return Promise.reject(error);
  }
);

export default axiosApiInstance;
