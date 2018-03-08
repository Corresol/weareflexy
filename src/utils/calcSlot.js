const calcSlot = (passed) => {
  let hour = Math.floor(passed / 60)

  let minutes = passed - (hour * 60)

  if (minutes === 60) {
    minutes = 0
    hour++
  }

  return (hour === 0 ? '00' : hour) + ':' + (minutes === 0 ? '00' : minutes)
}

const generate = () => {
  let times = []

  const beginCount = (10 * 60) / 15
  const endCount = (20 * 60) / 15

  for (let i = beginCount; i < endCount; i++) {
    const passed = i * 15

    times.push({
      start: calcSlot(passed),
      end: calcSlot(passed + 15)
    })
  }
}

export default generate
