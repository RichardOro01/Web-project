export const GET = async (url: string, cache: RequestCache = "no-store") => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...{ cache },
  });
  if (response.status > 300) {
    const json = await response.json();
    return Promise.reject({ detail: json });
  }
  return response.json();
};

export const POST = async (url: string, data: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status > 300) {
    const json = await response.json();
    return Promise.reject({ detail: json });
  }
  return response.json();
};

export const DELETE = async (url: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status > 300) {
    const json = await response.json();
    return Promise.reject({ detail: json });
  }
  return response.json();
};
