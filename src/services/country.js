import api from './api';

export const getUserIPData = async () => {
  const API = "https://pro.ip-api.com/json/?fields=country,countryCode,continent,continentCode&key=RohwobBGvfurYAr"

  const response = await api.read(API);

  return response;
}
