import path from "path";
import fs from "fs";

const createFileIfNotExists = () => {
  let filePath = path.join(process.cwd(), "src/mockdb");
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
  filePath += "/mockdb.json";
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "{}");
  }
  return filePath;
};

export const readDB = () => {
  const filePath = createFileIfNotExists();
  const content = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(content);
  return data;
};

export const writeDB = (column: string, data: any) => {
  const filePath = createFileIfNotExists();
  const content = fs.readFileSync(filePath, "utf-8");
  const fileData = JSON.parse(content);
  if (!fileData[column]) {
    fileData[column] = [];
  }
  fileData[column].push({ key: Math.random().toString(), ...data });
  const newContent = JSON.stringify(fileData);
  return fs.writeFileSync(filePath, newContent, "utf-8");
};
