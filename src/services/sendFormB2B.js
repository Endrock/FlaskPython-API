import axios from 'axios';

export const validateForm = async (endPointAPI, formData) => {
  const API = "https://back-centrale-fillers.herokuapp.com";
  const endPoint = endPointAPI

  try {
    const { data } = await axios({
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API}${endPoint}`,
      data: JSON.stringify(formData),
    });
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }

}
