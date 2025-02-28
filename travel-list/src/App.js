export default function App() {
  return (
    <div className="app">
      <Logo /> <Form /> <PackingList /> <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far away💼</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your Trip?</h3>
    </div>
  );
}
function PackingList() {
  return <div className="list">LIST</div>;
}
function Stats() {
  return (
    <footer>
      <em>
        You have x items on your list and you have already packed x items (x%)
      </em>
    </footer>
  );
}
