import { getItems, getIntent, makeOrder } from "../apis/ncr";
import { MessageContext } from "../Context";
import React from "react";

const categories = ["Milk Tea", "Chocolate", "Oolong"];
const getCategory = (intent) => {
  for (let category of categories) {
    if (category.toLowerCase() === intent) {
      return category;
    }
  }
  return null;
};

export const useVoiceCommands = ({
  transcript,
  resetTranscript,
  resetVoice,
}) => {
  const {
    selectItems,
    addItemOrder,
    orders,
    setTotalPrice,
    removeOrder,
  } = React.useContext(MessageContext);
  React.useEffect(() => {
    if (transcript === "") return;
    setTimeout(() => {
      getIntent(transcript)
        .then((res) => res.json())
        .then((res) => {
          const { intent } = res;
          if (intent === "menu") {
            getItems()
              .then((res) => res.json())
              .then((res) => {
                selectItems(res.Result);
                resetVoice("Here is our Menu");
                resetTranscript();
                setTotalPrice(false);
              });
          } else if (getCategory(intent)) {
            const category = getCategory(intent);
            getItems()
              .then((res) => res.json())
              .then((res) => {
                const result = res.Result.filter((r) =>
                  r.Name.includes(category)
                );
                selectItems(result);
                resetVoice(`Here is our ${category}`);
                resetTranscript();
                setTotalPrice(false);
              });
          } else if (intent.includes("order_")) {
            const name = intent.substr("order_".length).replace(/#|_/g, " ");
            getItems()
              .then((res) => res.json())
              .then((res) => {
                for (let r of res.Result) {
                  if (r.Name.toLowerCase().trim() === name.trim()) {
                    addItemOrder(r);
                    break;
                  }
                }
                selectItems([]);
                resetVoice("Ok, I added your order.");
                resetTranscript();
              });
          } else if (intent.includes("show order")) {
            console.log(orders);
            selectItems(orders);
            setTotalPrice(true);
            resetTranscript();
            // resetVoice("Here is your summary of your orders");
          } else if (intent.includes("remove_")) {
            const name = intent.substr("remove_".length).replace(/#|_/g, " ");
            removeOrder(name);
            setTotalPrice(false);
            resetVoice("Ok I removed your order for " + name);
            resetTranscript();
          } else if (intent.includes("pay")) {
            const items = [];
            for (let order of orders) {
              items.push({
                ItemId: order.ItemVariations[0].ItemId,
                ItemName: order.Name,
                Quantity: 1,
              });
            }
            makeOrder(items);
            resetTranscript();
            resetVoice("Thank you for your order!");
            selectItems([]);
          }
        });
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);
};
