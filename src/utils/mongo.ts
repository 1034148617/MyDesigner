import axios from 'axios'

/**
 * * 数据库和相关集合
 */
export const MONGODB_URL = 'mongodb://192.168.7.53:27017'
export const MONGO_URL = 'http://192.168.7.53:3000'
export const DB = "designer"
export const COL_CANVAS = "canvas"

export const OPERATIONS = {
    "find": `${MONGO_URL}/api/finds`,
    "save": `${MONGO_URL}/api/saves`,
    "update": `${MONGO_URL}/api/updates`,
    "delete": `${MONGO_URL}/api/deletes`,
    "aggregate": `${MONGO_URL}/api/aggregate`
}

/**
 * * 保存文档
 * @param db 数据库
 * @param col 数据表
 * @param documents 文档内容
 * @returns 
 */
export async function SaveDocument(db: string, col: string, documents: any) {
    try {
        let data = {
            "db": db,
            "col": col,
            "document": documents
        }
        const result = await axios.post(OPERATIONS.save, data)
        return result
    } catch (error) {
        console.error('保存文档失败:', error)
    }
}

/**     
 * * 删除文档
 * @param db 数据库
 * @param col 数据表
 * @param condition 条件
 * @returns 
 */
export async function DeleteDocument(db: string, col: string, condition: any) {
    try {
        let data = {
            "db": db,
            "col": col,
            "condition": condition
        }
        const result = await axios.post(OPERATIONS.delete, data)
        return result
    } catch (error) {
        console.error('删除文档失败:', error)
    }
}

/**
 * * 打开文档
 * @param db 数据库
 * @param col 数据表
 * @param condition 条件
 * @param projection 过滤字段
 * @returns 
 */
export async function OpenDocument(db: string, col: string, condition: any, projection: any) {
    try {
        const req_preject = projection || { "_id": 0 }    // 默认不读取id字段

        let data = {
            "db": db,
            "col": col,
            "condition": condition,
            "projection": req_preject
        }
        const result = await axios.post(OPERATIONS.find, data)
        return result
    } catch (error) {
        console.error('读取文档失败:', error)
    }
}

/**
 * * 聚合操作
 * @param db 数据库
 * @param col 数据表
 * @param pipeline 聚合管道
 * @returns 
 */
export async function Aggregate(db: string, col: string, pipeline: any) {
    try {
        let data = {
            "db": db,
            "col": col,
            "aggregate": pipeline,
        }
        const result = await axios.post(OPERATIONS.aggregate, data)
        return result
    } catch (error) {
        console.error('聚合失败:', error)
    }
}