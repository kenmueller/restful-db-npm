const { Database } = require('../lib')

const TEST_TIMEOUT = 30e3

const db = new Database('206fdabc-607a-47e0-aa06-2e6795b2633')

let userId

it('deletes project', async done => {
	try {
		await db.delete()
		const response = db.get()
		if (Object.keys(response).length)
			done.fail('db.get() response was not {}')
		else
			done()
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('creates a user', async done => {
	try {
		const response = await db.create('users', { name: 'Ken Mueller', age: 13 })
		userId = response.id
		console.log(response)
		if (response.name === 'Ken Mueller' && response.age === 13)
			done()
		else
			done.fail('db.create(recordList, data) returned an invalid response')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('gets all project data', async done => {
	try {
		const response = await db.get()
		console.log(response)
		const user = response.users.find(user => user.id === userId)
		if (user.name === 'Ken Mueller' && user.age === 13)
			done()
		else
			done.fail('db.get() returned an invalid response')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('lists all users', async done => {
	try {
		const response = await db.get('users')
		console.log(response)
		if (response.length === 1 && response[0].name === 'Ken Mueller' && response[0].age === 13)
			done()
		else
			done.fail('db.get(recordList) returned an invalid response')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('gets a user', async done => {
	try {
		const response = await db.get('users', userId)
		console.log(response)
		if (response.name === 'Ken Mueller' && response.age === 13)
			done()
		else
			done.fail('db.get(recordList, recordId) returned an invalid response')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('updates a user', async done => {
	try {
		const response = await db.update('users', userId, { name: 'Scott Mueller' })
		console.log(response)
		if (response.name === 'Scott Mueller' && response.age === 13)
			done()
		else
			done.fail('db.update(recordList, recordId, data) returned an invalid response')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('gets a user', async done => {
	try {
		const response = await db.get('users', userId)
		console.log(response)
		if (response.name === 'Scott Mueller' && response.age === 13)
			done()
		else
			done.fail('db.get(recordList, recordId) returned an invalid response')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('replaces a record', async done => {
	try {
		const response = await db.replace('users', userId, { age: 43 })
		console.log(response)
		if (Object.keys(response).length === 2 && response.id === userId && response.age === 43)
			done()
		else
			done.fail('db.replace(recordList, recordId, data) returned an invalid response')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('gets a user', async done => {
	try {
		const response = await db.get('users', userId)
		console.log(response)
		if (response.age === 43)
			done()
		else
			done.fail('db.get(recordList, recordId) returned an invalid response')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('gets a user', async done => {
	try {
		const response = await db.get('users', userId)
		console.log(response)
		if (response.age === 43)
			done()
		else
			done.fail('db.get(recordList, recordId) returned an invalid response')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('returns null for an undefined user', async done => {
	try {
		const response = await db.get('users', '123')
		console.log(response)
		if (response === null)
			done()
		else
			done.fail('db.get(recordList, recordId) did not return null')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('returns false for a nonexistent user', async done => {
	try {
		const response = await db.exists('users', '123')
		console.log(response)
		if (response)
			done.fail('db.exists(recordList, recordId) did not return false')
		else
			done()
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('returns true for an existing user', async done => {
	try {
		const response = await db.exists('users', userId)
		console.log(response)
		if (response)
			done()
		else
			done.fail('db.exists(recordList, recordId) did not return true')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('deletes a user', async done => {
	try {
		const response = await db.delete('users', userId)
		console.log(response)
		if (response === undefined)
			done()
		else
			done.fail('db.delete(recordList, recordId) did not return undefined')
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)

it('deletes users', async done => {
	try {
		await db.create('users', { name: 'Ken Mueller' })
		await db.create('users', { name: 'Scott Mueller' })
		await db.create('users', { name: 'Margo Mueller' })
		await db.delete('users')
		const response = await db.get('users')
		if (response.length)
			done.fail('db.delete(recordList) did not delete all records')
		else
			done()
	} catch (error) {
		done.fail(error)
	}
}, TEST_TIMEOUT)
