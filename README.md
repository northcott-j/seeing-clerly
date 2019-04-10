# Seeing Clerly

Due to the Clery Act of 1990, all universities must publish a minimum set
of crime statistics each year - and this web tool allows you to see and
interact with this data.  Select a school and a crime to view the trend
over the past few years.  Providing inputs for state, city, and student
population will help filter the school name results.  

The application is initialized to display the reported cases of rape
from five of the major schools in Boston - though you can adjust the 
query to see the other ~11,000 in the database simply by clearing that
graph and adding your own (data provided by the [US Dept. of Education](http://ope.ed.gov/campussafety/#/)).

The data may not be 100% accurate, though we're working on verifying as
much of it as we can.


Technologies used:
 * [mLab](https://mlab.com/), for database hosting
 * [Heroku](https://www.heroku.com/), for hosting the backend of the webapp
 * [ChartJS](http://www.chartjs.org/), for displaying the graphs via javascript
 * [MDL](https://getmdl.io/), for the HTML template
 * tech stack includes node.js, SCSS, Express, Mongoose, Angular
 
