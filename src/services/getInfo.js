import axios from 'axios';

const getInfo = async (currentPage) => {
  const res = await axios.get(currentPage)
return res.data;
}
export default getInfo
