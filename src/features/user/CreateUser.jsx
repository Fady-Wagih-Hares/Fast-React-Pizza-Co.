import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateUserName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  // bad practice to connect the redux with input failed directly
  const [username, setUsername] = useState("");
  // access to dispatch function on redux
  const dispatch = useDispatch();
  // redirect to the menu
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    // updating Redux state
    dispatch(updateUserName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-full max-w-72 sm:w-72"
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
