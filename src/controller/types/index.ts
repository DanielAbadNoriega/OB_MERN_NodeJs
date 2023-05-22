/**
 * Basic JSON response for Controllers
 */
export type BasicResponse = {
  message: string;
};

export type ByeResponse = {
  message: string;
  Date: string;
};

/**
 * Error JSON response for Controllers
 */
export type ErrorResponse = {
  error: string;
  message: string;
};

