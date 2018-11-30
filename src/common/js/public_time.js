// 公共方法的配置
export const myDOM = {
  /**
   * 判断是否有该 class
   */
  hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  },

  /**
   * 添加 class
   */
  addClass(el, className) {
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
  customAttribute(el, name, val) {
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
  debounce(fn, delay) {
    let timer = null

    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

// 时间戳转换的处理
export const timer = {
  dateDiff(timestamp) {
    // 补全为13位
    var arrTimestamp = (timestamp + '').split('');
    for (var start = 0; start < 13; start++) {
      if (!arrTimestamp[start]) {
        arrTimestamp[start] = '0';
      }
    }
    timestamp = arrTimestamp.join('') * 1;

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - timestamp;

    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
      return '不久前';
    }

    // 计算差异时间的量级
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    // 数值补0方法
    var zero = function (value) {
      if (value < 10) {
        return '0' + value;
      }
      return value;
    };

    // 使用
    if (monthC > 12) {
      // 超过1年，直接显示年月日
      return (function () {
        var date = new Date(timestamp);
        return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
      })();
    } else if (monthC >= 1) {
      return parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
      return parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      return parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      return parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
      return parseInt(minC) + "分钟前";
    }
    return '刚刚';
  }
}

// 正则匹配出所有图片及所有图片地址src
export const images = {
  getimgsrc(htmlstr) {
    let list = [];
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let arr = htmlstr.match(imgReg);
    if (arr != null) {
      for (let i = 0; i < arr.length; i++) {
        let src = arr[i].match(srcReg);
        //获取图片地址
        if (src[1]) {
          let item = {
            id: i,
            src: src[1]
          }
          list.push(item);
        }
      }
      return list
    }
  }
}


