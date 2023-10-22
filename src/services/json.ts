import path from "path";
import fs from "fs";
import TableData from "@/components/commons/tables/TableData";

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

export const deleteElementDB = (column: string, key: string) => {
  const filePath = createFileIfNotExists();
  const content = fs.readFileSync(filePath, "utf-8");
  let fileData = JSON.parse(content);
  if (!fileData[column]) {
    return false;
  }
  fileData[column] = (fileData[column] as Array<any>).filter(
    (element: TableData) => key !== element.key
  );
  const newContent = JSON.stringify(fileData);
  return fs.writeFileSync(filePath, newContent, "utf-8");
};

export const updateElementDB = (column: string, key: string, body: any) => {
  const filePath = createFileIfNotExists();
  const content = fs.readFileSync(filePath, "utf-8");
  let fileData = JSON.parse(content);
  if (!fileData[column]) {
    return false;
  }
  const element = (fileData[column] as Array<any>).find(
    (element: TableData) => key == element.key
  );
  const index = (fileData[column] as Array<any>).indexOf(element);
  if (index && index >= 0) {
    fileData[column][index] = { key: fileData[column][index].key, ...body };
  }
  const newContent = JSON.stringify(fileData);
  return fs.writeFileSync(filePath, newContent, "utf-8");
};
