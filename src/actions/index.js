// Coloque aqui suas actions

export const SEND_USER_EMAIL = 'SEND_USER_EMAIL';

export const sendUserEmail = (userEmail) => ({
  type: SEND_USER_EMAIL,
  payload: { ...userEmail },
});
