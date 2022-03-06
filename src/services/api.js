import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:5000',
})

export const getRepositories = async (userId, query) => {
  let url = `/users/${userId}/repositories`

  if (query !== ''){
    url += `?q=${query}`;
  }

  return api.get(url)

}

export const deleteRepository = async (userId, repoId) => {
  let url = `/users/${userId}/repositories/${repoId}`

  return api.delete(url);

}

export const newRepository = async (userId, repoUrl) => {
  let url = `/users/${userId}/repositories`

  if (repoUrl !== ''){
    return api.post(url, {url: repoUrl});
  }
}