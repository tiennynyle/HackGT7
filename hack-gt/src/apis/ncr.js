const fetch = require("node-fetch");

export const getItems = () => {
  let res = fetch("http://localhost:3221/items", {
    headers: {
      Accept: "application/json",
    },
  });
  return res;
};

export const getIntent = (intent) => {
  let res = fetch(`http://localhost:3221/nlp/${intent}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return res;
};

export const makeOrder = (items) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    lineItems: items,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3221/order", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
