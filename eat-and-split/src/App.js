import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showSplitForm, setShowSplitForm] = useState(false);

  function toggleShowAddFriendForm() {
    setShowAddFriend(!showAddFriend);
  }
  function toggleSplitBill() {
    setShowSplitForm(!showSplitForm);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={toggleShowAddFriendForm}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill toggleSplitBill={toggleSplitBill} />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}
function Friend({ friend, toggleSplitBill }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">{`You owe your friend $${Math.abs(
          friend.balance
        )}`}</p>
      )}
      {friend.balance > 0 && (
        <p className="green">{`your friend owes you ${friend.balance}`}</p>
      )}
      {friend.balance === 0 && <p>{`you and ${friend.name} are even`}</p>}
      <Button onClick={toggleSplitBill}>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>Friend Name</label>
      <input type="text" />
      <label>Image URL</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split the bill With X</h2>
      <label>Bill ValueL</label>
      <input type="number" />
      <label>Your expense</label>
      <input type="text" />
      <label>X's expense</label>
      <input type="text" disabled />
      <label>Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="freind">x</option>
      </select>
      <Button>Add</Button>
    </form>
  );
}
