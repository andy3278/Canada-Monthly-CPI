import stats_can
import pandas as pd
df = stats_can.sc.vectors_to_df('v41690914', periods = 6)
df.columns = ['CPI']
df.index.names = ['Date']
print(df.head())