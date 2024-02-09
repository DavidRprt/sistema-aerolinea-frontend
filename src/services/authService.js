import axios from "axios"

const baseURL = `http://localhost:3001/api`

const requestPasswordReset = async (email) => {
  const response = await axios.post(`${baseURL}/request-reset-password`, {
    email,
  })
  return response.data
}

const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${baseURL}/reset-password`, {
    token,
    newPassword,
  })
  return response.data
}

// eslint-disable-next-line
export default { requestPasswordReset, resetPassword }
