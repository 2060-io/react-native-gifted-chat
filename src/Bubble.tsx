import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'

import { GiftedChatContext } from './GiftedChatContext'
import { MessageTextProps } from './MessageText'
import { MessageImageProps } from './MessageImage'
import { StylePropType } from './utils'

import {
  User,
  IMessage,
  LeftRightStyle,
  Omit,
  MessageVideoProps,
  MessageAudioProps,
} from './Models'

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
  }),
}

export type RenderMessageImageProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageImageProps<TMessage>

export type RenderMessageVideoProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageVideoProps<TMessage>

export type RenderMessageAudioProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageAudioProps<TMessage>

export type RenderMessageTextProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageTextProps<TMessage>

export interface BubbleProps<TMessage extends IMessage> {
  user?: User
  touchableProps?: object
  position: 'left' | 'right'
  currentMessage?: TMessage
  containerStyle?: LeftRightStyle<ViewStyle>
  wrapperRef?: React.LegacyRef<View> | null
  wrapperStyle?: LeftRightStyle<ViewStyle>
  onPress?(context?: any, message?: any): void
  onLongPress?(context?: any, message?: any): void
  renderCustomView?(bubbleProps: BubbleProps<TMessage>): React.ReactNode
}

export default class Bubble<
  TMessage extends IMessage = IMessage
> extends React.Component<BubbleProps<TMessage>> {
  static contextType = GiftedChatContext

  static defaultProps = {
    touchableProps: {},
    onPress: null,
    onLongPress: null,
    renderCustomView: null,
    position: 'left',
    currentMessage: {
      text: null,
      createdAt: null,
      image: null,
    },
    containerStyle: {},
    wrapperRef: null,
    wrapperStyle: {},
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    touchableProps: PropTypes.object,
    onLongPress: PropTypes.func,
    renderCustomView: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right']),
    currentMessage: PropTypes.object,
    containerStyle: PropTypes.shape({
      left: StylePropType,
      right: StylePropType,
    }),
    wrapperRef: PropTypes.object,
    wrapperStyle: PropTypes.shape({
      left: StylePropType,
      right: StylePropType,
    }),
  }
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.context, this.props.currentMessage)
    }
  }

  onLongPress = () => {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context, this.props.currentMessage)
    }
  }

  renderCustomView() {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props)
    }
    return null
  }
  render() {
    const { position, containerStyle, wrapperStyle, wrapperRef } = this.props
    return (
      <View
        style={[
          styles[position].container,
          containerStyle && containerStyle[position],
        ]}
      >
        <View style={[wrapperStyle && wrapperStyle[position]]} ref={wrapperRef}>
          <TouchableWithoutFeedback
            onPress={this.onPress}
            onLongPress={this.onLongPress}
            accessibilityRole='text'
            {...this.props.touchableProps}
          >
            <View>{this.renderCustomView()}</View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}
