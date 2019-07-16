## React Native 学习笔记

###### tbc

+ `<View>` 组件相当于 `<div>` 或是 `<span>` 。

+ `<Text>` 用来显示文本。

+ `<Image>` 用来显示图片，`source` 属性指定图片地址，`style` 属性中的 `width` 和 `height` 可以指定尺寸。

+ `style` 属性可以传入一个数组，后面的样式会覆盖前面的样式以实现继承

  ```react
  <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
  
  const styles = StyleSheet.create({
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
  });
  ```

+ >组件能够撑满剩余空间的前提是其父容器的**尺寸不为零**。如果父容器既没有固定的`width`和`height`，也没有设定`flex`，则父容器的尺寸为零。其子组件如果使用了`flex`，也是无法显示的。

+ 使用 `Flexbox` 布局：

  + `flexDirection`: 决定布局的**主轴**。
  + `justifyContent`: 决定其子元素沿着**主轴**的**排列方式**。
  + `alignItems`: 决定其子元素沿着**次轴**的**排列方式**。

+ 对于 `<TextInput>` 组件，react 中的 `onChange` 对应的是 react native 中的 `onChangeText`。

+ 对于 `<Button>` 组件，react 中的 `onClick` 对应的是 react native 中的 `onPress`。

+ 让一块区域变得可以点击，可以使用 `Touchable` 系列组件。

+ 让一块区域变得可以滚动，可以使用 `<ScrollView>` 组件。

+ 长列表组件：`<FlatList>`, `<SectionList>`, 后者更适合渲染需要分组的数据。

+ > keyExtractor 此函数用于为给定的item生成一个不重复的key。Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标。

+ 与后端交互：使用 `fetch` :

  ``` react
  const response = await fetch(
  	'https://facebook.github.io/react-native/movies.json',
  );
  ```

+ >在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对

+ > 要往 App 中添加一个**静态图片**（非网络图片），只需把图片文件放在代码文件夹中某处，然后像下面这样去引用它：
  >
  > ```react
  > <Image source={require('./my-icon.png')} />
  > ```
  >
  > require 中的图片名字必须是一个**静态字符串**（不能使用变量！因为 require 是在编译时期执行，而非运行时期执行！）。

+ `setInterval` 中的第一个参数最好是箭头函数，如果只写函数名会报玄学错误。

  即 `()=>this.update()` 和 `this.update` 的区别。

+ 用 `react-native-amap3d` 高德地图包时，会报 :app:transformDexArchiveWithExternalLibsDexMergerForDebug 类似的错误，解决方法是在 `app/build.gradle` 文件中加上这一行：

  ```
  android {
  	defaultConfig {
          applicationId "com.front_end"
          minSdkVersion rootProject.ext.minSdkVersion
          targetSdkVersion rootProject.ext.targetSdkVersion
          versionCode 1
          versionName "1.0"
          multiDexEnabled true    # here
      }
  }
  ```

+ 调用安卓原生定位接口：

  ```react
  import Geolocation from 'Geolocation'
  
  Geolocation.getCurrentPosition(data => {
                          console.log(data.coords)
                      }, e => {
                          console.log(e, 'error');
                      },
                      { enableHignAccuracy: false, timeout: 20000, maximumAge: 10000 }
  )  //make sure geolocation won't get timeout
  ```

##### Last-modified date: 2019.7.16, 10 a.m.