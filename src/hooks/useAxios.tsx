import axios from 'axios';
import { useSession } from 'next-auth/react';

const useAxios = () => {
  const session = useSession();

  const token = session?.data?.user?.accessToken;

  const axiosInstance = axios.create({
      baseURL : `${process.env.NEXT_PUBLIC_API_URL}`,
      headers : {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  });

  return axiosInstance;
}

export default useAxios