import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODM0MDRhYTM1NTFhMmFlMTA4YmE2MGEiLCJlbWFpbCI6InRhaHNpbi5iZGNhbGxpbmdAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ4MzQ3MTEwLCJleHAiOjE3NDg0MzM1MTB9._h0QyhBD6kgPSx6faYrbYwdTeD6GkgxLbdFUWP-RowU"

const axiosInstance = axios.create({
    baseURL : `${process.env.NEXT_PUBLIC_API_URL}`,
    headers : {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
})

const useAxios = () => {
  return axiosInstance;
}

export default useAxios