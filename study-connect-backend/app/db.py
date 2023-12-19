import sqlite3
import os
import pandas as pd

from pandas import DataFrame
from sqlalchemy import create_engine, text

db_path = os.path.join(
    os.path.dirname(__file__), "./db/data.db")

engine = create_engine(f'sqlite:///{db_path}', echo=False)


def query_database(query: str):
    with engine.connect() as connection:
        df = pd.read_sql_query(text(query), connection)
    return df
    raise NotImplementedError


def update_database(query: str):
    with engine.connect() as connection:
        with connection.begin():
            connection.execute(text(query))
    return


def update_database_df(df: DataFrame, table_name: str):
    with engine.begin() as connection:
        df.to_sql(table_name, connection, if_exists='append', index=False)


if __name__ == "__main__":
    result = query_database(
        """
    SELECT * FROM USER
    """
    )
    print(result.head())
