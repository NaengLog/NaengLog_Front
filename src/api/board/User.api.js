import { customAxios } from "../util/CustomAxios";

export const loginRequest = async (id, pw) => {
  const response = await customAxios.post(`/user/login`, {
    userId: id,
    password: pw,
  });

  return response;
};

export const registerRequest = async (id, pw, name) => {
  await customAxios
    .post(`/user/register`, {
      userId: id,
      password: pw,
      name: name,
    })
    .then((response) => {
      console.log(response);
    });
};
