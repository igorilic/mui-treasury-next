import { getPackageStats } from "package-build-stats";

const folders = [
  "cli",
  "component-square",
  "layout",
  "style-button-bootstrap",
  "style-square-sticker",
  "theme-treasury",
];

async function resolvePackageStats(name: string) {
  let result: any;
  try {
    result = await getPackageStats(name, {
      client: "yarn",
    });
  } catch (error) {
    result = {
      isError: true,
      ...error,
    };
  }
  return result;
}

function displayAsKB(bytes: string) {
  if (Number.isNaN(Number(bytes))) {
    return "unknown size";
  }
  return `${(Number(bytes) / 1000).toFixed(2)} KB`;
}

(async function run() {
  const jsons = folders.map((folder) => {
    return require(`../packages/${folder}/package.json`);
  });
  const results = await Promise.all(
    jsons.map((file) => resolvePackageStats(file.name))
  );
  results.forEach((info, index) => {
    console.info(`${jsons[index].name}`);
    if (!info.isError) {
      console.info(
        `size: ${displayAsKB(info.size)}, gzip: ${displayAsKB(info.gzip)}`
      );
    }
    console.info(` `);
    console.info(` `);
  });
})();
