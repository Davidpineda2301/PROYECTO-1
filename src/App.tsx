import {useState} from "react"

import { IconSearch } from "@tabler/icons-react"
import Description from "./components/Description"
import Information from "./components/Information"




function App() {

const[text,setText]=useState<string>('')

const handleClick = (e: React.ChangeEvent<HTMLInputElement>)=>{
  setText(e.target.value.toUpperCase())
 
}


  return (
    <>
        <header className="bg-black py-8 ">
          <div className="  max-w-4xl mx-auto  flex justify-center gap-3 ">
          <input 
          className="shadow-lg relative  text-white bg-gray-600 w-96 p-2 border border-gray-300 rounded-3xl uppercase"
          type="text"
          placeholder="Buscar"
          value={text}
          onChange={handleClick}
          />
          <IconSearch className="text-white  relative top-1 right-14 rounded-md w-8 h-8  cursor-pointer" stroke={1.25}/>2
        </div>

        </header>
          <main className="bg-black max-h-full">
          <Description />
          <Information />
          Cundisticnp58-njgx
          </main>
    </>
  )
}

export default App
