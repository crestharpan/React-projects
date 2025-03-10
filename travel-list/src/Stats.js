export default function Stats({ items }) {
  const packedItems = items.filter((item) => item.packed === true);
  const numPackedItems = packedItems.length;
  const numItems = items.length;

  return (
    <footer className="stats">
      <em>
        You have {numItems} items on your list and you have already packed{" "}
        {numPackedItems} items ({(numPackedItems / numItems) * 100}%)
      </em>
    </footer>
  );
}
