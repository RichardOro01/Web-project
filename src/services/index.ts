export const GET = async (url: string, cache: RequestCache = "no-store") => {
  const response = await fetch(`http://localhost:3000/api/${url}`, {
    ...{ cache },
  });
  return response.json();
};

export const POST = async (url: string, data: any) => {
  return fetch(`http://localhost:3000/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
