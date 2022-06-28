Airplane is a platform for automating tasks
https://app.airplane.dev/library


In this case the task was a nodejs script (https://docs.airplane.dev/creating-tasks/node). 
The script queries an external API and stores the results in a mongodb database 

This task is currently scheduled to run once per day (at 00:00 UTC)

To run the script locally:
```
airplane dev retrieve_and_store_btcusd_price_data.task.yaml
```

To run the from the airplane platform it must be deployed:
```
airplane deploy retrieve_and_store_btcusd_price_data.task.yaml
```