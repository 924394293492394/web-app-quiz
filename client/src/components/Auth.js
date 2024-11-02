export function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

export async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        logout();
    }

    return response;
}
