+ `reset` 重置导航栈

  ```react
  const login = StackActions.reset({
      index: 0,
      actions: [
          NavigationActions.navigate({ routeName: 'LoggedIn' })
      ]
  });
  ```

  ```react
  this.props.navigation.dispatch(login)
  ```

  actions 参数表明当前导航栈中有哪些 screen，

  index 参数表明 actions 数组中的第几个 screen 是栈顶

  尽管可以出现类似 `actions.size === 5` 而 `index === 2` 的情况，但是此时导航栈中只会保留 actions 中的前三个 screen，第四个和第五个应该是被丢弃了，所以我不是很明白为什么可以指定 index（直接 `index === actions.size - 1` 不就好了吗- -）

##### Last-modified date: 2019.7.5, 6 p.m.