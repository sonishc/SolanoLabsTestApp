function failes(obj, created_at) {
  var conut_of_errors_per_day = []
  for (item in obj) {
    if ( sessions[item]['summary_status'] == 'failed' || sessions[item]['summary_status'] == 'error' || sessions[item]['summary_status'] == 'failed' == 'stopped' ){
      index = created_at.indexOf(sessions[item]['created_at'].slice(0,10))
      conut_of_errors_per_day.push(index)
    }
  }

  var occurrences_obj = countRepeatedItem(conut_of_errors_per_day)
  var average = averageFails(occurrences_obj)

  for (item in occurrences_obj) {
    if (occurrences_obj[item] > average) {
      occurrences_obj[item] = 'Abnormal'
    }else {
      occurrences_obj[item] = 'Normal'
    }
  }
  return occurrences_obj
}

function averageFails(obj) {
  summ = 0;
  for (item in obj) {
    summ += obj[item]
  }
  average = summ / Object.keys(obj).length
  return average
}

function removeRepeatedItem(arr) {
  var arr = arr.filter( function( item, index, inputArray ) {
    return inputArray.indexOf(item) == index;
  });
  return arr;
}

function countRepeatedItem(arr) {
  var occurrences = { };
  for (var i = 0, j = arr.length; i < j; i++) {
     occurrences[arr[i]] = (occurrences[arr[i]] || 0) + 1;
  }

  return occurrences; 
}

function getDataForDatasets(data_objects, label_array, field) {
  var duration_time_sort = []; 
  for (i=0; i<label_array.length; i++ ) {
    duration_time_sort.push([])
  }

  for (let i = 0; i < data_objects.length; i++) {
    var index = label_array.indexOf(data_objects[i]['created_at'].slice(0,10))
    if (data_objects[i]['summary_status'] == 'failed' || data_objects[i]['summary_status'] == 'stopped'){
      duration_time_sort[index].push(data_objects[i][field] * -1);
    }else {
      duration_time_sort[index].push(data_objects[i][field]);
    }
  }

  var counter = [];
  for (let i = 0; i < duration_time_sort.length; i++) {
    counter.push(duration_time_sort[i].length)
  }

  var duration_time_unsort = []
  for (let i=0; i<Math.max(...counter); i++) {
    tmp = []
    for (let j=0; j<duration_time_sort.length; j++) {
      tmp.push(duration_time_sort[j][i])
    }
    duration_time_unsort.push(tmp)
  }

  return duration_time_unsort;
}
