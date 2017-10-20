// @flow
export const QUERY_CHART_MODEL = 'QUERY_CHART_MODEL'
export const REQUEST_CHART_MODEL = 'REQUEST_CHART_MODEL'
export const RECEIVE_CHART_MODEL = 'RECEIVE_CHART_MODEL'

export function queryChart(payload) {
  return {
    type: QUERY_CHART_MODEL,
    payload
  }
}

export function chartReq(payload) {
  return {
    type: REQUEST_CHART_MODEL,
    payload
  }
}

export function chartRec(payload) {
  return {
    type: RECEIVE_CHART_MODEL,
    payload
  }
}