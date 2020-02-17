/**
 * Accessing nested JavaScript objects with string key
 * 
 * @param object obj
 * @param string path
 * @access public 
 * @return object
 */
function getArrayObjectValueByString(obj, path) {
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, '');           // strip a leading dot
  let arr = path.split('.');
  for (let i = 0, n = arr.length; i < n; ++i) {
      key = arr[i];
      if (key in obj) {
          obj = obj[key];
      } else {
          return;
      }
  }
  return obj;
}
