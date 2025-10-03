const API_URL = 'http://localhost:3000';

export function getWebImageUrl(image) {
  return `${API_URL}/${image}`;
}

export async function sendHttpRequest(request, data = null) {
  if (request.method === "get" && request.type === "meals") {
    return await getMeals();
  } else if (request.method === "post" && request.type === "submit_order") {
    return await submitOrder(data);
  } else {
    throw new Error(`Invalid request`);
  }
}

export async function getMeals() {
  const response = await fetch(`${API_URL}/meals`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || 'Failed to fetch meals');
  }
  return resData;
}

export async function submitOrder(data) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': "application/json"
    }
  })
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Failed to submit order");
  }

  return resData;
}