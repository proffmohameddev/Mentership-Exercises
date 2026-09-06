import UserList from "./UserList";

const App = () => {
  const users = [
    { id: 1, name: "Proff", email: "Proff@gmail.com" },
    { id: 2, name: "Mohamed", email: "Moha@gmail.com" },
  ];

  return (
    <div>
      <UserList users={users} />
    </div>
  );
};

export default App;
