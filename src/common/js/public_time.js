// 公共方法的配置
export const myDOM = {
  /**
   * 判断是否有该 class
   */
  hasClass (el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  },

  /**
   * 添加 class
   */
  addClass (el, className) {
    if (this.hasClass(el, className)) {          // hasClass() 方法检查被选元素是否包含指定的 class
      return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  },

  /**
   * 获取/设置 自定义属性 data-${name}=val
   * 如果传入了 val 就设置自定义属性 `data-${name}` 的值为 val
   * 如果没有传入了 val 就获取自定义属性 `data-${name}` 的值
   */
  customAttribute (el, name, val) {
    if (val) {
      return el.setAttribute(`data-${name}`, val)     // setAttribute() 方法添加指定的属性，并为其赋指定的值。
    } else {
      return el.getAttribute(`data-${name}`)   // getAttribute() 方法返回指定属性名的属性值。
    }
  },

  /**
   * 去抖（节流）
   * 有一些浏览器事件可以很快地在短时间内多次触发，
   * 例如调整窗口大小、向下滚动页面、搜索框节流等。
   * 如果你将事件监听器绑定到窗口滚动事件，并且用户不断快速地向下滚动页面，
   * 则你的事件可能在1秒内触发数千次。这可能会导致一些严重的性能问题。
   * 解决这个问题的一种方法是去抖，通过限制再次调用函数之前必须经过的时间。
   * 因此，去抖的正确实现是将几个函数调用组合成一个，并且在经过一段时间后仅执行一次。
   *
   * document.addEventListener('scroll', debounce(function () {
   *   console.log('hello');
   * }, 1000));
   *
   * @param  {Function} fn    要节流的函数
   * @param  {number}   delay 延迟毫秒数
   */
  debounce (fn, delay) {
    let timer = null

    return function(...args) {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}
