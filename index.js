const fs = require("fs").promises;
const path = require("path");
const config = require("./config");
const connect = require("./lib/connection");
const { getandRequirePlugins } = require("./assets/database/plugins");

// eslint-disable-next-line no-undef
global.__basedir = __dirname;

const readAndRequireFiles = async (directory) => {
  try {
    const files = await fs.readdir(directory);
    return Promise.all(
      files
        .filter((file) => path.extname(file).toLowerCase() === ".js")
        .map((file) => require(path.join(directory, file)))
    );
  } catch (error) {
    console.error("Error reading and requiring files:", error);
    throw error;
  }
};

async function initialize() {
 
  console.log("X-Asena");
  try {
    // eslint-disable-next-line no-undef
    await readAndRequireFiles(path.join(__dirname, "/assets/database/"));
    console.log("Syncing Database");

    await config.DATABASE.sync();

    console.log("⬇  Installing Plugins...");
    // eslint-disable-next-line no-undef
    await readAndRequireFiles(path.join(__dirname, "/assets/plugins/"));
    await getandRequirePlugins();
    console.log("✅ Plugins Installed!");

    return  await connect();
  } catch (error) {
    console.error("Initialization error:", error);
    // eslint-disable-next-line no-undef
    return process.exit(1); // Exit with error status
  }
}

initialize();
