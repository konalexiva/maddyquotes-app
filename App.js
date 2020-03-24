import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AdviceText from './components/AdviceText';
import ModalWindow from './components/ModalWindow';
// import ImageBackgroundStyle from './components/styles/ImageBackgroundStyle';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
// import Model from '@nozbe/watermelondb'

import {Button} from 'react-native-elements';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fistClicked: false,
      btnClicked: false,
      temp: true,
      // tempTime: 1800000
      tempTime: 3000,
      lastTime: 0,
    };
  }

  setValue = (key, value) => AsyncStorage.setItem(key, String(value));

  getValue = key => AsyncStorage.getItem(key);

  componentDidMount = async () => {
    if ((await this.getValue('lastTime')) != null) {
      await this.setState({
        lastTime: Number(await this.getValue('lastTime')),
      });
    } else {
      await this.setValue('lastTime', String(Date.now()));
      await this.setState({
        lastTime: Number(await this.getValue('lastTime')),
      });
    }
    if ((await this.getValue('triesCount')) != null) {
      this.setState({
        triesCount: Number(await this.getValue('triesCount')),
      });
    } else {
      await this.setValue('triesCount', '10');
      this.setState({
        triesCount: Number(await this.getValue('triesCount')),
      });
    }
    let deltaDate = Date.now() - this.state.lastTime;
    let checkCount = Math.floor(
      deltaDate / this.state.tempTime + this.state.triesCount,
    );
    if (checkCount < 10) {
      await this.setValue('triesCount', checkCount);
      await this.setValue('lastTime', String(Date.now()));
      await this.setState({
        triesCount: Number(await this.getValue('triesCount')),
      });
    }
    if (checkCount > 10) {
      await this.setValue('triesCount', '10');
      await this.setValue('lastTime', String(Date.now()));
      await this.setState({
        triesCount: Number(await this.getValue('triesCount')),
      });
    }
  };

  showQuote = async () => {
    this.setState({
      temp: !this.state.temp,
    });
    if (Number(this.state.triesCount) >= 1) {
      await this.setValue('lastTime', String(Date.now()));
      await this.setState({
        fistClicked: true,
        btnClicked: !this.state.btnClicked,
        triesCount: String(Number(this.state.triesCount) - 1),
      });
      await this.setValue('triesCount', this.state.triesCount);
    }
  };

  render() {
    let quoteBlock =
      this.state.fistClicked == true &&
      (this.state.btnClicked == true || this.state.btnClicked == false) ? (
        <AdviceText showAdvice={this.state.btnClicked} />
      ) : null;

    let modalWindow =
      Number(this.state.triesCount) == 0 &&
      (this.state.btnClicked == true || this.state.btnClicked == false) ? (
        <ModalWindow temp={this.state.temp} />
      ) : null;

    return (
      <View style={MainBlock.container}>
        <ImageBackground
          source={require('./images/background.png')}
          style={MainBlock.container}>
          <View style={TopBlock.container}>
            <Text style={CounterStyle.container}>{this.state.triesCount}</Text>
          </View>
          <View style={MiddleBlcok.container}>
            {quoteBlock}
            {modalWindow}
          </View>
          <View style={BottomBlock.container}>
            <Button
              title="Получить цитату"
              onPress={this.showQuote}
              containerStyle={{width: screenWidth - 100}}
              buttonStyle={{
                height: screenHeight / 10,
                backgroundColor: '#601040',
              }}
              titleStyle={{fontSize: 25}}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const CounterStyle = StyleSheet.create({
  container: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: 'mqfont',
  },
});

const MainBlock = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    // justifyContent: 'space-around',
    // alignItems: 'center',
  },
});

const TopBlock = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexBasis: '20%',
    // borderRadius: 4,
    // borderWidth: 5.5,
    // borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MiddleBlcok = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexBasis: '10%',
    // borderRadius: 4,
    // borderWidth: 5.5,
    // borderColor: 'yellow',
  },
});

const BottomBlock = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexBasis: '20%',
    // borderRadius: 4,
    // borderWidth: 5.5,
    // borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
