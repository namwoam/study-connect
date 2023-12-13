import pandas as pd
import os
import numpy as np

user = pd.read_csv(os.path.join(os.path.dirname(__file__), "USER.csv"))
dept = pd.read_csv(os.path.join(os.path.dirname(__file__), "DEPARTMENT.csv"))
user["dept_code"] = user['student_ID'].str.slice(3, 6)+"0"

nonsense = [
    "你好，我是甲", "朱大哥還活著", "原來你也玩原神啊", "怎麼又是這個狼尾檳榔嘴",
    "古馳幫派，古馳幫派，古馳幫派(古馳幫派)", "你沒有要和我去新北耶誕城嗎好啊沒關係啊我沒差啊我就不重要啊你繼續找理由啊",
    "我的性別認同是一架攻擊直升機", "嗚嗚嗚拜託不要當我好不好🥺 我都有去上課欸😭😭期中我已經唸的很認真了😢😢差這一門課就可以畢業了🥺🥺我會好好認真讀書😭不要當我好嗎😭😭🙏🙏嗚嗚嗚",
    "他媽的這遊戲根本就不平衡 先攻的人永遠離星星近 然後又能偷別人錢",
    "沒有父母願意花二十年養一個長髮男",
    "幹你娘的腦洞破老鼠又忘記帶卡", "叫Gary的男生都很帥 但無一例外都是🈸==" ,"退gay圈了，不好意思，喝中药调理好了，青春仿佛是个梦梦醒了也该谢幕了，最近喜欢上了一个女孩子，列表里的男的都找我互删，我要做回直男，好好生活。",
    "浴室裡沒有人 水是我開的",

]

user["self_introduction"] = np.random.choice(
    nonsense, user.shape[0])

user.to_csv(os.path.join(os.path.dirname(__file__), "clean_USER.csv") , index=False)
