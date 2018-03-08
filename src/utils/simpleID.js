const simpleID = () => {
  let now = new Date()

  return 'id-' + now.getTime() + '-' + (Math.random() * 10).toFixed(3)
}

export default simpleID
