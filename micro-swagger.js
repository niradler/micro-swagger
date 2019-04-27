#!/usr/bin/env node
const program = require("commander");
const package = require("./package.json");
const exec = require("child_process").exec;
const dotenv = require("dotenv");
const env = getEnv();
const fs = require("fs");

const getEnv = () => {
  const env = fs.readFileSync(__dirname + "/.env");
  const buf = Buffer.from(env);
  const config = dotenv.parse(buf);
  return config;
};

const setEnv = config => {
  let file = [];
  for (const key in config) {
    file.push(`${key}=${config[key]}`);
  }
  file.join("\n");
  fs.writeFileSync(__dirname + "/.env", file);
};

const run = cmd =>
  new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error !== null) {
        reject(error);
      }
      resolve(stdout);
    });
  });

program
  .version(package.version)
  .command("start")
  .description("Start micro-swagger server.")
  .option("-p, --port [port]", "port", env["PORT"])
  .action(args => {
    const { port } = args;

    env["PORT"] = port;
    setEnv(env);

    run(`node ${__dirname}/index.js`)
      .then(o => console.log(o))
      .catch(e => console.log(e));
    console.log(`micro-swagger running on port ${port}!`);
  });

program.parse(process.argv);

program.on("command:*", function() {
  console.error(
    "Invalid command: %s\nSee --help for a list of available commands.",
    program.args.join(" ")
  );
  process.exit(1);
});

if (!process.argv.slice(2).length) {
  program.help();
}
