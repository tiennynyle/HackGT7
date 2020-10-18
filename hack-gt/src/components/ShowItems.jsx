import React from "react";
import { MessageContext } from "../Context";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const ShowItems = () => {
  const { items, showTotalPrice } = React.useContext(MessageContext);
  const classes = useStyles();
  if (!items || items.length === 0) return null;

  const getTotalPrices = () => {
    let totalPrice = 0;
    for (let item of items) totalPrice += item.RetailPrice;
    return totalPrice;
  };

  return (
    <>
      {!showTotalPrice && <div>{`About ${items.length} results`}</div>}
      {showTotalPrice === true && (
        <div>{`Total Price of your orders : $ ${getTotalPrices()} 😃`}</div>
      )}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  <span style={{ color: `#${item.DisplayColor}` }}>
                    {item.Name}
                  </span>
                </TableCell>

                <TableCell>{item.Description}</TableCell>
                <TableCell>{item.RetailPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
