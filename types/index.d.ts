/**
 * A Restful Database
 * 
 * [Documentation](https://restful-db.web.app/docs)
 * 
 * You need to specify your Project ID, which you can create [here](https://restful-db.web.app)
 * 
 * https://restful-db.web.app
 */
export default class Database {
	/**
	 * Your Project ID, which you can create [here](https://restful-db.web.app)
	 */
	projectId: string

	/**
	 * The base URL of all requests made to this project's database
	 * 
	 * `https://restful-db.web.app/api/{projectId}`
	 */
	baseUrl: string

	/**
	 * Create a new **Database**
	 * 
	 * @param projectId Your Project ID, which you can create [here](https://restful-db.web.app)
	 */
	constructor(projectId: string)

	/**
	 * @variation 1
	 * 
	 * @returns All the data in your database in the form of an object
	 * 
	 * @example
	 * const allData = await db.get()
	 * 
	 * console.log(allData)
	 * // => {
	 * //     projects: [
	 * //         { id: 'abc123', name: 'Project 1' },
	 * //         { id: 'def456', name: 'Project 2' }
	 * //     ],
	 * //     users: [
	 * //         { id: 'ghi789', name: 'Ken Mueller', age: 13 },
	 * //         { id: 'jkl101', name: 'Scott Mueller', age: 43 }
	 * //     ]
	 * // }
	 */
	get(): Promise<{ [recordList: string]: Record[] }>

	/**
	 * @variation 2
	 * 
	 * @param recordList The record list that you want to retrieve, like `'users'`, or `'rooms'`
	 * 
	 * @returns A list of records in the specified `recordList` in the form of an array
	 * 
	 * @example
	 * const userRecords = await db.get('users')
	 * 
	 * console.log(userRecords)
	 * // => [
	 * //     { id: 'ghi789', name: 'Ken Mueller', age: 13 },
	 * //     { id: 'jkl101', name: 'Scott Mueller', age: 43 }
	 * // ]
	 */
	get(recordList: string): Promise<Record[]>

	/**
	 * @variation 3
	 * 
	 * @param recordList The record list that you want to retrieve the `recordId` from, like `'users'`, or `'rooms'`
	 * @param recordId The ID of the record inside `recordList` that you want to retrieve
	 * 
	 * @returns A **Record** object if the specified record exists, otherwise `null`
	 * 
	 * @example
	 * const userRecord = await db.get('users', 'ghi789')
	 * 
	 * if (userRecord === null)
	 *     console.log('The user with ID `ghi789` does not exist')
	 * 
	 * console.log(userRecord)
	 * // => { id: 'ghi789', name: 'Ken Mueller', age: 13 }
	 */
	get(recordList: string, recordId: string): Promise<Record | null>

	/**
	 * Creates a new record in the specified record list
	 * 
	 * Equivalent to `post`
	 * 
	 * @param recordList Where you want to create the new record
	 * @param data The data you want the new record to have
	 * 
	 * @returns The newly created **Record** object with a random `id`
	 * 
	 * @example
	 * const userRecord = await db.create('users', { name: 'Ken Mueller' })
	 * 
	 * console.log(userRecord)
	 * // => { id: 'abc123', name: 'Ken Mueller' }
	 */
	create(recordList: string, data: RecordData): Promise<Record>

	/**
	 * Replaces the data of the record with ID `recordId`
	 * 
	 * If there is no record with ID `recordId`, this creates a new record with ID `recordID` and the specified data
	 * 
	 * Equivalent to `set` and `put`
	 * 
	 * @param recordList The list in which the record is located
	 * @param recordId The ID of the record
	 * @param data The new data of the record
	 * 
	 * @returns The newly updated record
	 * 
	 * @example
	 * // Old: { id: 'abc123', name: 'Scott Mueller', age: 43 }
	 * 
	 * await db.replace('users', 'abc123', { name: 'Ken Mueller' })
	 * 
	 * // New: { id: 'abc123', name: 'Ken Mueller' }
	 */
	replace(recordList: string, recordId: string, data: RecordData): Promise<Record>

	/**
	 * Updates the record with ID `recordId` by merging the new data and old data
	 * 
	 * If there is no record with ID `recordId`, this creates a new record with ID `recordID` and the specified data
	 * 
	 * Equivalent to `patch`
	 * 
	 * @param recordList The list in which the record is located
	 * @param recordId The ID of the record
	 * @param data The new data that will be merged into the old data of the record
	 * 
	 * @returns The newly updated record
	 * 
	 * @example
	 * // Old: { id: 'abc123', name: 'Scott Mueller', age: 43 }
	 * 
	 * await db.update('users', 'abc123', { name: 'Ken Mueller' })
	 * 
	 * // New: { id: 'abc123', name: 'Ken Mueller', age: 43 }
	 */
	update(recordList: string, recordId: string, data: RecordData): Promise<Record>

