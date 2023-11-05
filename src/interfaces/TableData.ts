type TableDataType<T> = { [K in keyof T]: T[K] } & { key: number };
