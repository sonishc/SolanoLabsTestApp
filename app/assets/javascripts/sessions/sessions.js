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

function get_fields(obj, created_at, field) {
  var conut_of_errors_per_day = []
  for (item in obj) {
    if ( sessions[item]['summary_status'] == field){
      index = created_at.indexOf(sessions[item]['created_at'].slice(0,10))
      conut_of_errors_per_day.push(index)
    }
  }

  var occurrences_obj = countRepeatedItem(conut_of_errors_per_day)
  console.log(occurrences_obj);
  return occurrences_obj;
}

function createData(obj, length) {
  let arr_tmp = new Array(length)
  for (x in obj) {
    arr_tmp[x] = obj[x]
  }
  return arr_tmp;
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
