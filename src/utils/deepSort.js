const deepSort = (stack, field, reverse) => {
  const dynamicSort = (property) => {
    var sortOrder = 1

    if (property[0] === '-') {
      sortOrder = -1
      property = property.substr(1)
    }

    return (a, b) => {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
      return result * sortOrder
    }
  }

  if (typeof stack.length === 'undefined') {
    var collect = []

    for (var item in stack) {
      collect.push(stack[item])
    }
  } else {
    collect = stack
  }

  var property = (reverse) ? '-' + field : field

  collect.sort(dynamicSort(property))

  return collect
}

export default deepSort
