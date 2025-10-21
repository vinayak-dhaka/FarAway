import { useState } from "react";
import Logo from "./Logo";
import AiForm from "./AiForm";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleAddAiItems(aiItems) {
    setItems((items) => [...items, ...aiItems]);
  }
  function handleToggleitem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items ? "
    );
    if (confirmed) setItems(() => []);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDelete={handleDelete}
        handleToggleitem={handleToggleitem}
        handleClearItems={handleClearItems}
      />
      <AiForm onAddAiItems={handleAddAiItems} />
      <Stats items={items} />
    </div>
  );
}

export default App;
