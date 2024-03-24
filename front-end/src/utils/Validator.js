export const validateEmailPass = (t, values) => {
  const errors = {};
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

  if (!values.email) {
    errors.email = t("emailRequired");
  } else if (!regexEmail.test(values.email)) {
    errors.email = t("emailInvalidFormat");
  }
  if (!values.password) {
    errors.password = t("passwordRequired");
  } else if (!regexPassword.test(values.password)) {
    errors.password = t("passwordComplexityRequirement");
  }

  return errors;
};

export const validateNameSurnameDate = (t, values) => {
  const errors = {};

  if (!values.name) {
    errors.name = t("nameRequired");
  }
  if (!values.surname) {
    errors.surname = t("surnameRequired");
  }
  if (!values.birthday) {
    errors.birthday = t("birthdayRequired");
  } else if (
    parseInt(values.birthday.substring(0, values.birthday.indexOf("-"))) >=
      2012 ||
    parseInt(values.birthday.substring(0, values.birthday.indexOf("-"))) <= 1922
  ) {
    errors.birthday = t("birthdayCheck");
  }

  return errors;
};

export const validatePhoneTC = (t, values, termsConfirm) => {
  const errors = {};
  const regexTcNo = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
  const regexPhoneNo =
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  if (!values.tcNo) {
    errors.tcNo = t("tcNoRequired");
  } else if (!regexTcNo.test(values.tcNo)) {
    errors.tcNo = t("tcNoCheck");
  }
  if (values.phoneNo && values.phoneNo[5] === "_") {
    errors.phoneNo = t("phoneNoRequired");
  } else if (values.phoneNo && !regexPhoneNo.test(values.phoneNo)) {
    errors.phoneNo = t("phoneNoCheck");
  }
  if (!termsConfirm) {
    errors.popUp = t("termsConfirmRequired");
  }

  return errors;
};
