from openai import OpenAI
from dotenv import load_dotenv
import pandas as pd
import os
from tqdm import tqdm
load_dotenv()

hobbies = pd.read_csv(os.path.join(os.path.dirname(__file__), "hobbylist.csv"))


def generate(name: str, dept: str):
    client = OpenAI()
    hobby = hobbies["Hobby-name"].sample(1).to_list()[0]
    completion = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=f"生成學生的自我介紹 姓名： {name} 科系：{dept} 嗜好：{hobby} 以繁體中文輸出 簡短一點",
        max_tokens=200
    )
    print(completion)
    return completion.choices[0].text


if __name__ == "__main__":
    df = pd.read_csv(os.path.join(os.path.dirname(__file__), "clean_USER.csv"))
    df["intro"] = ""
    for i in tqdm(range(3)):
        df.loc[i, -1] = generate(df.loc[i, "name"],
                                 df.loc[i, "department_name"])
    df.to_csv(os.path.join(os.path.dirname(__file__), "result_USER.csv"))
