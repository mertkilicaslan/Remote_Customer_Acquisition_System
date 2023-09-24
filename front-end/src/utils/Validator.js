export const validateEmailPass = (values) => {
  const errors = {};
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

  if (!values.email) {
    errors.email = "Lütfen e-mail adresinizi giriniz.";
  } else if (!regexEmail.test(values.email)) {
    errors.email = "E-mail geçerli formatda değil.";
  }
  if (!values.password) {
    errors.password = "Lütfen şifrenizi giriniz.";
  } else if (!regexPassword.test(values.password)) {
    errors.password =
      "Şifreniz en az sekiz karakter, bir büyük harf, bir küçük harf ve bir sayı içermelidir.";
  }

  return errors;
};

export const validateNameSurnameDate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Lütfen isminizi giriniz.";
  }
  if (!values.surname) {
    errors.surname = "Lütfen soyisminizi giriniz.";
  }
  if (!values.birthday) {
    errors.birthday = "Lütfen doğum tarihinizi giriniz.";
  } else if (
    parseInt(values.birthday.substring(0, values.birthday.indexOf("-"))) >=
      2012 ||
    parseInt(values.birthday.substring(0, values.birthday.indexOf("-"))) <= 1922
  ) {
    errors.birthday = "Doğum tarihinizi kontrol edin.";
  }

  return errors;
};

export const validatePhoneTC = (values, termsConfirm) => {
  const errors = {};
  const regexTcNo = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
  const regexPhoneNo =
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  if (!values.tcNo) {
    errors.tcNo = "Lütfen TC Kimlik Numaranızı giriniz.";
  } else if (!regexTcNo.test(values.tcNo)) {
    errors.tcNo = "TC Kimlik Numaranızı kontrol edin.";
  }
  if (values.phoneNo && values.phoneNo[5] === "_") {
    errors.phoneNo = "Lütfen cep telefon numaranızı giriniz.";
  } else if (values.phoneNo && !regexPhoneNo.test(values.phoneNo)) {
    errors.phoneNo = "Cep telefon numaranızı kontrol edin.";
  }
  if (!termsConfirm) {
    errors.popUp = "Müşteri olmak için sözleşmeyi onaylamalısınız.";
  }

  return errors;
};
