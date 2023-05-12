import axios from 'axios';

export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post('http://localhost:4000/register', {
            name: name,
            email: email,
            password: password,
        });
        return response.data;
    } catch (error) {
        throw Error('API: Error registering user: ' + error);
    }
};
