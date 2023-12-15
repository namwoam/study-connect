import sqlite3
import os
import pandas as pd


def query_database(query: str):
    con = sqlite3.connect(os.path.join(
        os.path.dirname(__file__), "./db/data.db"))
    df = pd.read_sql(query, con)
    return df
    raise NotImplementedError


def update_database(query: str):
    con = sqlite3.connect(os.path.join(
        os.path.dirname(__file__), "./db/data.db"))
    cur = con.cursor()
    cur.execute(query)
    affected_rows = cur.rowcount
    if affected_rows == 0:
        raise f"Database not effected by:{query}"
    con.commit()
    return affected_rows


if __name__ == "__main__":
    result = query_database(
        """
    SELECT * FROM USER
    """
    )
    print(result.head())
