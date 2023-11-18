const timeOutSetter = (funct: any, time = 5000) => {
  return setTimeout(() => funct, time)
}

export default timeOutSetter
