import type { Ref } from "vue";

const API_BASE = "https://api.jikan.moe/v4";

export type Fetcher = typeof useApi;

interface ApiOptions extends RequestInit {
  queryParams?: Record<string, any>;
}

interface ApiResponse<T, B> {
  status: number;
  response: Response;
  data: T;
  body: B;
}

export async function useApi<T, B = any>(
  path: string,
  options: ApiOptions = {},
  loading?: Ref<boolean>
): Promise<ApiResponse<T, B>> {
  const { queryParams, ...fetchOptions } = options;

  const queryString = queryParams ? objectToParamsString(queryParams) : "";

  loading && (loading.value = true);

  const response = (await fetch(
    `${API_BASE}${path}?${queryString}`,
    fetchOptions,
  )
  .catch((err) => console.error(`Ошибка загрузки данных: ${err}`)))!;

  const status = response.status;
  const body =
    response.headers.get("content-type") == "application/json"
      ? await response.json()
      : {};
    
  loading && (loading.value = false);

  return { status, response, body, data: body.data };
}

function objectToParamsString(object: Record<string, any>): string {
  return Object.entries(object)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}