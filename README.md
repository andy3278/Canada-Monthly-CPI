# Canada-Monthly-CPI
> Display and Canada's CPI, unemployment rate, and weekly payroll 

Please go to [https://andy3278.github.io/Canada-Monthly-CPI/](https://andy3278.github.io/Canada-Monthly-CPI/) to see the project
![capture of the website](Canada%20CPI%20Trend%20Dashboard.jpeg)
## Project Description
- This porject use Python to scrape data from [Statistics Canada](https://www.statcan.gc.ca/en/start)
- [Stats_can python library](https://stats-can.readthedocs.io/en/latest/index.html#) is used to scrape data from Statistics Canada
- After scraping data, they are stored in csv and json files
- then a simple html website display the data
- This project is automated by Github Actions, it will run At 15:00 on day-of-month 25 in every month

##
[![run main.py](https://github.com/andy3278/Canada-Monthly-CPI/actions/workflows/actions.yml/badge.svg?event=schedule)](https://github.com/andy3278/Canada-Monthly-CPI/actions/workflows/actions.yml)
[![run main.py](https://github.com/andy3278/Canada-Monthly-CPI/actions/workflows/actions.yml/badge.svg?event=check_run)](https://github.com/andy3278/Canada-Monthly-CPI/actions/workflows/actions.yml)
