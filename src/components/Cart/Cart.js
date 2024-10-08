import style from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import itemstyle from "./CartItem.module.css";

const Cart = function (props) {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul
      style={{
        overflowY: "auto",
        maxHeight: "20rem",
        listStyle: "none",
        paddingLeft: "0",
      }}
    >
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={style.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>
      <div className={style.actions}>
        <button
          className={`${style["button--alt"]}`}
          onClick={props.onHideCart}
        >
          Закрыть
        </button>
        {hasItems && <button className={style.button}>Заказать</button>}
      </div>
    </Modal>
  );
};

export default Cart;
