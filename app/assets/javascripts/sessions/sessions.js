function abnormal(obj) {
  for (item in obj) {
    if ( sessions[item]['summary_status'] == 'failed' || sessions[item]['summary_status'] == 'error' || sessions[item]['summary_status'] == 'failed' == 'stopped' )
    {
      return 'abnormal'
    }
  }
  return 'normal'
}

function colorTag(color) {
  switch (color) {
    case 'passed':
      var res = "rgba(48, 255, 51, .3)"
      break;
    case 'failed':
      var res = "rgba(255, 60, 0, .3)"
      break;
    case 'error':
      var res = "rgba(255, 0, 0, .9)"
      break;
    case 'stopped':
      var res = "#8D6645"
      break;
  }
  return res;
}

function removeRepeatedItem(arr) {
  var arr = arr.filter( function( item, index, inputArray ) {
    return inputArray.indexOf(item) == index;
  });
  return arr;
}
