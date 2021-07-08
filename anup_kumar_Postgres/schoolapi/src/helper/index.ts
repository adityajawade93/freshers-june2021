export const ValidId = function (uuid: string) {
  if (
    uuid.match(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
  )
    return true;
  return false;
};

export const ValidatePage = function (
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
export async function handleError(promise: Promise<any>){
    return promise.then((data) => [data, undefined]).catch((error) => Promise.resolve([undefined, error]));
  };
