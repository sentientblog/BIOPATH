const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export interface LiveSupplier {
  id: number;
  name: string;
  siteName: string;
  county: string;
  town: string | null;
}

export interface LiveFeedstock {
  id: number;
  name: string;
  category: string;
  description: string | null;
}

export interface LiveBatch {
  id: number;
  batchCode: string;
  supplierId: number;
  feedstockId: number;
  quantity: number;
  quantityUnit: string;
  collectionDate: string;
  notes: string | null;
}

export const backendApi = {
  suppliers: {
    list: () => request<LiveSupplier[]>("/suppliers"),
    create: (data: Omit<LiveSupplier, "id">) =>
      request<LiveSupplier>("/suppliers", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  feedstocks: {
    list: () => request<LiveFeedstock[]>("/feedstocks"),
    get: (id: number) => request<LiveFeedstock>(`/feedstocks/${id}`),
    create: (data: Omit<LiveFeedstock, "id">) =>
      request<LiveFeedstock>("/feedstocks", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  batches: {
    list: () => request<LiveBatch[]>("/batches"),
  },
};
