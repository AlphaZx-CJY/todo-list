import { useEffect } from 'react'
import { useState } from 'react'

/**
 * 操作 IndexedDB 钩子函数
 * 
 * @param {string} dbName 
 * @param {string} storeName 
 * @param {number} version 
 * @returns 
 */
const useIndexedDB = (dbName, storeName, version = 1) => {
  const [db, setDB] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    const request = indexedDB.open(dbName, version)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
      }
    }
    request.onsuccess = (event) => {
      setDB(event.target.result)
    }

    request.onerror = (event) => {
      setErr(`IndexedDB error: ${event.target.errorCode}`)
    }
  }, [dbName, storeName, version])

  // 添加数据
  const addItem = (item) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized')
        return
      }

      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.add(item)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // 获取所有数据
  const getAllItems = () => {
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
  }

  // 更新数据
  const updateItem = (item) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized')
        return
      }

      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put(item)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // 删除数据
  const deleteItem = (id) => {
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
  }

  return { db, err, addItem, getAllItems, updateItem, deleteItem }
}

export default useIndexedDB
