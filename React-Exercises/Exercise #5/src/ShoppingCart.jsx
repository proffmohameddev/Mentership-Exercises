import { useState } from "react";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const handleAdd = () => {
    const price = parseFloat(priceInput);
    if (nameInput.trim() === "" || isNaN(price) || price <= 0) return;

    const newItem = {
      id: crypto.randomUUID(),
      name: nameInput.trim(),
      price,
      quantity: 1,
    };
    setProducts([...products, newItem]);
    setNameInput("");
    setPriceInput("");
  };

  const increment = (id) => {
    setProducts(
      products.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrement = (id) => {
    setProducts(
      products
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const remove = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h1>Simple Shopping Cart</h1>
      <h3>Add A product</h3>
      <input
        type="text"
        placeholder="Product Name"
        onChange={(e) => setNameInput(e.target.value)}
        value={nameInput}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <input
        type="Number"
        placeholder="Price"
        onChange={(e) => setPriceInput(e.target.value)}
        value={priceInput}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add to Cart</button>
      <br />
      {products.length === 0 ? (
        <span>Your cart is empty</span>
      ) : (
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              <span>
                <strong>{item.name}</strong>
              </span>
              <span> ${item.price.toFixed(2)}</span> <br />
              <span>Quantity: </span>
              <button onClick={() => decrement(item.id)}>-</button>
              {item.quantity}
              <button onClick={() => increment(item.id)}>+</button>
              <button onClick={() => remove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total Price: {total.toFixed(2)}</h3>
    </div>
  );
};

export default ShoppingCart;
