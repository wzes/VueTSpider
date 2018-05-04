import axios from 'axios'

let base = 'http://localhost:8088'

export const submitTask = (params) => { return axios.post(`${base}/task/build?token=tspider`, params).then(res => res.data) }

export const queryTask = (id) => { return axios.get(`${base}/task/detail/` + id + `?token=tspider`).then(res => res.data) }

export const downloadTask = (id) => { return axios.get(`${base}/task/result/` + id + `?token=tspider`).then(res => res.data) }
