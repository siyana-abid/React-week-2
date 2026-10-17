
function Home() {
  const name = localStorage.getItem("userName");

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>You have successfully logged in.</p>
    </div>
  );
}

export default Home;
