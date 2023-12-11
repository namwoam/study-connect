import instance from '../instance';

//WIP
export const fetchUserInfo = async (userId) => {
    try {
        const response = await instance.get(`info/user/info/${userId}`);
        if (response.data.success) {
            return response.data.data;
        }
    } catch (error) {
        console.log(error);
    }
}