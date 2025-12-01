export const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
};

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const headers = new Headers(options.headers || {});
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const res = await fetch(`${getBaseUrl()}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const text = await res.text();
        try {
            const json = JSON.parse(text);
            throw new Error(json.message || `HTTP ${res.status}`);
        } catch {
            throw new Error(text || `HTTP ${res.status}`);
        }
    }

    const contentType = res.headers.get("Content-Type");
    if (contentType?.includes("application/json")) {
        return res.json() as Promise<T>;
    }

    return res as unknown as T;
}