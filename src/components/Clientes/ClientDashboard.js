import SearchClientCard from "./SearchClientCard"
import RegistrarCliente from "./RegistrarClienteForm"
import ClientesLista from "./ClientesLista"

const ClientDashboard = () => {
  return (
    <div>
      <RegistrarCliente />
      <SearchClientCard />
      <ClientesLista />
    </div>
  )
}

export default ClientDashboard
