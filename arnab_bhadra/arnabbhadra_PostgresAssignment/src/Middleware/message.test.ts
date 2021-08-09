import * as message from "./message"
describe('Test cases for validating error messages',()=>{
  test("Test case for checking error message of internal error", () => {
    const actual = message.errorMessage;
    expect(actual).toEqual("Interal error occured. Try after some time");
  });
  test("Test case for checking error message of Page not found", () => {
    const actual = message.pageNotFoundMessage;
    expect(actual).toEqual("Page Not Found");
  });
  test("Test case for checking error message of invalid query page and size", () => {
    const actual = message.invalidPageMessage;
    expect(actual).toEqual("Page and (or) size invalid");
  });
  test("Test case for checking error message of invalid input", () => {
    const actual = message.invalidInputMessage;
    expect(actual).toEqual("Invalid Input");
  });
});
