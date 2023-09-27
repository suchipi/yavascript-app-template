var path = require("path");
var APP_NAME = require("../meta/APP_NAME").APP_NAME;

var distDir = path.resolve(__dirname, "..", "dist");

function getBinaryPath(platformAndArch) {
  switch (platformAndArch) {
    case "darwin-arm64": {
      return path.join(distDir, "aarch64-apple-darwin", APP_NAME);
    }
    case "darwin-x64": {
      return path.join(distDir, "x86_64-apple-darwin", APP_NAME);
    }
    case "linux-arm64": {
      return path.join(distDir, "aarch64-unknown-linux-static", APP_NAME);
    }
    case "linux-x64": {
      return path.join(distDir, "x86_64-unknown-linux-static", APP_NAME);
    }
    case "win32-x64": {
      return path.join(distDir, "x86_64-pc-windows-static", APP_NAME + ".exe");
    }
    default: {
      throw new Error("Unsupported platform: " + platformAndArch);
    }
  }
}

var binaryPath = getBinaryPath(process.platform + "-" + process.arch);

module.exports = {
  getBinaryPath: getBinaryPath,
  binaryPath: binaryPath,
};
