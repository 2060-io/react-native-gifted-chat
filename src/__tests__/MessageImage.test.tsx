import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { MessageImage } from '../GiftedChat'
import { DEFAULT_TEST_MESSAGE } from './data'

// FIXME: Failing due to issue in Lightbox typing
describe('MessageImage', () => {
  it.skip('should not render <MessageImage /> and compare with snapshot', () => {
    const tree = renderer.create(<MessageImage />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it.skip('should  render <MessageImage /> and compare with snapshot', () => {
    const tree = renderer
      .create(
        <MessageImage
          currentMessage={{
            ...DEFAULT_TEST_MESSAGE,
            image: 'url://to/image.png',
          }}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
