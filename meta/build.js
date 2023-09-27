#!/usr/bin/env yavascript
const { version } = require("../package.json");
const { APP_NAME } = require("./APP_NAME");

if (exists("dist")) {
  remove("dist");
}
ensureDir("dist");

const ysLicenseText = $([os.execPath(), "--license"]).stdout.trim();

// Add license text for any bundled third-party JS here

const appLicenseText =
  `-------------- ${APP_NAME} --------------` + "\n\n" + readFile("LICENSE");

writeFile(
  "dist/LICENSE_ALL",
  [
    ysLicenseText,
    // Add license text for any bundled third-party JS here
    appLicenseText,
  ].join("\n\n")
);
echo("./dist/LICENSE_ALL");

// creates dist/index.js
exec(`npm run bundle`);

const targetDirs = glob("node_modules/yavascript/bin/*");
for (const targetDir of targetDirs) {
  const target = targetDir.segments.at(-1);

  const dotExe = target.match(/windows/) ? ".exe" : "";
  const outfile = new Path("./dist", target, APP_NAME + dotExe);
  ensureDir(dirname(outfile));

  const bootstrapBin = targetDir
    .concat("yavascript-bootstrap" + dotExe)
    .toString();

  exec([
    "bash",
    "-c",
    `cat ${quote(bootstrapBin)} dist/index.js > ${quote(outfile.toString())}`,
  ]);

  chmod({ a: "rx", u: "rwx" }, outfile);

  echo(outfile.toString());

  const tarGzPath = Path.resolve("dist");

  copy("dist/LICENSE_ALL", Path.join(dirname(outfile), "LICENSE"));
  const dirBefore = pwd();
  try {
    cd(dirname(outfile));
    exec([
      "tar",
      "-czvf",
      `${tarGzPath}/${APP_NAME}-${version}-${target}.tar.gz`,
      ".",
    ]);
  } finally {
    cd(dirBefore);
  }
}
