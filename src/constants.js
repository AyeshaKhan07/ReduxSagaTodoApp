export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const TODO_APP_URLS =
{
    ADD_TASK: `${API_BASE_URL}/posts`,
    REMOVE_TASK: (id) =>
    `${API_BASE_URL}/posts/${encodeURIComponent(id)}`
}