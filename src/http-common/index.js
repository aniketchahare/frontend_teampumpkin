import axios from 'axios'

const HTTP = axios.create({
    baseURL: 'http://localhost:4000',
    // headers:{
    //     Authotization: 'token'
    // }
})

export const Register = (data) => {
    return HTTP.post("/create-user", data)
}

export const Login = (userData) => {
    return HTTP.post("/signin-user", userData)
}

export const GetAllCategory = () => {
    return HTTP.get("/category", {
        headers: {
            token: localStorage.getItem("token"),
        },
    })
}

export const GetAllImages = (id) => {
    return HTTP.get(`/images/${id}`, {
        headers: {
            token: localStorage.getItem("token"),
        },
    })
}

export const Upload = (data) => {
    return HTTP.post(`/upload/image`, data, {
        headers: {
            token: localStorage.getItem("token"),
        },
    })
}

export const GetDownloadsReport = () => {
    return HTTP.get(`/download/report`, {
        headers: {
            token: localStorage.getItem("token"),
        },
    })
}

export const Download = (imgUrl) => {
    let extension = imgUrl.split('.').pop();
    console.log(extension);
    axios({
        url: imgUrl,
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log(url);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `file.${extension}`);
        document.body.appendChild(link);
        link.click();
    });
}