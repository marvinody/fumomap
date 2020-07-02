const exec = require("child_process").exec;
const { unlink } = require("fs");
const generatedSeedFile = "seed_gen.js";
const path = require("path");

const pkg = require("./package.json");

const mode = process.env.NODE_ENV;
const prod = mode === "production";

const alias = { svelte: path.resolve("node_modules", "svelte") };
const extensions = [".mjs", ".js", ".json", ".svelte", ".html"];
const mainFields = ["svelte", "module", "browser", "main"];

module.exports = {
  mode: prod ? "production" : "development",
  entry: "./src/db/seed.js",
  output: {
    path: __dirname,
    filename: generatedSeedFile,
    libraryTarget: "commonjs2",
  },
  target: "node",
  resolve: { alias, extensions, mainFields },
  externals: Object.keys(pkg.dependencies).concat("encoding"),
  module: {},
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", (compilation) => {
          exec(`node ${generatedSeedFile}`, (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
            unlink(generatedSeedFile, () => {});
          });
        });
      },
    },
  ],
  performance: {
    hints: false, // it doesn't matter if server.js is large
  },
};
