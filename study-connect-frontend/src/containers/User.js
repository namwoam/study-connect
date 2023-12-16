import { React, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  TextField,
  Paper, 
  Snackbar
} from '@mui/material';
import instance from '../instance';
import { fetchUserInfo } from '../utils/fetchUser'; 

const MainContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: "FFB7A1"
};

const BigCard = {
  // padding: '10px',
  width: '45%',
  margin: '20px',
  alignItems: 'center',
  display: 'flex', 
  flexDirection: 'column',
  paddingBottom: '20px'
};

const InfoCard = {
  padding: '15px',
  width: '90%',
  marginTop: '25px',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
};

const BigCourseCard = {
  padding: '15px',
  width: '90%',
  marginTop: '25px',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.16), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 9px 20px 0px rgba(0,0,0,0.12)',
  overflowY: 'auto',
  maxHeight: '50vh'
};

const CourseCard = {
  padding: '5px',
  width: '95%',
  margin: '5px',
  alignItems: 'center',
  borderRadius: '10px',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const currentUser = {
  uid: 'User ID',
  username: 'Your Name',
  department: 'Your Department',
  grade: 'Your Grade',
  IG: 'Your Instagram Account',
  FB: 'Your Facebook Account',
  selfIntro: 'Your Self Introduction, you can edit it here',
};

const currentCourseRecords = [//create 10 course 1nfo
  {uid: 11, coursename: 'course11', semester: '112-1', grade: 'Null', visibility: 1},
  {uid: 12, coursename: 'course12', semester: '112-1', grade: 'Null', visibility: 0},
  {uid: 13, coursename: 'course13', semester: '112-1', grade: 'Null', visibility: 1},
  {uid: 14, coursename: 'course14', semester: '112-1', grade: 'Null', visibility: 0},
  {uid: 15, coursename: 'course15', semester: '112-1', grade: 'Null', visibility: 1},
  {uid: 16, coursename: 'course16', semester: '112-1', grade: 'Null', visibility: 0},
  {uid: 17, coursename: 'course17', semester: '112-1', grade: 'Null', visibility: 1},
  {uid: 18, coursename: 'course18', semester: '112-1', grade: 'Null', visibility: 0},
  {uid: 19, coursename: 'course19', semester: '112-1', grade: 'Null', visibility: 1},
  {uid: 20, coursename: 'course20', semester: '112-1', grade: 'Null', visibility: 0},
]

const previousCourseRecords = [//create 10 course 1nfo
  {uid: 1, coursename: 'course1', semester: '112-1', grade: 'A', visibility: 1},
  {uid: 2, coursename: 'course2', semester: '112-1', grade: 'A', visibility: 1},
  {uid: 3, coursename: 'course3', semester: '112-1', grade: 'A', visibility: 0},
  {uid: 4, coursename: 'course4', semester: '112-1', grade: 'A', visibility: 0},
  {uid: 5, coursename: 'course5', semester: '112-1', grade: 'A', visibility: 1},
  {uid: 6, coursename: 'course6', semester: '112-1', grade: 'A', visibility: 0}, 
  {uid: 7, coursename: 'course7', semester: '112-1', grade: 'A', visibility: 0},
  {uid: 8, coursename: 'course8', semester: '112-1', grade: 'A', visibility: 1},
  {uid: 9, coursename: 'course9', semester: '112-1', grade: 'A', visibility: 0},
]

const UserPage = ({userID}) => {
  const [editingIntro, setEditingIntro] = useState("");
  const [editingFB, setEditingFB] = useState("");
  const [editingIG, setEditingIG] = useState("");
  const [editingSetCourseHistory, SetCourseHistory] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [courseRecords, setCourseRecords] = useState([]);

  const fetchUser = async () => {
    try {
      const getUserInfo = await fetchUserInfo(userID);
      //console.log("userpage user info:",getUserInfo);
      setUserInfo(getUserInfo);
      setEditingFB(getUserInfo.fb);
      setEditingIG(getUserInfo.ig);
      setEditingIntro(getUserInfo.self_introduction);
      return getUserInfo;
    }
    catch (error) {
      console.error('Error fetching userinfo:', error);
      throw error;
    }
  }

  const fetcCourseHistory = async () => {
    try {
      const response = await instance.get(`/user/enrolled_courses/${userID}`);
      if (response.data.success) {
        let courses = [];
        let enrolledCourses = response.data.data.courses;
        enrolledCourses.forEach((course) => {
            courses.push({id: course[0], courseName: course[1], semester: course[2], grade: course[3], visibility: course[4]})
        })
        setCourseRecords([...courses]);
      }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {    
    fetchUser();   
    fetcCourseHistory(); 
  }, [userID]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleIntroChange = (event) => {
    setEditingIntro(event.target.value);
    //console.log("Intro change:",editingIntro);
  };
  
  const handleIGChange = (event) => {
    setEditingIG(event.target.value);
    //console.log("IG change:",editingIG);
  };

  const handleFBChange = (event) => {
    setEditingFB(event.target.value);
    //console.log("FB change:",editingFB);
  };

  const handleUpdateVisibility = async (courseID, visibility) => {
    const alterVisibility = visibility === 0 ? 1 : 0;
    try {
      const response = await instance.post('/user/change_visibility', {
        user_id: userID,
        course_id: courseID,
        visibility: alterVisibility,
      });
      if (response.data.success) {
        setAlertMessage('Change visibility successfully');
        setOpenSnackbar(true);
        fetcCourseHistory(); 
      } else {
          setAlertMessage('Failed to change visibility');
          setOpenSnackbar(true);
      }
    } catch (error) {
        console.log(error);
    }
  }

  const updateUserIG = async () => {
    try {
      const updateContent = editingIG !== undefined && editingIG !== null ? editingIG.toString() : null;
      const response = await instance.post('/user/edit_contact/IG', {
          user_id: userID,
          update_content: updateContent
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserFB = async () => {
    try {
      const updateContent = editingFB !== undefined && editingFB !== null ? editingFB.toString() : null;
      const response = await instance.post('/user/edit_contact/FB', {
          user_id: userID,
          update_content: updateContent
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserIntro = async () => {
    try {
      const updateContent = editingIntro !== undefined && editingIntro !== null ? editingIntro.toString() : null;
      const response = await instance.post('/user/edit_intro', {
          user_id: userID,
          update_content: updateContent
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      await updateUserFB();
      await updateUserIG();
      await updateUserIntro();
      setAlertMessage('Update data successfully');
      setOpenSnackbar(true);
    }
    catch (error) {
      setAlertMessage('Failed to update data');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container sx={MainContainer}>
      <Typography variant="h5" fontWeight={800} sx={{ mt: '30px' }}>
        Edit Your Personal Info Here
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
          {/* 左側部分，顯示個人資訊 */}
          <Box sx={BigCard}>
            <Box sx={InfoCard}>
              <Typography variant="h6" fontWeight={600} sx={{ mt: '4px' }}>
                Personal Info
              </Typography>
              <Typography 
                sx={{ 
                  mt: 2,
                  fontSize: 12,
                  color: '#BBB'
                }}
              >
                ID
              </Typography>
              <Typography sx={{ mt: 2 }} >{userInfo.student_id ?? "User ID"}</Typography>
              <Typography
                sx={{
                  mt: 2,
                  fontSize: 12,
                  color: '#BBB'  
                }}  
              >
                Username
              </Typography>
              <Typography sx={{ mt: 2 }}>{userInfo.student_name ?? "User Name"}</Typography>
            </Box>
            <Box sx={InfoCard}>
              <Typography variant="h6" fontWeight={600} sx={{ mt: '4px' }}>
                Contact
              </Typography>
              <TextField
                multiline
                rows={1}
                label="Instagram帳號"
                variant="outlined"
                fullWidth
                value={editingIG}
                onChange={handleIGChange}
                sx={{ mt: 2 }}
              />
              <TextField
                multiline
                rows={1}
                label="Facebook帳號"
                variant="outlined"
                fullWidth
                value={editingFB}
                onChange={handleFBChange}
                sx={{ mt: 2 }}
              />
            </Box>
            <Box sx={InfoCard}>
              <Typography variant="h6" fontWeight={600} sx={{ mt: '4px' }}>
                Self Introduction
              </Typography>
              <TextField
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={editingIntro}
                onChange={handleIntroChange}
                sx={{ mt: 2 }}
              />
            </Box>
                  {/* Confirm Update Button */}
            <Button
              id="confirm-update-button"
              size="small"
              variant="contained"
              color="primary"
              onClick={handleConfirmUpdate}
              sx={{
                width: '200px',
                mt: '35px',
                textTransform: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Confirm Update
            </Button>
          </Box>

          {/* 右側部分，顯示修課紀錄 */}
          <Box sx={BigCard}>
            <Box sx={BigCourseCard}>
              <Typography variant="h6" fontWeight={600} sx={{ marginBottom: '8px', mt: '4px' }}>
                Current Course Records
              </Typography>
              {courseRecords.map((course, index) => (
                  <Grid container spacing={2} sx={CourseCard}>
                      <Paper elevation={0} style={{ border: '1px #d0d0d0 solid', borderRadius: '10px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '6px', paddingRight: '6px', margin: '3px', textAlign: 'center'}}>
                        <Typography>
                          {course.semester}
                        </Typography>
                      </Paper>
                      <Grid>
                          <Typography>
                              {course.courseName}
                          </Typography>
                      </Grid>
                      <Grid>
                          <Typography>
                              {course.grade === 'I' ? '' : course.grade}
                          </Typography>
                      </Grid>
                      <Grid
                          sx={{ 
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              alignItems: 'flex-end' 
                          }}
                      >
                          <Button
                              size='small'
                              variant="contained"
                              // if visibility == 1, color = primary, else color = secondary
                              color={course.visibility === 1 ? 'primary' : 'secondary'}
                              onClick={() => handleUpdateVisibility(course.id, course.visibility)}
                              sx={{width: '100px', mt: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                          >
                              {/* if visibility == 1, "Show", else Hide */}
                              {course.visibility === 1 ? 'Show' : 'Hide'}
                          </Button>
                      </Grid>
                  </Grid>
              ))}
            </Box>
            <Box sx={BigCourseCard}>
              <Typography variant="h6" fontWeight={600} sx={{ marginBottom: '8px', mt: '4px' }}>
                History Course Records
              </Typography>
              <Typography variant="h4" align="center" color="textSecondary" fontWeight={600} sx={{ marginBottom: '8px', mt: '4px' }}>
                No Records
              </Typography>
              {/* {previousCourseRecords.map((course, index) => (
                  <Grid container spacing={2} sx={CourseCard}>
                      <Paper elevation={0} style={{ border: '1px #d0d0d0 solid', borderRadius: '10px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '6px', paddingRight: '6px', margin: '3px', textAlign: 'center'}}>
                        <Typography>
                          {course.semester}
                        </Typography>
                      </Paper>
                      <Grid>
                          <Typography>
                              {course.coursename}
                          </Typography>
                      </Grid>
                      <Grid>
                        <Paper elevation={0} style={{ borderRadius: '10px', paddingTop: '2px', paddingBottom: '2px', paddingLeft: '8px', paddingRight: '8px', textAlign: 'center', background: '#F5E9D3' }}>
                          <Typography variant='subtitle2'>
                            {course.grade}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid
                          sx={{ 
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              alignItems: 'flex-end' 
                          }}
                      >
                          <Button
                              size='small'
                              variant="contained"
                              // if visibility == 1, color = primary, else color = secondary
                              color={course.visibility === 1 ? 'primary' : 'secondary'}
                              onClick={() => handleUpdateVisibility(course.uid)}
                              sx={{width: '100px', mt: '5px', textTransform: 'none', color: "#fff", fontSize: '14px', fontWeight: 600}}
                          >
                              // if visibility == 1, "Show", else Hide
                              {course.visibility === 1 ? 'Show' : 'Hide'}
                          </Button>
                      </Grid>
                  </Grid>
              ))*/} 
            </Box>
          </Box>
      </Box>
      <Snackbar
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={handleCloseSnackbar}
        message={alertMessage}
      />
    </Container>
  );
};

export default UserPage;
