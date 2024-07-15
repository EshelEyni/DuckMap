import { BaseDuck, Duck } from "../../../shared/types/system";
import { httpService } from "./httpService";
import { handleServerResponse } from "./utilService";

const baseUrl = "duck";

async function query() {
  try {
    const response = await httpService.get(baseUrl);
    return handleServerResponse<Duck[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function create(duck: BaseDuck) {
  try {
    const response = await httpService.post(baseUrl, duck);
    return handleServerResponse<Duck>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  query,
  create,
};
