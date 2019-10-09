import axios, { AxiosResponse } from 'axios'

import { Record, RecordData } from '../types'
import { API_BASE_URL } from './constants'

export default class Database {
	projectId: string
	baseUrl: string

	constructor(projectId: string) {
		if (!projectId)
			throw new Error('Project ID cannot be empty')
		this.projectId = projectId
		this.baseUrl = `${API_BASE_URL}/${projectId}`
	}

	get = (recordList?: string, recordId?: string): Promise<{ [recordList: string]: Record[] } | Record[] | Record | null> => {
		if (recordList === undefined)
			return dataFromRequest(axios.get(this.baseUrl))
		if (!recordList)
			return Promise.reject('`recordList` cannot be empty')
		if (recordId === undefined)
			return dataFromRequest(axios.get(`${this.baseUrl}/${recordList}`))
		if (!recordId)
			return Promise.reject('`recordId` cannot be empty')
		return dataFromRequest(axios.get(`${this.baseUrl}/${recordList}/${recordId}`)).catch(() => null)
	}

	create = (recordList: string, data: RecordData): Promise<Record> => {
		if (!recordList)
			return Promise.reject('`recordList` cannot be empty')
		if (typeof data !== 'object')
			return Promise.reject('`data` must be an object')
		return dataFromRequest(axios.post(`${this.baseUrl}/${recordList}`, data))
	}

	replace = (recordList: string, recordId: string, data: RecordData): Promise<Record> => {
		if (!recordList)
			return Promise.reject('`recordList` cannot be empty')
		if (!recordId)
			return Promise.reject('`recordId` cannot be empty')
		if (typeof data !== 'object')
			return Promise.reject('`data` must be an object')
		return dataFromRequest(axios.put(`${this.baseUrl}/${recordList}/${recordId}`, data))
	}

	update = (recordList: string, recordId: string, data: RecordData): Promise<Record> => {
		if (!recordList)
			return Promise.reject('`recordList` cannot be empty')
		if (!recordId)
			return Promise.reject('`recordId` cannot be empty')
		if (typeof data !== 'object')
			return Promise.reject('`data` must be an object')
		return dataFromRequest(axios.patch(`${this.baseUrl}/${recordList}/${recordId}`, data))
	}

	delete = (recordList?: string, recordId?: string): Promise<void> => {
		if (recordList === undefined)
			return silenceRequest(axios.delete(this.baseUrl))
		if (!recordList)
			return Promise.reject('`recordList` cannot be empty')
		const didNotSpecifyRecordId = recordId === undefined
		if (!(didNotSpecifyRecordId || recordId))
			return Promise.reject('`recordId` cannot be empty')
		return silenceRequest(axios.delete(`${this.baseUrl}/${recordList}${didNotSpecifyRecordId ? '' : `/${recordId}`}`))
	}

	post = this.create
	put = this.replace
	patch = this.update
}

export { Database, Record, RecordData, API_BASE_URL }

const dataFromRequest = (request: Promise<AxiosResponse>): Promise<any> =>
	request.then(({ status, data }) =>
		status === 500
			? Promise.reject(data)
			: data
	)

const silenceRequest = (request: Promise<AxiosResponse>): Promise<void> =>
	dataFromRequest(request)
		.then(() => undefined)
		.catch(() => Promise.reject('An unknown error occurred'))