import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState(null);

// useRef hook 

const passwordRef = useRef(null)

  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*-_+=";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    console.log(pass);
    setPassword(pass);
  }, [length, numberAllow, charAllow]);

 const copyToClipboard = useEffect(()=> {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
 }, [password])

  useEffect(()=> {
    passwordGenerator();
  },[length, numberAllow,charAllow,passwordGenerator])
  return (
    <>
      <div className="w-full text-white max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black"
            placeholder="password"
            readOnly
            ref={passwordRef}
            
          />
          <button 
          onClick={copyToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={5}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked= {numberAllow}
            id="numberInput"
            onChange={()=>{
              setNumberAllow((prev) => !prev)
            }} />
            <label htmlFor="numberInput">Numbers</label>

          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked= {charAllow}
            id="charInput"
            onChange={()=>{
              setCharAllow((prev) => !prev)
            }} />
            <label htmlFor="charInput">Character</label>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
