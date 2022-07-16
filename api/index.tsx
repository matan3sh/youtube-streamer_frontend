import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;
const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
const videosBase = `${base}/api/videos`;

export async function registerUser(payload: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) {
  const res = await axios.post(userBase, payload);
  return res.data;
}

export async function loginUser(payload: { email: string; password: string }) {
  const res = await axios.post(authBase, payload, {
    withCredentials: true,
  });
  return res.data;
}
