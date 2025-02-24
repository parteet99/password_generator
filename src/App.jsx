import { useCallback, useEffect, useState, useRef } from "react";

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [passCopied, setpassCopied] = useState("Copy")


  // const passwordGenerator = useCallback(() => {
  //   let pass = ""
  //   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  //   if (numberAllowed) {
  //     str += "0123456789"
  //   }
  //   if (charAllowed) {
  //     str += "!@#$%^&*"
  //   }

  //   for (let i = 1; i <= length; i++){
  //     let char = Math.floor(Math.random() * str.length + 1)

  //     pass += str.charAt(char)    //selecting index of all characters in str with defaut length {8}.
  //     /* pass += because we have to append each character in pass after randomly generating chars */
  //   }

  //   setPassword(pass)


  // }, [length, numberAllowed, charAllowed])

  // password copy (useRef)
  const passRef = useRef(null)
  /* This hook is used to give user a indication/reference that password is copied */

  const passwordGenerator = () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*"
    }

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)    //selecting index of all characters in str with defaut length {8}.
      /* pass += because we have to append each character in pass after randomly generating chars */
    }

    setPassword(pass)

  }


  const copyPasswordToClipboard = () => {

    passRef.current?.select()        //highlight the character
    // passRef.current?.setSelectionRange(0, 11)
    window.navigator.clipboard.writeText(password)
    setpassCopied("Copied!")

  }


  // For real time re-rendering of password without refreshing
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  /* Here length, numberAllowed and charAllowed are dependencies of passwordGenerator()
    as passwordGenerator() will not re-render if any of these dependencies are not written
    (Called on loading of page, If any dependencies changed, quick re-render is done without reloading of page)
  */

  return (
    <>
      <div className="w-full max-w-md mx-auto px-4 py-3 my-8 rounded-lg bg-gray-800 text-white">
        <h1 className="text-center my-2">Password generator</h1>
        <div className="flex rounded-lg  overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-3 text-black"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          {/* To generate password on click button, use this button */}
          {/* <button className="outline-none bg-blue-600 px-3" onClick={passwordGenerator}>Generate</button> */}
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-600 px-3 hover:bg-blue-800">{ passCopied }</button>
        </div>
        <div className="flex">
        <div className="flex text-sm items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={10}
            value={length}
            className="cursor-pointer"
            onChange={(e)=> setLength(e.target.value)}
          />
          <label className="text-white">Length: { length }</label>
        </div>
        <div className="flex items-center gap-x-1  text-sm">
          <label className="mx-2" htmlFor="numberInput">Numbers</label>
          <input
            type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev)=> !prev)    //used for flipping from true or false
              }}
            />
        </div>  
        <div className="flex items-center gap-x-1 text-sm">
          <label className="mx-2" htmlFor="charInput">Characters</label>
          <input
            type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev)=> !prev)     //used for flipping from true and false 
              }}
            />
        </div>  
        </div>
      </div>
    </>
  )
}

export default App



/* 
  EXAMPLE:

let [numberAllowed, setNumberAllowed] = useState(false)
 
setNumberAllowed((prev) => !prev) 

  this means that whatever the previous value was will be changed
  to true or false respectively


*/