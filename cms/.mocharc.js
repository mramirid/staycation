module.exports = {
  require: "ts-node/register",
  extension: ["ts"],
  "watch-files": ["tests"],
  spec: ["tests/**/**.test.ts"],
};
