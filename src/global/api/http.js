import axios from 'axios';


async function post(url,body) {
    const response =  await axios.post(
        url,
        body
    )
    return response.data
}

async function get(url) {
    const response =  await axios.get(
        url
    )
    return response.data
}

export { post, get};
