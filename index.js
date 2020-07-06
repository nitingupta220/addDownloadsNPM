#!/usr/bin/env node

const inquirer = require("inquirer");
const axios = require("axios");
const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");
let downloads = 0;

clear();

console.log(
  chalk.yellow(
    figlet.textSync("Welcome to Fake NPM Downloader", {
      //   font: "Ghost",
      horizontalLayout: "default", 
      verticalLayout: "full",
    })
  )
);

const askQuestions = async () => {
  const questions = [
    {
      type: "input",
      name: "packageName",
      message:
        "Enter the full-package name that you want to increase download!!!",
    },
  ];
  return inquirer.prompt(questions);
};

const run = async () => {
  const answers = await askQuestions();
  const { packageName } = answers;
  try {
    const url = `https://registry.npmjs.org/${packageName}`;
    const response = await axios(url);
    const data = await response.data.versions;
    const lastVersion = data[Object.keys(data).pop()].dist.tarball;
    interVal(lastVersion);
  } catch (error) {
    console.log("Error", error);
    res.send(`${error}`);
  }
};

const addDl = (url) => {
  axios
    .get(url)
    .then((res) => {
      downloads++;
      console.log(`Download no. ${downloads}`);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

const interVal = (version) => {
  setInterval(
    () => {
      addDl(version);
    },
    1000,
    version
  );
};

run();
