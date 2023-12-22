import instance from '../instance';

//WIP
export const fetchCourseInfo = async (courseID) => {
    try {
        const response = await instance.get(`info/course/info/${courseID}`);
        if (response.data.success) {
            return response.data.data;
        }
    } catch (error) {
        console.log(error);
    }
}