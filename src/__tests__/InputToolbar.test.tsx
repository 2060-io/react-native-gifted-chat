import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { InputToolbar } from '../GiftedChat'

it('should render <InputToolbar /> and compare with snapshot', () => {
  const tree = renderer
    .create(<InputToolbar inputToolbarPosition='top' />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
