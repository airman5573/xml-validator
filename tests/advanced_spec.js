// TODO: Add tests that you find necessary.

const { isValidXML } = require("../src");

describe("advanced validator test", () => {
  it("should return true for an xml with a multi nodes", () => {
    expect(isValidXML("<note><to>yoon</to><from>kim</from><heading>Hi yoon</heading><body>Do you want to play table tennis with me this week?</body></note>")).toBeTruthy();
  });
  it("should return true for an xml with a tag which has whitespaces", () => {
    expect(isValidXML("<mess age></message>")).toBeFalsy();
  });
});
