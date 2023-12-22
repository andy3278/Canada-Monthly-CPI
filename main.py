import stats_can
import pandas as pd

# how many months of data needed 
target_months = 13

def get_stats_can(table_id : str,   product_groups: str)-> pd.DataFrame:
    df = stats_can.sc.vectors_to_df(table_id, periods= target_months)
    df.columns = [product_groups]
    df.index.names = ['Date']
    return df

product_name = ["All-items","Food","Shelter","Household","Clothing","Transportation","Health","Recreation","Alcohol-tobacco-cannabis","All-exclude-food","All-exclude-food-energy"]
table_ids = ["v41690914","v41690915","v41690916","v41690917","v41690918","v41690919","v41690920","v41690921","v41690922","v41690923","v41690924"]

# put all product groups into one dataframe
df = pd.DataFrame()
for i in range(len(product_name)):
    df = pd.concat([df,get_stats_can(table_ids[i],product_name[i])],axis=1)

# this is what the dataframe looks like
#             All-items   Food  Shelter  Household  Clothing  Transportation  Health  Recreation  Alcohol-tobacco-cannabis  All-exclude-food  All-exclude-food-energy
# Date                                                                                                                                                               
# 2022-11-01      154.3  177.8    167.2      132.8      95.2           170.1   141.2       124.8                     184.7             150.0                    144.3
# 2022-12-01      154.3  178.7    167.8      132.7      96.1           168.6   142.0       124.6                     185.2             149.8                    144.8
# 2023-01-01      154.7  180.4    168.0      132.2      95.8           168.2   142.7       124.6                     186.5             149.9                    145.0
# 2023-02-01      154.9  181.2    168.3      133.3      96.6           166.9   143.4       124.3                     187.4             150.1                    145.5
# 2023-03-01      155.3  182.0    168.9      133.2      96.9           166.5   144.2       124.9                     188.7             150.4                    146.0

# save the dataframe to csv
#df.to_csv("./data/Canada_CPI_11012022_11012023.csv")
# save the dataframe to json
df.reset_index(inplace=True)
df.to_json("./data/Canada_CPI_11012022_11012023.json", orient='records')
