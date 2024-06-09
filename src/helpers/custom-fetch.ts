import { RETRY_OPTIONS, USER_STATUS_CODE } from "constants/common";

type RetryOtp = {
  times: number;
  delay?: number;
};

const sleep = (delay: number): Promise<string> => {
  return new Promise((resolve) => setTimeout(() => resolve(""), delay));
};

export type RequestInitOptions = RequestInit & {
  customResponse?: boolean;
  contentType?: string;
};

export async function customFetch<T>(
  url: string,
  options: RequestInitOptions,
  retryOptions: RetryOtp = RETRY_OPTIONS
): Promise<T | any> {
  const { times, delay } = retryOptions;

  try {
    const defaultOptions = {
      method: "GET",
      headers: {
        "Content-Type": options?.contentType || "application/json",
        Authorization: ""
      }
    };
    const response = await fetch(url, {
      ...defaultOptions,
      ...options
    });
    if (
      response.status === USER_STATUS_CODE.UNAUTHORIZED ||
      response.status === USER_STATUS_CODE.FORBIDDEN
    ) {
      throw new Error("Miss Authentication", { cause: response });
    }
    if (response.ok) {
      const result = await response.json();
      if (options.customResponse) {
        return {
          ...result,
          status: response.statusText,
          code: response.status
        };
      }
      return result;
    }
    if (times > 0) {
      if (delay) await sleep(delay);
      return customFetch(url, options, { times: times - 1, delay });
    } else {
      const error = {
        statusText: response.statusText,
        status: response.status
      };
      throw error;
    }
  } catch (e: any) {
    if (times === 0) {
      console.log("fetch error", e);
      const cause = e.cause as Response;
      if (cause) {
        throw cause;
      }
      throw e;
    }
  }
}
