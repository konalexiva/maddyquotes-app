import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
export default class AdviceText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showAdvice: props.showAdvice,
      showAnimation: true,
    };
  }

  stopAnimation = () => {
    this.setState({
      showAnimation: false,
    });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    this.setState({
      showAnimation: true,
    });
    setTimeout(this.stopAnimation, 3000);
    if (this.state.showAdvice == true) {
      return fetch('https://maddynyan-advice.herokuapp.com/api/advices/rand')
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson.text,
            },
            function() {},
          );
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.showAdvice !== this.props.showAdvice) this.fetchData();
  };

  render() {
    let showBlock =
      this.state.showAnimation == true ? (
        <LottieView
          source={require('../images/animatonForText.json')}
          autoPlay
          loop
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      ) : (
        <Text style={textStyles.container}>{this.state.dataSource}</Text>
      );

    return <View style={Styles.container}>{showBlock}</View>;
  }
}

const ImageBackgroundStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 5.5,
    borderColor: '#601040',
    resizeMode: 'cover',
  },
});

const textStyles = StyleSheet.create({
  container: {
    // zIndex: 2,
    // color: 'black',
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    fontFamily: 'mqfont',
  },
});

const Styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

{
  /* <ImageBackground */
}
{
  /* source={require('../images/textBack.png')} */
}
{
  /* style={ImageBackgroundStyles.container}> */
}
{
  /* <View style={Styles.container}> */
}
{
  /* <LottieView
          source={require('../images/animation.json')}
          autoPlay
          loop
          style={{height: 500, width: 100}}
        /> */
}
{
  /* </View> */
}
{
  /* </ImageBackground> */
}
