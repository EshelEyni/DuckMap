import { JsendResponse } from "../../../shared/types/system";
import { QueryState } from "../types/app";

function handleServerResponse<T>(response: JsendResponse): T {
  if (response.status === "success") {
    return response.data;
  } else if (response.status === "fail") {
    const errorMessages = Object.entries(response.data)
      .map(([field, message]) => `${field}: ${message}`)
      .join(", ");
    throw new Error(errorMessages);
  } else {
    throw new Error("Unexpected response status");
  }
}

const QUERY_TIMEOUT = 3000;

const defaultQueryState: QueryState = { state: "idle", error: null };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getErrorMessage(error: any) {
  return error.response.data.message;
}

export {
  handleServerResponse,
  QUERY_TIMEOUT,
  defaultQueryState,
  getErrorMessage,
};
