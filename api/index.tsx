import axios from "axios";
import { Video } from "../types";

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

export async function getLoggedInUser() {
  try {
    const res = await axios.get(userBase, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function uploadVideo({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) {
  const res = await axios.post(videosBase, formData, {
    ...config,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function updateVideo({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) {
  return await axios.patch<Video>(`${videosBase}/${videoId}`, payload, {
    withCredentials: true,
  });
}
