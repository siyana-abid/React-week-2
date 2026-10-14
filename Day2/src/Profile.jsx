import useFetch from "./useFetch";

function Profile() {
  const users = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default Profile;