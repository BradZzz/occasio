// @flow
export const QUERY_S3 = 'QUERY_S3'
export const S3_REQ = 'S3_REQ'
export const S3_REC = 'S3_REC'

export function queryS3(payload) {
  return {
    type: QUERY_S3,
    payload
  }
}

export function s3Req(payload) {
  return {
    type: S3_REQ,
    payload
  }
}

export function s3Rec(payload) {
  return {
    type: S3_REC,
    payload
  }
}