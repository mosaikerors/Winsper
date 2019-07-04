# React-native Tutorial

## [React-navigation](https://reactnavigation.org/en/)

### Hello React Navigation

- React Native doesn't have a built-in API for navigation like a web browser does. React Navigation provides this for you, along with the iOS and Android gestures and animations to transition between screens.
- ```createStackNavigator``` is a function that takes a route configuration object and an options object and returns a React component.
- The keys in the route configuration object are the route names and the values are the configuration for that route. The only required property on the configuration is the screen (the component to use for the route).
- To specify what the initial route in a stack is, provide an ```initialRouteName``` on the stack options object.

### Moving between screens

- ```this.props.navigation.navigate('RouteName')``` pushes a new route to the stack navigator if it's not already in the stack, otherwise it jumps to that screen.
- We can call ```this.props.navigation.push('RouteName')``` as many times as we like and it will continue pushing routes.
- The header bar will automatically show a back button, but you can programmatically go back by calling ```this.props.navigation.goBack()```. On Android, the hardware back button just works as expected.
- You can go back to an existing screen in the stack with ```this.props.navigation.navigate('RouteName')```, and you can go back to the first screen in the stack with ```this.props.navigation.popToTop()```.
- The navigation prop is available to all screen components (components defined as screens in route configuration and rendered by React Navigation as a route).
  
### <big>Navigation lifecycle</big>

### Passing parameters to routes

- ```navigate``` and ```push``` accept an optional second argument to let you pass parameters to the route you are navigating to. For example: ```this.props.navigation.navigate('RouteName', {paramName: 'value'})```  
You can read the params through ```this.props.navigation.getParam```  

### <big>Configuring the header bar</big>

### Header buttons
- You can set buttons in the header through the headerLeft and headerRight properties in navigationOptions.
- The back button is fully customizable with headerLeft, but if you just want to change the title or image, there are other navigationOptions for that — headerBackTitle, headerTruncatedBackTitle, and headerBackImage.

### Remaining to be learned

- App containers
- Opening a full-screen modal
- Next steps
- Glossary of terms
- Common mistakes
- Optimize memory usage and performance
- Limitations
