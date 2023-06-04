import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router } from "react-router-dom"
import RoutesConfig from "./utils/routes"

function App() {
  return (
    <div className="App">
      <Router>
        <div className="flex h-screen bg-gray-200">
          <Sidebar />
          <div className="flex flex-col w-full">
            <Navbar />
            <RoutesConfig />
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
