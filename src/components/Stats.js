export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        {" "}
        <em>Start adding some items to your packing list </em>
      </footer>
    );
  const numitems = items.length;
  const numpacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numpacked / numitems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `You have ${numitems} items on your list, and you’ve packed ${numpacked} (
          ${percentage}%)`
          : "You got everything! Ready to go ✈️"}
      </em>
    </footer>
  );
}
