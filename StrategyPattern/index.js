// 바뀌는 부분을 별도로 캡슐화 //
class 날다 {
  난다() { console.log('난다') }
  못난다() { console.log('못난다') }
}

class 울다 {
  꽥꽥() { console.log('꽥꽥') }
  삑삑() { console.log('삑삑') }
  무음() { return }
}
// =================================//

class 오리 {
  constructor() {
    this.날다 = null
    this.울다 = null
  }

  보여지는것() {
    console.log('오리')
  }

  수영() {
    console.log('수영')
  }

  set 날다입력(fn) {
    this.날다 = fn
  }
  set 울다입력(fn) {
    this.울다 = fn
  }
}

class 청동오리 extends 오리 {
  보여지는것() {
    console.log('청동오리')
  }
}

class 고무오리 extends 오리 {
  보여지는것() {
    console.log('고무오리')
  }
}

class 나무오리 extends 오리 { }

const 청동 = new 청동오리()
const 고무 = new 고무오리()
const fly = new 날다()
const quact = new 울다()

청동.날다입력 = fly.난다
청동.날다()
고무.날다()
