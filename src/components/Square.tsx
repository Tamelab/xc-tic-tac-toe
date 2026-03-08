import { useState } from "react";

function Square() {
  const [value, setValue] = useState("");

  function handleClick() {
    setValue("X");
  }

  return (
    <button onClick={handleClick}>
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <div>
      <div>
        <Square />
        <Square />
        <Square />
      </div>

      <div>
        <Square />
        <Square />
        <Square />
      </div>

      <div>
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  );
}