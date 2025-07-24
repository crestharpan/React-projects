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

export default function App() {
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [friendSelected, setFriendSelected] = useState(null);

  function handleOpenAdd() {
    setOpenAddFriend((openAddFriend) => {
      return !openAddFriend;
    });
  }

  function handleAddFriend(newFriendObj) {
    setFriends((friends) => [...friends, newFriendObj]);
  }

  function toogleSplitForm(friend) {
    console.log(friendSelected, friend);
    setFriendSelected((curr) => (curr === friend ? null : friend));
  }

  function onSplitBill(value) {
    setFriends(
      friends.map((friend) =>
        friend.id === friendSelected
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setFriendSelected(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {friends.map((friend) => (
            <FriendList
              friends={friend}
              setFriends={setFriends}
              toogleSplitForm={toogleSplitForm}
              friendSelected={friendSelected}
              key={friend.id}
            />
          ))}
        </ul>
        {openAddFriend && (
          <FormAddFriend friends={friends} handleAddFriend={handleAddFriend} />
        )}

        <Button onClick={handleOpenAdd}>
          {openAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>

      {friendSelected && (
        <SplitBill
          friendId={friendSelected}
          onSplitBill={onSplitBill}
          key={friendSelected}
        />
      )}
    </div>
  );
}

function FriendList({ friends, toogleSplitForm, friendSelected }) {
  const isSelected = friendSelected && friendSelected === friends.id;

  return (
    <li>
      <img src={friends.image} alt={friends.name} />
      <h3>{friends.name}</h3>
      {friends.balance > 0 && (
        <p className="green">{`${friends.name} owes you $${friends.balance}`}</p>
      )}
      {friends.balance === 0 && <p className="">{`Even`}</p>}
      {friends.balance < 0 && (
        <p className="red">{` you owe $${Math.abs(friends.balance)} to ${
          friends.name
        }`}</p>
      )}
      <Button onClick={() => toogleSplitForm(friends.id)}>
        {isSelected ? "close" : "split"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !img) return;
    const id = crypto.randomUUID();
    const newFriendObj = {
      id,
      name,
      img: `${img}?=${id}`,
      balance: 0,
    };

    handleAddFriend(newFriendObj);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>Image URL</label>
      <input
        type="text"
        value={img}
        onChange={(e) => {
          setImg(e.target.value);
        }}
      />
      <Button>Add</Button>
    </form>
  );
}

function SplitBill({ friendId, onSplitBill }) {
  const [bill, setBill] = useState(0);
  const [myBill, setMyBill] = useState(0);
  const [paidBy, setPaidBy] = useState("user");

  const paidByFriend = bill ? bill - myBill : "";

  const selectedFriend = initialFriends.find(
    (friend) => friend.id === friendId
  );

  function handleSubmit(e) {
    e.preventDefault();
    console.log(bill, myBill);
    if (!bill || !myBill) return;

    onSplitBill(paidBy === "user" ? paidByFriend : -myBill);
  }

  return (
    selectedFriend && (
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Splt the Bill</h2>
        <label>Bill Value</label>
        <input
          type="number"
          value={bill}
          onChange={(e) => {
            setBill(e.target.value);
          }}
        />
        <label>Your expense</label>
        <input
          type="text"
          value={myBill}
          onChange={(e) => {
            setMyBill(e.target.value);
          }}
        />
        <label>{`${selectedFriend.name} expense`} </label>
        <input type="text" disabled value={paidByFriend} />
        <label>Who is paying the bill</label>
        <select
          value={paidBy}
          onChange={(e) => {
            setPaidBy(e.target.value);
          }}
        >
          <option value="user">You</option>
          <option value="friend">{`${selectedFriend.name}`}</option>
        </select>
        <Button>Add</Button>
      </form>
    )
  );
}
