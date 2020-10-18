const fetch = require("node-fetch");

const getItems = async () => {
  const t = await getToken();
  const json = await t.json();
  const token = json["Result"]["AccessToken"];

  return fetch("https://api-reg-apigee.ncrsilverlab.com/v2/inventory/items", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

const getToken = () => {
  return fetch("https://api-reg-apigee.ncrsilverlab.com/v2/oauth2/token", {
    headers: {
      Accept: "application/json",
      client_id: "AST00004500",
      client_secret:
        "y6vjOQ3G5tVSAmbStlhhWkgM56gi7oSm3EtCi214L4Xht9TtPoDQ3r6Hvrr10n1terphYV6VHnXVMVwRCNcc7Att",
    },
  });
};
const order = async (items) => {
  const t = await getToken();
  const json = await t.json();
  const token = json["Result"]["AccessToken"];

  fetch("https://api-reg.ncrsilverlab.com/orders?store_number=1", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Orders: [
        {
          IsClosed: true,
          OrderNumber: "1234",
          OrderDateTime: new Date().toISOString(),
          OrderDueDateTime: new Date().toISOString(),
          IsPaid: true,
          LineItems: items,
          //   LineItems: [
          //     // { ItemId: 2903575, ItemName: "Chocolate Snow", Quantity: 1 },
          //   ],
        },
      ],
      SourceApplicationName: "string",
    }),
  });
};

module.exports = {
  getItems,
  getToken,
  order,
};
