<?php
/**
 * Compare two nested associative arrays
 * 
 * @param array $arr1
 * @param array $arr2
 * @param array $returnKeyString
 * @access public
 * @return array
 */
function compareNestedArrays($arr1, $arr2, $returnKeyString = true) {

  $fieldChanges = __comparing($arr1, $arr2);
  if ($returnKeyString) {
    $tmp = [];
    $cc = count($fieldChanges);
    for ($i=0; $i<$cc; $i++) {
      $tmp[] = implode('.', $fieldChanges[$i]);
    }
    $fieldChanges = $tmp;
  }

  return $fieldChanges;
}


/**
 * Compare two nested associative arrays
 * CALLED By compareNestedArrays
 * 
 * @param array $arr1
 * @param array $arr2
 * @param array $nestedKey - Use to keep track of key when go into nested array
 * @param array $fieldChange - Use to store key of field changes
 * @access private
 * @return array
 */
function __comparing($arr1, $arr2, $nestedKey=[], &$fieldChanges = []) {
  foreach ($arr1 as $k1 => $v1) {
    if (!is_array($v1)) {
      $v2 = $arr2[$k1] ?? null;
      if ($v1 !== $v2) {
        $fieldChanges[] = array_merge($nestedKey, [$k1]);
      }
      continue;
    } else {
      __comparing($v1, $arr2[$k1], [$k1], $fieldChanges);
    }
  }

  return $fieldChanges;
}
?>
