export const login = (user, token) => {
    localStorage.setItem('user_info', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))
}

export const logout = () => {
    localStorage.removeItem('user_info')
    localStorage.removeItem('token')
}

export const isAuthenticated = () => {
    let token = localStorage.getItem('token')
    let user = localStorage.getItem('user_info')
    if (token)
        return JSON.parse(user)
    return false
}

export const isManager = () => {
    let user = isAuthenticated()
    if(user)
        if(user.role === "manager")
            return true
    return false
}

export const isClient = () => {
    let user = isAuthenticated()
    if(user)
        if(user.role === "client")
            return true
    return false
}