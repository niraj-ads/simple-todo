
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const httpRequest = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    data?: any
): Promise<any> => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    const config: RequestInit = {
        method,
        headers,
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    const response = await fetch(baseUrl + endpoint, config);

    if (!response.ok) {
        // Server responded with a status other than 200-299
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
    }

    // Parse the response body (may throw if response is not valid JSON)
    return response.json();
};

export default httpRequest;
