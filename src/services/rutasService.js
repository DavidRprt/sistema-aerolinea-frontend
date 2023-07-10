import axios from "axios"

const getAll = async () => {
  const url = `http://localhost:3001/api/rutas`
  const response = await axios.get(url)
  console.log(response)
  return response.data
}


// eslint-disable-next-line
export default { getAll }
