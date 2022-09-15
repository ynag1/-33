// 将file对象转成base64
export function resolveToBase64(file) {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    // 当上面的读取之后才会执行
    // 读取的时候是异步的
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
