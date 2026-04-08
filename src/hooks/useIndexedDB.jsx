import { useEffect, useState, useCallback } from 'react'
import { DB_CONFIG } from '../utils/constants'

/**
 * 操作 IndexedDB 钩子函数
 * 
 * @param {string} dbName 
 * @param {string} storeName 
 * @param {number} version 
 * @returns 
 */
const useIndexedDB = (dbName = DB_CONFIG.NAME, storeName = DB_CONFIG.STORE, version = DB_CONFIG.VERSION) => {
  const [db, setDB] = useState(null)
  const [err, setErr] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const request = indexedDB.open(dbName, version)

    request.onupgradeneeded = (event) => {
      const database = event.target.result
      const oldVersion = event.oldVersion
      
      if (!database.objectStoreNames.contains(storeName)) {
        // Create new store with keyPath id
        const store = database.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
        store.createIndex('timestamp', 'timestamp', { unique: false })
        store.createIndex('isFinish', 'isFinish', { unique: false })
        store.createIndex('dueDate', 'dueDate', { unique: false })
        store.createIndex('priority', 'priority', { unique: false })
      } else if (oldVersion < 2) {
        // Upgrade from version 1: add new indexes
        const store = request.transaction.objectStore(storeName)
        if (!store.indexNames.contains('dueDate')) {
          store.createIndex('dueDate', 'dueDate', { unique: false })
        }
        if (!store.indexNames.contains('priority')) {
          store.createIndex('priority', 'dueDate', { unique: false })
        }
        if (!store.indexNames.contains('isFinish')) {
          store.createIndex('isFinish', 'isFinish', { unique: false })
        }
      }
    }
    
    request.onsuccess = (event) => {
      setDB(event.target.result)
      setIsLoading(false)
    }

    request.onerror = (event) => {
      setErr(`IndexedDB error: ${event.target.errorCode}`)
      setIsLoading(false)
    }
  }, [dbName, storeName, version])

  // 添加数据
  const addItem = useCallback((item) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized')
        return
      }

      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      
      // Ensure all new fields have defaults
      const newItem = {
        ...item,
        timestamp: item.timestamp || Date.now(),
        isFinish: item.isFinish || false,
        priority: item.priority || 'medium',
        tags: item.tags || [],
        createdAt: item.createdAt || Date.now(),
        updatedAt: Date.now(),
      }
      
      const request = store.add(newItem)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }, [db, storeName])

  // 获取所有数据
  const getAllItems = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized')
        return
      }

      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }, [db, storeName])

  // 获取单个数据
  const getItem = useCallback((id) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized')
        return
      }

      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(id)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }, [db, storeName])

  // 更新数据
  const updateItem = useCallback((item) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized')
        return
      }

      if (!item.id) {
        reject('Item must have an id to update')
        return
      }

      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      
      // Update the updatedAt timestamp
      const updatedItem = {
        ...item,
        updatedAt: Date.now(),
      }
      
      const request = store.put(updatedItem)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }, [db, storeName])

  // 删除数据
  const deleteItem = useCallback((id) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized')
        return
      }

      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(id)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }, [db, storeName])

  // 批量删除
  const deleteItems = useCallback((ids) => {
    if (!db) {
      return Promise.reject('Database not initialized')
    }

    return Promise.all(ids.map(id => deleteItem(id)))
  }, [db, deleteItem])

  // 清空所有数据
  const clearAll = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized')
        return
      }

      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }, [db, storeName])

  return { 
    db, 
    err, 
    isLoading,
    addItem, 
    getAllItems, 
    getItem,
    updateItem, 
    deleteItem,
    deleteItems,
    clearAll
  }
}

export default useIndexedDB
