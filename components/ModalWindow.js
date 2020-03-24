import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'react-native-elements';
export default class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: this.props.isModalVisible,
      temp: this.props.temp,
    };
  }
  toggleModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  componentDidUpdate = prevOps => {
    if (prevOps.temp !== this.props.temp) {
      this.setState({
        isModalVisible: true,
      });
    }
  };

  render() {
    return (
      <Modal isVisible={this.state.isModalVisible} animationInTiming={700}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'white',
            height: '50%',
          }}>
          <Image
            style={{width: 220, height: 210, resizeMode: 'cover'}}
            source={require('../images/pepe.png')}
          />
          <Text style={textStyles.container}>Кончились попытки</Text>
          {/* <Text style={textStyles.container}>Повторите позже!</Text> */}
          <Button
            title="ладно"
            onPress={this.toggleModal}
            containerStyle={{width: '40%'}}
            buttonStyle={{
              height: 40,
              backgroundColor: '#601040',
            }}
            titleStyle={{fontSize: 20}}
          />
          <View style={{height: '3%'}} />
        </View>
      </Modal>
    );
  }
}

const textStyles = StyleSheet.create({
  container: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '400',
  },
});
