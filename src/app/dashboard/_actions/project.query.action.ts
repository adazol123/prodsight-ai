import { getAccessToken } from "@/utils/supabase/client";
import axios from "axios";

export const PROJECTBYID_KEY = "project_by_id";
export const queryProjectById = async (projectId: string) => {
  try {
    const accessToken = await getAccessToken();
    const { status, data } = await axios.get(`/api/v1/project/${projectId}`, {
      headers: { access_token: accessToken },
    });

    if (status !== 200) {
      throw new Error("Error fetching projects");
    }

    return {
      result: data.result,
    };
  } catch (error) {
    return {
      error,
    };
  }
};
