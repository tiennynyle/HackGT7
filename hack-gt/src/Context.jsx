import React from "react";

export const MessageContext = React.createContext({
  items: [],
  orders: [],
  showTotalPrice: false,
  selectItems: (items) => {},
  setTotalPrice: (totalPrice) => {},
  addItemOrder: (order) => {},
  removeOrder: (order) => {},
});

export const MessageProvider = MessageContext.Provider;
