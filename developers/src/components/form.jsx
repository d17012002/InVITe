import { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/setadmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
    } else {
      console.error(`Failed with status code ${response.status}`);
    }
  };

  return (
    <div className="form-container">
      <fieldset>
        <legend>Registration</legend>
        <form>Form will come here</form>
      </fieldset>

      <form onSubmit={handleSubmit}>
        <label>Enter your Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Enter your Name </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Enter Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button type="submit">
        Submit
      </button>
    </div>
  );
}
export default Form;
