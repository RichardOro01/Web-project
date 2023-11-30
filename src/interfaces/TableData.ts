type TableDataType<T> = { [K in keyof T]?: string | number } & {
  key: number | string;
};
