// export的3种用法：
// method 1
const addition = (m, n) => {
  return m + n
}
const subtraction = (m, n) => {
  return m - n
}
export {
  addition,
  subtraction
}

// method 2
export const multiplication = (m, n) => {
  return m * n
}

// method 3
export default {
  division (m, n) {
    return m / n
  }
}