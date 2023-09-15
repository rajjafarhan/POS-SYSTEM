export const validateEmail = (email) => {
  const emailEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return emailEx.test(email);
};

export const validatePass = (pass) => {
  const passEx = /^[a-zA-Z]\w{7,16}$/;

  return passEx.test(pass);
};
