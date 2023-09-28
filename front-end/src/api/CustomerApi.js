const BASE_URL = "http://localhost:8080/customer";

export const signupCustomer = (formValues) => {
  const endPoint = `${BASE_URL}/signup`;

  return fetch(endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formValues),
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    }
    // Handle non-201 responses
    return res.json().then((err) => {
      throw err;
    });
  });
};

export const loginCustomer = (formValues) => {
  const endPoint = `${BASE_URL}/login`;

  return fetch(endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formValues),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    // Handle non-200 responses as errors
    return res.json().then((err) => {
      throw err;
    });
  });
};
