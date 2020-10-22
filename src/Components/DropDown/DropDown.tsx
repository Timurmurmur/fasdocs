import React from 'react';
import { View, Animated, Easing, TouchableHighlight, Text } from "react-native";
import { COLOR } from '../../common/color';
import { AngleRight } from '../Icons/Icons';

export interface IDropDownProps {
    title: any;
}
  
interface IDropDownState {
    show: boolean;
}

export class DropDown extends React.Component<IDropDownProps, IDropDownState> {
    animatedValue: any;  
    constructor(props: IDropDownProps){
      super(props);
  
      this.state = {
        show: false
      }
    }
  
    UNSAFE_componentWillMount(){
      this.animatedValue = new Animated.Value(0);
    }
  
    componentDidMount(){
      
    }
  
    pressHandler = (e:any) => {
      const { show } = this.state;
      if(show) {
        this.hideContent();
        this.setState({
          show: false
        })
      } else {
        this.showContent();
        this.setState({
          show: true
        })
      }
    } 
    
    showContent = () => {
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false
      }).start()
    }
  
    hideContent = () => {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false
      }).start()
    }
    
    render() {
      const {  children} = this.props;
  
      const animatedStyle = { maxHeight: this.animatedValue.interpolate({
        inputRange: [0,1],
        outputRange: [0, 1000]
      }), overflow: 'hidden'}
  
      return(
        <View style={{ paddingLeft: 16 }}>
            <View style={{}}>
                <TouchableHighlight underlayColor={'transparent'} onPress={this.pressHandler}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical:  10, }}>
                        <View style={{width: 22, height: 22, justifyContent: 'center', alignItems: 'center', marginRight: 20, transform: [{rotate: this.state.show ? '90deg' : "0deg"}]}}>
                            <AngleRight width={10} height={20} color={COLOR.BLACK} />
                        </View>
                        <View>
                            {
                                this.props.title
                            }
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
            <Animated.View style={animatedStyle}>
                {children}
            </Animated.View>
        </View>
      )
    }
  }