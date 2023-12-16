import sqlite3
import os
import pandas as pd

from pandas import DataFrame
from sqlalchemy import create_engine, text

db_path = os.path.join(
    os.path.dirname(__file__), "./db/data.db")


def query_database(query: str):
    con = sqlite3.connect(db_path)
    df = pd.read_sql(query, con)
    return df
    raise NotImplementedError


def update_database(query: str):
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    cur.execute(query)
    affected_rows = cur.rowcount
    if affected_rows == 0:
        raise f"Database not effected by:{query}"
    con.commit()
    return affected_rows


def update_database_df(df: DataFrame, table_name: str):
    engine = create_engine(f'sqlite:///{db_path}', echo=False)
    with engine.begin() as connection:
        df.to_sql(table_name, connection, if_exists='append', index=False)


if __name__ == "__main__":
    result = query_database(
        """
    SELECT * FROM USER
    """
    )
    print(result.head())
