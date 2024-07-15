import { getData } from "./dataService";

describe("dataService", () => {
  describe("getData", () => {
    it("should return parsed data when file read is successful", async () => {
      const data = await getData();
      expect(data).toBeInstanceOf(Array);
    });
  });
});
