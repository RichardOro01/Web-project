export interface Service {
  get: (key?: string) => Promise<any>;
  add: (body: any) => Promise<any>;
  update: (key: string, body: any) => Promise<any>;
  delete: (key: string) => Promise<any>;
}
