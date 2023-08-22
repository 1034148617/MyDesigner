import { MongoClient, Db, Collection, MongoClientOptions } from 'mongodb'

/**
 * * Mongodb 工具类
 */
export class MongoDbUtil {
    private client: MongoClient
    private db: Db

    constructor(url: string, db: string, options?: MongoClientOptions) {
        this.client = new MongoClient(url, options)
        this.db = this.client.db(db)
    }

    private async connect(): Promise<void> {
        try {
            await this.client.connect()
            console.log("Mongodb Connected")
        } catch (error) {
            console.log("Failed to connect mongodb: ", error)
        }
    }

    private getCollection<T extends Document>(colName: string): Collection<T> {
        return this.db.collection<T>(colName)
    }

    public async insertOne<T extends Document>(colName: string, document: T): Promise<void> {
        try {
            await this.connect()
            const collection = this.getCollection<T>(colName)
            // @ts-ignore
            await collection.insertOne(document)
        } catch (error) {
            console.log("Failed to insert document: ", error)
            throw error
        } finally {
            this.client.close()
        }
    }

    public async findOne<T extends Document>(colName: string, query: any): Promise<T | null> {
        try {
            await this.connect()
            const collection = this.getCollection<T>(colName)
            // @ts-ignore
            const document = await collection.findOne(query)
            // @ts-ignore
            return document
        } catch (error) {
            console.log("Failed to find document: ", error)
            throw error
        } finally {
            this.client.close()
        }
    }

    public async UpdateOne<T extends Document>(colName: string, query: any, update: any): Promise<void> {
        try {
            await this.connect()
            const collection = this.getCollection<T>(colName)
            await collection.updateOne(query, { $set: update })
        } catch (error) {
            console.log("Failed to update document: ", error)
            throw error
        } finally {
            this.client.close()
        }
    }

    public async Deleteone<T extends Document>(colName: string, query: any): Promise<void> {
        try {
            await this.connect()
            const collection = this.getCollection<T>(colName)
            await collection.deleteOne(query)
        } catch (error) {
            console.log("Failed to delete document: ", error)
            throw error
        } finally {
            this.client.close()
        }
    }

    public async aggregate<T extends Document>(colName: string, pipeline: object[]): Promise<T[]> {
        const collection = this.getCollection<T>(colName)
        const result = await collection.aggregate<T>(pipeline).toArray()
        return result
    }
}

