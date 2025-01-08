import {useState} from "react"
import { IconSearch } from "@tabler/icons-react"
import Information from "./components/Information"




function App() {
/*
  const[data, setData] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null)
      useEffect(()=>{
         //Realizar la solicitud GET a la API 
          axios.get('http://localhost:5000')
            .then(response =>{
            setData(response.data)
            console.log(response.data)
            setLoading(false);
          })
          .catch(error => {
            setError(error)

          });
      },[]);

*/
const[text,setText]=useState<string>("") //Input Value
const [searchTerm, setSearchTerm] = useState<string>("") //Termino a buscar

const handleClick = (e: React.ChangeEvent<HTMLInputElement>)=>{
  setText(e.target.value.toUpperCase())
 
}


const handleSearch  = () =>{
  setSearchTerm(text) // Actualiza el terminode busqueda al valor del inputS
  setText('')//Limpia el Input
}


  return (
    <>
        <header className="bg-black py-8 ">
          <div className="  max-w-4xl mx-auto  flex justify-center gap-3 ">
          <input 
          className="shadow-lg relative  text-white bg-gray-600 w-96 p-2 border border-gray-300 rounded-3xl uppercase placeholder:left-28"
          type="text"
          placeholder="Buscar"
          value={text}
          onChange={handleClick}
          />
          <IconSearch 
          className="text-white  relative top-1 right-14 rounded-md w-8 h-8  cursor-pointer" 
          stroke={1.25}
          onClick={handleSearch} //Llamamos a la funcion al hacer clic
          />
        </div>

        </header>
          <main className="bg-black max-h-full">
          <Information  searchTerm={searchTerm}/>
          Cundisticnp58-njgx
          </main>
    </>
  )
}

export default App
