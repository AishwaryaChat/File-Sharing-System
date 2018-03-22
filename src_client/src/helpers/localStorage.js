export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state')
    if (null === serializedState) return undefined
    else return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    sessionStorage.setItem('state', serializedState)
  } catch (err) {
    console.log('Save State Error: ' + err)
  }
}
