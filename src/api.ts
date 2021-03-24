const MOCK_DATA_URL = 'http://qvz87.mocklab.io/barcodes1000/';

export const getBarcodes = async <T>(): Promise<T> => {
  let result = [];
  try {
    const response = await fetch(MOCK_DATA_URL);
    if (response.ok) {
      result = await response.json();
    } else {
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  } catch (err) {
    console.error(err);
  }
  return result;
};
