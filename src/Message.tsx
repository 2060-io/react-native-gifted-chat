import PropTypes from 'prop-types'
import React from 'react'
import { View, StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native'

import Bubble from './Bubble'
import { SystemMessage, SystemMessageProps } from './SystemMessage'
import { Day, DayProps } from './Day'

import { StylePropType, isSameUser } from './utils'
import { IMessage, User, LeftRightStyle } from './Models'

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
    },
  }),
}

export interface MessageProps<TMessage extends IMessage> {
  key: any
  position: 'left' | 'right'
  currentMessage?: TMessage
  nextMessage?: TMessage
  previousMessage?: TMessage
  user: User
  inverted?: boolean
  containerStyle?: LeftRightStyle<ViewStyle>
  renderMessage?(props: Bubble['props']): React.ReactNode
  renderDay?(props: DayProps<TMessage>): React.ReactNode
  renderSystemMessage?(props: SystemMessageProps<TMessage>): React.ReactNode
  shouldUpdateMessage?(
    props: MessageProps<IMessage>,
    nextProps: MessageProps<IMessage>,
  ): boolean
  onMessageLayout?(event: LayoutChangeEvent): void
}

export default class Message<
  TMessage extends IMessage = IMessage
> extends React.Component<MessageProps<TMessage>> {
  static defaultProps = {
    renderMessage: null,
    renderDay: null,
    renderSystemMessage: null,
    position: 'left',
    currentMessage: {},
    nextMessage: {},
    previousMessage: {},
    user: {},
    containerStyle: {},
    inverted: true,
    shouldUpdateMessage: undefined,
    onMessageLayout: undefined,
  }

  static propTypes = {
    renderMessage: PropTypes.func,
    renderDay: PropTypes.func,
    renderSystemMessage: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right']),
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    user: PropTypes.object,
    inverted: PropTypes.bool,
    containerStyle: PropTypes.shape({
      left: StylePropType,
      right: StylePropType,
    }),
    shouldUpdateMessage: PropTypes.func,
    onMessageLayout: PropTypes.func,
  }

  shouldComponentUpdate(nextProps: MessageProps<TMessage>) {
    const next = nextProps.currentMessage!
    const current = this.props.currentMessage!
    const { previousMessage, nextMessage } = this.props
    const nextPropsMessage = nextProps.nextMessage
    const nextPropsPreviousMessage = nextProps.previousMessage

    const shouldUpdate =
      (this.props.shouldUpdateMessage &&
        this.props.shouldUpdateMessage(this.props, nextProps)) ||
      false

    return (
      next.sent !== current.sent ||
      next.received !== current.received ||
      next.pending !== current.pending ||
      next.createdAt !== current.createdAt ||
      next.text !== current.text ||
      next.image !== current.image ||
      next.video !== current.video ||
      next.audio !== current.audio ||
      previousMessage !== nextPropsPreviousMessage ||
      nextMessage !== nextPropsMessage ||
      shouldUpdate
    )
  }

  renderDay() {
    if (this.props.currentMessage && this.props.currentMessage.createdAt) {
      const { containerStyle, onMessageLayout, ...props } = this.props
      if (this.props.renderDay) {
        return this.props.renderDay(props)
      }
      return <Day {...props} />
    }
    return null
  }

  renderMessage() {
    const { containerStyle, onMessageLayout, ...props } = this.props
    if (this.props.renderMessage) {
      return this.props.renderMessage(props)
    }
    // @ts-ignore
    return <Bubble {...props} />
  }

  renderSystemMessage() {
    const { containerStyle, onMessageLayout, ...props } = this.props

    if (this.props.renderSystemMessage) {
      return this.props.renderSystemMessage(props)
    }
    return <SystemMessage {...props} />
  }

  render() {
    const {
      currentMessage,
      onMessageLayout,
      nextMessage,
      position,
      containerStyle,
    } = this.props
    if (currentMessage) {
      const sameUser = isSameUser(currentMessage, nextMessage!)
      return (
        <View onLayout={onMessageLayout}>
          {this.renderDay()}
          {currentMessage.system ? (
            this.renderSystemMessage()
          ) : (
            <View
              style={[
                styles[position].container,
                { marginBottom: sameUser ? 4.28 : 8.56 },
                !this.props.inverted && { marginBottom: 2 },
                containerStyle && containerStyle[position],
              ]}
            >
              {this.renderMessage()}
            </View>
          )}
        </View>
      )
    }
    return null
  }
}
