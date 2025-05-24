import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import toast from "react-hot-toast";
import RoomJoin from "./componente/RoomJoin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RoomJoin />
    </>
  );
}

export default App;
