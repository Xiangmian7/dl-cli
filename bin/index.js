#!/usr/bin/env node
import { program } from "commander"
import pkg from "../package.json" assert { type: "json" }
import create from "../lib/create.js"

program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist")
  .action(async (name, options) => {
    console.log(name, options)
    await create(name, options)
  })

program.version(pkg.version, "-v")
program.parse(process.argv)
