import path from "path";
import fs from "fs";
import TableData from "@/components/commons/tables/TableData";

const createFileIfNotExists = async () => {
  let filePath = path.join(process.cwd(), "src");
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
  filePath += "/mockdb";
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
  filePath += "/mockdb.json";
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "{}");
  }
  return filePath;
};

export const readDB = async () => {
  const filePath = await createFileIfNotExists();
  const content = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(content);
  return data;
};

export const writeDB = async (column: string, data: any) => {
  const filePath = await createFileIfNotExists();
  const content = fs.readFileSync(filePath, "utf-8");
  const fileData = JSON.parse(content);
  if (!fileData[column]) {
    fileData[column] = [];
  }
  fileData[column].push({ key: Math.random().toString(), ...data });
  const newContent = JSON.stringify(fileData);
  return fs.writeFileSync(filePath, newContent, "utf-8");
};

export const deleteElementDB = async (column: string, key: string) => {
  const filePath = await createFileIfNotExists();
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

export const updateElementDB = async (
  column: string,
  key: string,
  body: any
) => {
  const filePath = await createFileIfNotExists();
  const content = fs.readFileSync(filePath, "utf-8");
  let fileData = JSON.parse(content);
  if (!fileData[column]) {
    return false;
  }
  const element = (fileData[column] as Array<any>).find(
    (element: TableData) => key == element.key
  );
  const index = (fileData[column] as Array<any>).indexOf(element);
  if (index >= 0) {
    fileData[column][index] = { key: fileData[column][index].key, ...body };
  }
  const newContent = JSON.stringify(fileData);
  return fs.writeFileSync(filePath, newContent, "utf-8");
};
