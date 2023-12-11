import pandas as pd
import os

user = pd.read_csv(os.path.join(os.path.dirname(__file__), "USER.csv"))
dept = pd.read_csv(os.path.join(os.path.dirname(__file__), "DEPARTMENT.csv"))
user["dept_code"] = user['student_ID'].str.slice(3, 6)+"0"


user = user.merge(dept, left_on=user["dept_code"] , right_on=dept["department_ID"])

user.to_csv(os.path.join(os.path.dirname(__file__), "clean_USER.csv"))