function lengthOfLongestSubstring (s) {
  let map = new Map()
  let max = 0
  let start = 0
  for (let i = 0; i < s.length; i++) {
    let ch = s[i]
    if (map.has(ch)) {
      start = Math.max(map.get(ch) + 1, start)
    }
    max = Math.max(max, i - start + 1)
    map.set(ch, i)
    console.log(max, start, i, map)
  }

  return max
}
console.log(lengthOfLongestSubstring('abbcd'))

function findMedianSortedArrays (nums1, nums2) {
  // 两个正序数组的中位数
  if (nums2.length > nums1.length) {
    [nums1, nums2] = [nums2, nums1]
  }
  let res = []
  let i = 0
  let j = 0
  while (i < nums1.length && j < nums2.length) {
    while (nums1[i] < nums1[j]) {
      res.push(nums1[1])
      i++
    }
    while (nums1[i] > nums1[j]) {
      res.push(nums2[j])
      j++
    }
  }
  while (i >= nums1.length) {
    j++
    res.push(nums2[j])
  }
  while (j >= nums2.length) {
    i++
    res.push(nums2[i])
  }
  let indexs = []
}
findMedianSortedArrays([1, 3], [2])
