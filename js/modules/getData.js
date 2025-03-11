import { showLoader, hideLoader } from "./loader.js";

export const getData = async (url) => {
  showLoader();
  try{
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error('Failed to fetch pizza product')
    }
    return await response.json();
  } catch(error) {
    console.error(`Error fetching pizza products: ${error}`);
    return [];
  } finally {
    hideLoader();
  }
};

export const submitOrder = async (products) => {

    try {
        const response = await fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
        });

        if(!response.ok) {
            throw new Error(response.status);
        };

            return await response.json();

    } catch(error) {
        console.error(`Ошибка оформления заказа: ${error}`)
    }
}
