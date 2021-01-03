import useItems from 'hook/useItems'
import { initializeStore } from 'store'

import map from 'lodash/map'

const Edit = ({ items: _items }) => {
  const { items } = useItems()
  return (
    <div>
      {
        map(items, i => {
          return (
            <div key={i.title}>
              { i.title }
            </div>
          )
        })
      }
    </div>
  )
}

Edit.getInitialProps = async ({ store }) => {
  const { dispatch } = store

  console.log('yo: ', { aaaaa: store.getState() })

  // const items = [{
  //   title: '123'
  // }]

  // dispatch({
  //   type: 'INIT',
  //   items
  // })

  return {}
}

export default Edit
