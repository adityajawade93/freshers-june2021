export const validate_page = function (
  page: number,
  size: number
): { result: string } {
  if (
    typeof page === "number" &&
    typeof size === "number" &&
    page >= 0 &&
    size >= 0
  ) {
    return { result: "valid" };
  }
  return { result: "invalid" };
};
export async function handle_error(promise: Promise<any>){
    return promise.then((data) => [data, undefined]).catch((error) => Promise.resolve([undefined, error]));
  };
