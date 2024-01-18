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
    <>
      <button className="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
}

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleClick() {
    setShowAddForm((s) => !s);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddForm(false);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddForm(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {/* Diplsay add form only when state is true  */}
        {showAddForm && <FormAddFriend onAddFriends={handleAddFriend} />}
        <Button onClick={handleClick}>
          {showAddForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}
function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : " "}>
      {/* Image  */}
      <img src={friend.image} alt={friend.name} />

      {/* Heading of Name  */}
      <h3>{friend.name}</h3>

      {/* BALANCE BASED ON CONTION WITH CLASS */}

      {/* if balance is less than 0 */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {friend.balance} $
        </p>
      )}

      {/* if balance is greater than 0 */}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance} $
        </p>
      )}

      {/* if balance == 0 */}
      {friend.balance === 0 && <p>You and {friend.name} are even </p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    // An Object of New User
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    // Set to friends Array
    onAddFriends(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> 🧑‍🤝‍🧑Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label> 🖼️Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <>
      <form className="form-split-bill">
        <h2>Split a bill with {selectedFriend.name}</h2>
        <label> 💰Bill Value </label>
        <input type="text"></input>

        <label> 🙎🏻Your Expense </label>
        <input type="text"></input>

        <label> 🧑‍🤝‍🧑 {selectedFriend.name}'s expenses</label>
        <input type="text" disabled></input>

        <label> Who is paying the bill</label>
        <select>
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button>Split Bill</Button>
      </form>
    </>
  );
}
export default App;
