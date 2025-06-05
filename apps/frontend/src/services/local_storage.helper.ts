enum LocalStorageUserPreferencesKey {
  Locale = 'UserPref_Locale',
}

const set = (key: LocalStorageUserPreferencesKey, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const get = (key: LocalStorageUserPreferencesKey) => {
  const item = localStorage.getItem(key)
  return item && JSON.parse(item)
}

export default {
  set,
  get,
  LocalStorageUserPreferencesKey,
}
