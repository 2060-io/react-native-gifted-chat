import 'react-native'
import React, { createRef, useRef } from 'react'
import renderer from 'react-test-renderer'

import { IMessage, MessageContainer } from '../GiftedChat'
import { FlashList } from '@shopify/flash-list'

it('should render <MessageContainer /> and compare with snapshot', () => {
  const ref = createRef<FlashList<IMessage>>()
  const tree = renderer
    .create(
      <MessageContainer keyboardShouldPersistTaps={true} forwardRef={ref} />,
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
