import { useState, useCallback, useEffect , useRef} from 'react'
import './App.css'

function App() {
  let [length, setLength] = useState(8)
  let [numberAllowed, setnumberAllowed] = useState(false)
  let [charAllowed, setcharAllowed] = useState(false)
  let [password, setPassword] = useState("")

  let passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&"

    for (let index = 1; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  let copytoclipboard = useCallback(()=>{
      window.navigator.clipboard.writeText(password)
  },[password])
  

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword])


  return (
    <div className='outer'>
      <h4>Password Generaotor</h4>
      <div className='input-copy'>
        <input type='text'
          value={password}
          placeholder='Password'
          readOnly
        />

        <button onClick={copytoclipboard} className='copy_tooltip'>COPY</button>
      </div>
      <div className='pass-property'>
        <input type='range'
          min={6}
          max={100}
          value={length}
          onChange={(e) => { setLength(e.target.value) }}
        />
        <label>Length :{length}</label>
        <input type='checkbox'
          defaultChecked={numberAllowed}
          onChange={() => {
            setnumberAllowed((prev) => !prev)
          }}
        />
        <label>Numbers</label>
        <input type='checkbox'
          defaultChecked={charAllowed}
          onChange={() => {
            setcharAllowed((prev) => !prev)
          }}
        />
        <label>Characters</label>

      </div>
    </div>
  )
}

export default App