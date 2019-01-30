import React from "react"
import { Animated, View, TouchableOpacity, StyleSheet, Dimensions, Text } from "react-native"
import PropTypes from "prop-types"

const SCREEN_WIDTH = Dimensions.get("window").width
const ACTIONS_WIDTH = 150
const ACTIONS_TIME = 200
class AnimatedItem extends React.Component {
  constructor(props) {
    super(props)
    this.leftOffset = new Animated.Value(0)
    this.state = {
      expanded: false
    }
  }

  onPress = () => {
    const { expanded } = this.state

    if (expanded) {
      this.collapse()
    } else {
      this.expand()
    }
  }

  expand = () => {
    Animated.timing(this.leftOffset, {
      toValue: -ACTIONS_WIDTH,
      duration: ACTIONS_TIME,
      useNativeDriver: true
    }).start()

    this.setState({ expanded: true })
  }

  collapse = () => {
    Animated.timing(this.leftOffset, {
      toValue: 0,
      duration: ACTIONS_TIME,
      useNativeDriver: true
    }).start()

    this.setState({ expanded: false })
  }

  render() {
    const animated = { transform: [{ translateX: this.leftOffset }] }
    const { containerStyle, actionStyle, actionPress, actionItem, children } = this.props
    return (
      <Animated.View style={[styles.main, animated]}>
        <TouchableOpacity
          style={[styles.container, containerStyle]}
          onPress={this.onPress}
          activeOpacity={0.5}
        >
          {children}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionsContainer, actionStyle]}
          onPress={actionPress ? actionPress : this.collapse}
          activeOpacity={0.5}
        >
          {actionItem}
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const FallbackAction = () => {
  return (
    <View>
      <Text>No Action</Text>
    </View>
  )
}

AnimatedItem.defaultProps = {
  containerStyle: {},
  actionStyle: {},
  actionPress: () => {},
  actionItem: FallbackAction()
}

AnimatedItem.propTypes = {
  containerStyle: PropTypes.object,
  actionStyle: PropTypes.object,
  actionPress: PropTypes.func,
  actionItem: PropTypes.element
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    width: SCREEN_WIDTH,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    height: 50,
    margin: 10,
  },
  container: {
    flexDirection: "row",
    width: SCREEN_WIDTH,
    position: "absolute",
    alignItems: "center",
    left: 0,
    height: 50,
    padding: 10
  },
  actionsContainer: {
    width: ACTIONS_WIDTH,
    left: SCREEN_WIDTH,
    backgroundColor: "#EDF4FF",
    borderLeftColor: "#AFAFAF",
    borderLeftWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: 50
  }
})

export default AnimatedItem
