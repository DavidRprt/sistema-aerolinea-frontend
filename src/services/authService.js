import axios from "axios"

const baseURL = process.env.REACT_APP_API_URL

const getAllEmployees = async () => {
  const response = await axios.get(`${baseURL}/clients`)
  return response.data
}

const requestPasswordReset = async (email) => {
  const response = await axios.post(`${baseURL}/request-reset-password`, {
    email,
  })
  return response.data
}

const getAllLogs = async () => {
  const response = await axios.get(`${baseURL}/logs`)
  return response.data
}

const getAllJobs = async () => {
  const response = await axios.get(`${baseURL}/jobs`)
  return response.data
}

const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${baseURL}/reset-password`, {
    token,
    newPassword,
  })
  return response.data
}

const updateEmployeeJob = async (idempleado, idempleo) => {
  const response = await axios.patch(`${baseURL}/update-employee-job`, {
    idempleado,
    idempleo,
  })
  return response.data
}

// eslint-disable-next-line
export default {
  requestPasswordReset,
  resetPassword,
  getAllEmployees,
  getAllJobs,
  updateEmployeeJob,
  getAllLogs
}
