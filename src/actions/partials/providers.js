// @flow
export const LOAD_PROVIDER_DESC = 'LOAD_PROVIDER_DESC'
export const UNLOAD_PROVIDER_DESC = 'UNLOAD_PROVIDER_DESC'

export function loadProviderDesc(payload) {
  return {
    type: LOAD_PROVIDER_DESC,
    payload
  }
}

export function unloadProviderDesc(payload) {
  return {
    type: UNLOAD_PROVIDER_DESC,
    payload
  }
}