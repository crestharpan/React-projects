import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Stats from "./Stats";
import PackingList from "./PackingList";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clearItems() {
    const confirmed = window.confirm("Are you sure you want clear the list?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo /> <Form onAddItem={handleAddItem} />{" "}
      <PackingList
        items={items}
        onDelete={handleDeleteItem}
        onToggle={handleToggleItem}
        onClear={clearItems}
      />{" "}
      <Stats items={items} />
    </div>
  );
}

//LOGO

//FORM
