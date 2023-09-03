import { v4 as uuidv4 } from 'uuid'
export const USER_ID = () => {
  let id = localStorage.getItem('USERID')
  if (!id) {
    id = uuidv4()
    localStorage.setItem('USERID', id)
  }
  return id
}
