# SolanoLabsTestApp
App build a chart for data of csv file 
# Description
App parse csv file and draws a data chart.
### Todos
 - Passing and failing builds per day, stacked-chart
 - Build duration vs. time. Use columns "duration" and "created_at"
 - Annotate days in the chart that have an "abnormal" number of failing builds
### Libs, gems
* ChartJs
* Rspec

##### Abnormal and normal
	To calculate abnormal days, I counted the average value of failed builds. What I did next. I counted the number of unsuccessful builds per day for all days, take their amount and their counts of failed builds. 
	Culculation: ( average = amount / counts of failed builds )
	.It gives me an average. Then if the count of failed builds per day is less than the average a day is considered as Normal. In other case this day is Abnormal.

### Result

[solano-app]: <https://solano-labs-test-app.herokuapp.com/>
### [SolanoLabsTestApp][solano-app]