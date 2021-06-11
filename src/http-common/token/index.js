// import axios from 'axios';
// import { apiUrl } from "../../config/ConstantPaths";
import * as jwt from 'jsonwebtoken';

export default class TokenService {

    checkAuthentication(callback, data) {
        let token = localStorage.getItem("token");

        if (token !== null || token !== undefined || token !== "") {
            let decodedToken = jwt.decode(token, { complete: true });
            let dateNow = new Date();
            
            if (Number(Number(decodedToken.payload.exp) * 1000) < dateNow.getTime()) {
                localStorage.removeItem("token");
                window.location.href = "/";
                // })
                // .then(callback);
                callback()
            } else
                return callback(data);
        } else {
            window.location.href = "/";
        }
    }

    checkUserType() {
        let token = localStorage.getItem("token");

        if (token !== null || token !== undefined || token !== "") {
            let decodedToken = jwt.decode(token, { complete: true });
            if ([null, "", undefined].includes(decodedToken))
                return false
            else
                return decodedToken.payload.userType
        } else {
            window.location.href = "/";
        }
    }
}