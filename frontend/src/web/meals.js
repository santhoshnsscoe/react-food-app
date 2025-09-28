const API_URL = 'http://localhost:3000';

export function getWebImageUrl(image) {
  return `${API_URL}/${image}`;
}

export async function getMeals() {
  const response = await fetch(`${API_URL}/meals`);
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }

  const data = await response.json();
  return data;
}

export async function submitOrder(data) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': "application/json"
    }
  })

  if (!response.ok) {
    throw new Error("Failed to submit order");
  }

  return true;
}