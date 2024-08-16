import axios from "axios"

const OWNER = "Xiangmian7"
const REPO = "next-starter"

axios.interceptors.response.use(res => {
  return res.data
})

export const getRepo = async () => {
  console.log("111")
  return await axios.get(`https://github.com/${OWNER}/${REPO}`)
}

export const getRepoTag = async () => {
  console.log("222")
  return await axios.get(`https://github.com/${OWNER}/${REPO}/tags`)
}
