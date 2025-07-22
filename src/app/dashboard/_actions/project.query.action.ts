import { getAccessToken } from "@/utils/supabase/client";
import axios from "axios";

export const PROJECTBYID_KEY = "project_by_id";
export const queryProjectById = async <T extends object>(projectId: string) => {
  try {
    const accessToken = await getAccessToken();
    const { status, data } = await axios.get(`/api/v1/projects/${projectId}`, {
      headers: { access_token: accessToken },
    });

    if (status !== 200) {
      throw new Error("Error fetching projects");
    }

    return {
      result: data.result as T,
    };
  } catch (error) {
    return {
      error,
    };
  }
};
