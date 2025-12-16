let csrfReady = false;

async function fetchCsrf() {
    await fetch("/api/v1/csrf-cookie", {
        credentials: "include",
    });
    csrfReady = true;
}

async function ensureCsrf() {
    if (!csrfReady) {
        await fetchCsrf();
    }
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null;
}

function parseValidationErrors(data) {
    if (data.errors) {
        const firstError = Object.values(data.errors)[0];
        return Array.isArray(firstError) ? firstError[0] : firstError;
    }
    return data.message || "Произошла ошибка";
}

async function doFetch(url, options) {
    const headers = {
        "Accept": "application/json",
        ...options.headers,
    };

    const xsrfToken = getCookie("XSRF-TOKEN");
    if (xsrfToken) {
        headers["X-XSRF-TOKEN"] = xsrfToken;
    }

    return fetch(url, {
        ...options,
        credentials: "include",
        headers,
    });
}

export async function api(url, options = {}) {
    if (options.method && options.method !== "GET") {
        await ensureCsrf();
    }

    let response = await doFetch(url, options);

    // Если CSRF токен истёк — обновляем и повторяем запрос
    if (response.status === 419) {
        csrfReady = false;
        await fetchCsrf();
        response = await doFetch(url, options);
    }

    if (!response.ok) {
        const data = await response.json();
        throw new Error(parseValidationErrors(data));
    }

    return response;
}

export async function apiPost(url, data) {
    return api(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}
