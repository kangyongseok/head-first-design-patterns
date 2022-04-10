## 옵저버 패턴

한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체에게 연락이 가고 자동으로 내용이 갱신되는 방식으로 일대다 의존성을 정의  
상호작용하는 객체 사이에서는 가능하면 느슨한 결합을 사용해야 한다.  
주제는 옵저버들이 옵저버 인터페이스를 구현한다는것을 제외하면 옵저버에 관해서 전혀 모릅니다.  
따라서 이들 사이의 결합은 느슨하다.

옵저버 패턴을 사용하면 주제가 데이터를 보내거나 옵저버가 데이터를 가져올 수 있는데 이때 옵저버가 필요한 데이터만 가져오는 방식을 더 옳은 방식이라고 한다.

### 핵심

옵저버패턴의 핵심은 하나의 주제에 여러명의 구독자가 존재한다는것이고  
이를 구현하기위해 구독 / 해지 에 대한 메서드가 필요  
같은 주제를 구독하고 있다면 해당 옵저버들은 변경사항이 발생했을때 이를 확인할 수 있다.

### 구현

```js
function Click() {
  this.handlers = []
}
```

클릭 이벤트가 발생했을때 알림을 받을 구독 모델을 제공하려고 합니다.  
해당 생성자 함수는 주제가됩니다.

```js
Click.prototype = {
  subsctibe: function (fn) {
    // 구독 등록
    this.handlers.push(fn)
  },

  unsubscribe: function (fn) {
    // 구독 해제
    this.handlers = this.handlers.filter((item) => item !== fn && item)
  },

  fire: function (o, thisObj) {
    // 이벤트 발생 또는 업데이트
    var scope = thisObj || global
    this.handlers.forEach(function (item) {
      item.call(scope, o)
    })
  },
}

let clickHandler = (item) => console.log('fired ' + item)
let clickHandler2 = (item) => console.log('fired2 ' + item)

let click = new Click()

click.subsctibe(clickHandler)
click.subsctibe(clickHandler2)
click.fire('event #1')
// fired event #1
// fired2e vent #1
```

풀이를 하자면 구독중인 관찰자 (clickHandler) 를 생성하고 주제에 해당 관찰자가 구독을 요청합니다.  
handlers 에는 순차적으로 구독하려는 관찰자 함수들이 등록되고 이벤트를 발생 또는 업데이트가되면 구독에 등록되어있던 메소드들이 실행되는 형태입니다.

## 실제 사례

실제로 이러한 옵저버 패턴이 사용되고 있는걸 생각해보면 상태관리 라이브러리중 하나인 MobX 를 생각해 볼 수 있을것같습니다. 옵저버블로 객체를 등록해두고 action 이 발생하여 옵저버블에 등록된 객체에 변경사항이 발생하면 해당 객체를 구독중인 컴포넌트들에 대해서 리렌더링이 동작하게 됩니다.

위의 클릭 이벤트와는 조금 다른 모습이 될것같고 좀더 효율적인 옵저버 패턴을 생각해보면 단순히 변경에 따라 옵저버가 수동적으로 업데이트 되는것이 아니라 옵저버에 필요한 데이터만 골라서 가져갈 수 있는 방법을 생각해 볼 수 있습니다.
