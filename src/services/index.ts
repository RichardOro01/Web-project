export const GET = async (url: string, cache: RequestCache = "no-store") => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...{ cache },
  });
  return response.json();
};

export const POST = async (url: string, data: any) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const DELETE = async (url: string, key: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(key),
  });
};
