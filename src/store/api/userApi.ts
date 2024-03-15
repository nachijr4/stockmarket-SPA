const userBaseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + process.env.REACT_APP_USER_BASE_PATH : ""

const validateResponse = (response: any) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

export const getWalletAmount = (): Promise<number> => {
    return fetch(userBaseUrl)
    .then(validateResponse)
    .then(data => data.data.balance)
    .catch(error => {
        throw new Error('Error while making company-profile request');
      });
}