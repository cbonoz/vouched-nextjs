import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const abbreviate = (s) => (s ? `${s.substr(0, 6)}**` : "")

export const formatDate = (d, onlyDate) => {
  if (!(d instanceof Date)) {
    d = d ? new Date(d) : new Date()
  }

  if (onlyDate) {
    return d.toLocaleDateString()
  }
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

export const isValidEmail = (email) => {
  return email && email.indexOf("@") !== -1
}

export const profileUrl = (profileHandle) =>
  `${window.location.origin}/profile/${profileHandle}`

export const convertCamelToHuman = (str) => {
  // Check if likely datetime timestamp ms
  if (str.length === 13) {
    return new Date(str).toLocaleDateString()
  }

  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (str) {
      return str.toUpperCase()
    })
    .replace(/_/g, " ")
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const createJsonFile = (signload, fileName) => {
  const st = JSON.stringify(signload)
  const blob = new Blob([st], { type: "application/json" })
  const fileData = new File([blob], fileName)
  return fileData
}

export const col = (k, render) => ({
  title: capitalize(k).replaceAll("_", " "),
  dataIndex: k,
  key: k,
  render,
})

export const isEmpty = (r) => {
  return !r || r.length === 0
}

export const humanError = (err) => {
  let message = err.message || JSON.stringify(err)

  if (message.indexOf("404") !== -1) {
    message = "Server not reachable. Please try again later."
  } else if (message.indexOf("Network Error") !== -1) {
    message = "Could not connect to server. Please try again later."
  }
  return message
}

export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes == 0) return "0 Byte"
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i]
}