	/**
	 * @variation 1
	 * 
	 * **THIS WILL DELETE YOUR ENTIRE DATABASE**
	 * 
	 * Proceed with caution!
	 * 
	 * @example
	 * await db.delete()
	 * 
	 * // All of your records have been deleted
	 */
	delete(): Promise<void>

	/**
	 * @variation 2
	 * 
	 * Deletes all the records in the specified record list
	 * 
	 * @param recordList The record list you want to delete
	 * 
	 * @example
	 * await db.delete('users')
	 * 
	 * // All the users have been deleted
	 */
	delete(recordList: string): Promise<void>

	/**
	 * @variation 3
	 * 
	 * Deletes the specified record in the `recordList` with ID `recordId`
	 * 
	 * @param recordList The list in which the record you want to delete is located
	 * @param recordId The ID of the record you want to delete
	 * 
	 * @example
	 * await db.delete('users', 'abc123')
	 * 
	 * // The user with ID `abc123` has been deleted
	 */
	delete(recordList: string, recordId: string): Promise<void>

	/**
	 * Creates a new record in the specified record list
	 * 
	 * Equivalent to `create`
	 * 
	 * @param recordList Where you want to create the new record
	 * @param data The data you want the new record to have
	 * 
	 * @returns The newly created **Record** object with a random `id`
	 * 
	 * @example
	 * const userRecord = await db.create('users', { name: 'Ken Mueller' })
	 * 
	 * console.log(userRecord)
	 * // => { id: 'abc123', name: 'Ken Mueller' }
	 */
	post(recordList: string, data: RecordData): Promise<Record>

	/**
	 * Replaces the data of the record with ID `recordId`
	 * 
	 * If there is no record with ID `recordId`, this creates a new record with ID `recordID` and the specified data
	 * 
	 * Equivalent to `set` and `replace`
	 * 
	 * @param recordList The list in which the record is located
	 * @param recordId The ID of the record
	 * @param data The new data of the record
	 * 
	 * @returns The newly updated record
	 * 
	 * @example
	 * // Old: { id: 'abc123', name: 'Scott Mueller', age: 43 }
	 * 
	 * await db.replace('users', 'abc123', { name: 'Ken Mueller' })
	 * 
	 * // New: { id: 'abc123', name: 'Ken Mueller' }
	 */
	put(recordList: string, recordId: string, data: RecordData): Promise<Record>

	/**
	 * Replaces the data of the record with ID `recordId`
	 * 
	 * If there is no record with ID `recordId`, this creates a new record with ID `recordID` and the specified data
	 * 
	 * Equivalent to `replace` and `put`
	 * 
	 * @param recordList The list in which the record is located
	 * @param recordId The ID of the record
	 * @param data The new data of the record
	 * 
	 * @returns The newly updated record
	 * 
	 * @example
	 * // Old: { id: 'abc123', name: 'Scott Mueller', age: 43 }
	 * 
	 * await db.replace('users', 'abc123', { name: 'Ken Mueller' })
	 * 
	 * // New: { id: 'abc123', name: 'Ken Mueller' }
	 */
	set(recordList: string, recordId: string, data: RecordData): Promise<Record>

	/**
	 * Updates the record with ID `recordId` by merging the new data and old data
	 * 
	 * If there is no record with ID `recordId`, this creates a new record with ID `recordID` and the specified data
	 * 
	 * Equivalent to `update`
	 * 
	 * @param recordList The list in which the record is located
	 * @param recordId The ID of the record
	 * @param data The new data that will be merged into the old data of the record
	 * 
	 * @returns The newly updated record
	 * 
	 * @example
	 * // Old: { id: 'abc123', name: 'Scott Mueller', age: 43 }
	 * 
	 * await db.update('users', 'abc123', { name: 'Ken Mueller' })
	 * 
	 * // New: { id: 'abc123', name: 'Ken Mueller', age: 43 }
	 */
	patch(recordList: string, recordId: string, data: RecordData): Promise<Record>
}

export { Database }

/**
 * This is returned from `get`, `create`, `update`, and `replace` requests.
 * 
 * Every **Record** has an `id` along with the actual record data.
 * 
 * @example
 * const userRecord = await db.get('users', '1234')
 * 
 * // Every Record has an `id`
 * console.log(userRecord.id)
 * // => '1234'
 * 
 * console.log(userRecord.name)
 * // => 'Ken Mueller'
 */
export type Record = { id: string, [key: string]: any }

/**
 * This is passed in to `create`, `update`, and `replace` requests.
 * 
 * An object with keys of type `string`
 * 
 * @example
 * db.create('users', { name: 'Ken Mueller', age: 13 })
 */
export type RecordData = { [key: string]: any }

/**
 * The base URL of all database requests
 * 
 * `https://restful-db.web.app/api`
 */
export const API_BASE_URL = 'https://restful-db.web.app/api'