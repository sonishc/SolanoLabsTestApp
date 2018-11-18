$( document ).on('turbolinks:load', function() {

  var sessions = ($('#sessions').data('sessionsJson'));

  var sessions_data        = new Array();
  var created_at            = new Array();
  var created_at_with_time  = new Array();
  var duration             = new Array();

  for (value in sessions) {
      sessions_data.push(sessions[value]);
      created_at.push(sessions[value]['created_at'].slice(0,10));
      var time = sessions[value]['created_at'].replace(/T/g, ' ').replace(/.000Z/g, ' ');
      created_at_with_time.push(time);
      duration.push(sessions[value]['duration']);        
  }

  created_at = removeRepeatedItem(created_at);

  var passed  = getFields(sessions_data, created_at, 'passed', sessions);
  var failed  = getFields(sessions_data, created_at, 'failed', sessions);
  var error   = getFields(sessions_data, created_at, 'error', sessions);
  var stopped = getFields(sessions_data, created_at, 'stopped', sessions);

  passed  = createData(passed, created_at.length);
  failed  = createData(failed, created_at.length);
  error   = createData(error, created_at.length);
  stopped = createData(stopped, created_at.length);


  var config = {
    type: 'bar',
    data: {
      labels: created_at,
      datasets: [{
        label: 'Passed',
        backgroundColor: 'rgba(90, 172, 86, .5)',
        data: passed
      }, {
        label: 'Failed',
        backgroundColor: 'rgba(192, 167, 148, .5)',
        data: failed
      }, {
        label: 'Error',
        backgroundColor: 'rgba(237, 7, 34, .7)',
        data: error
      }, {
        label: 'Stopped',
        backgroundColor: 'rgba(114, 68, 156, .5)',
        data: stopped
      }]
    },
    options: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltips: {
        mode: 'point',
        intersect: false
      },
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            zeroLineColor: 'black',
          }
        }]
      },
      responsive: true,
      onClick: function(e, d) {
        if (d.length > 0) {
          var conut_of_build_per_day = conutOfErrorPerDay(sessions_data, created_at, sessions)
          var norm_or_abnorm = abnormalOrNormal(conut_of_build_per_day);
          var day =  created_at[`${d[0]._index}`];
          norm_or_abnorm = norm_or_abnorm[`${d[0]._index}`];
          norm_or_abnorm = ( norm_or_abnorm == undefined )  ? 'Normal' : norm_or_abnorm
          alert(`${day} ( ${norm_or_abnorm} )`);
          var fail = document.getElementById('failes');
          fail.innerHTML = `${day} ( ${norm_or_abnorm} )`;
          fail.style.color =  norm_or_abnorm == 'Normal' ? 'green' : '' ; 
        }
      }
    },
  };

  var config2 = {
    type: 'line',
    data: {
      labels: created_at_with_time,
      datasets: [{
        label: 'Duration: ',
        data: duration,
        borderWidth: 1,
        borderColor: 'black',
        fill: false,
        stack: 1
      }] 
    },
    options: {
      legend: {
        display: false,
        position: 'bottom'
      },
      tooltips: {
        backgroundColor: 'green'
      },
      scales: {
        xAxes: [{
          gridLines: {
            zeroLineWidth: 2,
            zeroLineColor: 'gray',
          }
        }],
        yAxes: [{
          gridLines: {
            zeroLineWidth: 3,
          },
        }]
      }
    }
  };

  var ctx = document.getElementById('chartPassingFailing').getContext('2d');
  new Chart(ctx, config);

  var ctx2 = document.getElementById('durrationVsTime').getContext('2d');
  new Chart(ctx2, config2);
})

function conutOfErrorPerDay(sessions_data, created_at, sessions) {
  var conut_of_errors_per_day = [];
  for (var item in sessions_data) {
    if ( sessions[item]['summary_status'] == 'failed' || sessions[item]['summary_status'] == 'error' || sessions[item]['summary_status'] == 'failed' == 'stopped' ){
      var index = created_at.indexOf(sessions[item]['created_at'].slice(0,10));
      conut_of_errors_per_day.push(index);
    }
  }
  return conut_of_errors_per_day;
}

function abnormalOrNormal(conut_of_errors_per_day) {
  var occurrences_obj = countRepeatedItem(conut_of_errors_per_day);
  var average = averageFails(occurrences_obj);

  for (var value in occurrences_obj) {
    if (occurrences_obj[value] > average) {
      occurrences_obj[value] = 'Abnormal';
    }else {
      occurrences_obj[value] = 'Normal';
    }
  }
  return occurrences_obj;
}

function averageFails(occurrences_obj) {
  var total = 0;
  for (var value in occurrences_obj) {
    total += occurrences_obj[value];
  }
  var average = total / Object.keys(occurrences_obj).length;
  return average;
}

function getFields(sessions_data, created_at, summary_status, sessions) {
  var conut_of_errors_per_day = [];
  for (var value in sessions_data) {
    if ( sessions[value]['summary_status'] == summary_status) {
      index = created_at.indexOf(sessions[value]['created_at'].slice(0,10));
      conut_of_errors_per_day.push(index);
    }
  }
  var occurrences_obj = countRepeatedItem(conut_of_errors_per_day);
  return occurrences_obj;
}

function createData(obj_field, length) {
  var data_for_dataset = new Array(length);
  for (var value in obj_field) {
    data_for_dataset[value] = obj_field[value];
  }
  return data_for_dataset;
}

function removeRepeatedItem(arr) {
  var removed_repeated_item = arr.filter(function(item, index, inputArray) {
    return inputArray.indexOf(item) == index;
  });
  return removed_repeated_item;
}

function countRepeatedItem(arr) {
  var occurrences = { };
  for (var i = 0, j = arr.length; i < j; i++) {
     occurrences[arr[i]] = (occurrences[arr[i]] || 0) + 1;
  }
  return occurrences; 
}
