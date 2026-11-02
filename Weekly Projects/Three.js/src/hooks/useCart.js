import { useState } from "react";

/* Order counter + the messages shown when adding or opening the cart. */
export default function useCart(say) {
  const [count, setCount] = useState(0);

  const add = (name) => {
    setCount((c) => c + 1);
    say(name + " added to your order");
  };

  const openCart = () =>
    say(count ? count + " item" + (count > 1 ? "s" : "") + " in your order" : "Your order is empty");

  return { count, add, openCart };
}
