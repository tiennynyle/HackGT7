import React from "react";
import { Dictaphone, ShowItems } from "./components";
import { MessageProvider } from "./Context";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import backgroundPic from "./asset/background.jpg";
function App() {
  const [items, setItems] = React.useState([]);
  const [orders, addOrders] = React.useState([]);
  const [showTotalPrice, setPrice] = React.useState(false);

  const selectItems = (i) => {
    setItems(i);
  };

  const setTotalPrice = (totalPrice) => {
    setPrice(totalPrice);
  };

  const addItemOrder = (order) => {
    addOrders((prev) => {
      if (prev.length > 0 && prev[prev.length - 1].Name === order.Name) {
        return [...prev];
      }
      return [...prev, order];
    });
  };
  const removeOrder = (order) => {
    addOrders((prev) => {
      return prev.filter((p) => p.Name.toLowerCase().trim() !== order.trim());
    });
  };

  return (
    <MessageProvider
      value={{
        items,
        selectItems,
        addItemOrder,
        orders,
        setTotalPrice,
        showTotalPrice,
        removeOrder,
      }}
    >
      <div
        style={{ backgroundImage: `url(${backgroundPic})`, height: "100vh" }}
      >
        <Badge
          badgeContent={orders.length}
          color="primary"
          style={{ marginTop: 20 }}
        >
          <MailIcon />
        </Badge>
        <Dictaphone />
        <ShowItems />
      </div>
    </MessageProvider>
  );
}

export default App;
