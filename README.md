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

### Abnormal and normal
For search abnormal days i used summary_status
field that have uncorrect value like: failed, error or stopped. Also can count duration  of tests and get average of them and sort abnormal and normal days.

### Result

[solano-app]: <https://solano-labs-test-app.herokuapp.com/>
### [SolanoLabsTestApp][solano-app]