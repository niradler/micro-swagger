#!/usr/bin/env node
const config = require("./config");
const program = require("commander");
const package = require("./package.json");
const exec = require("child_process").exec;
const init = require("./init");

init();

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
  .option("-p, --port [port]", "port", config.getEnv("port") || 3055)
  .action(args => {
    const { port } = args;

    config.setEnv("port", port);

    run(`node ${__dirname}/build/index.js`)
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
