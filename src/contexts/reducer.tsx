import {setState} from '../contexts/alias'

const reducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case setState:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default reducer