const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (response.status === 204) return undefined as T;

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = undefined;
  }

  if (!response.ok) {
    const message =
      (body as { message?: string | string[] })?.message ??
      `API request failed: ${response.status}`;
    throw new Error(
      Array.isArray(message) ? message.join(", ") : String(message),
    );
  }
  return body as T;
}

export interface LiveSupplier {
  id: number;
  name: string;
  siteName: string;
  county: string;
  town: string | null;
  createdAt?: string;
  updatedAt?: string;
  batches?: LiveBatchRef[];
}

export interface LiveBatchRef {
  id: number;
  batchCode: string;
  quantity: number;
  quantityUnit: string;
  collectionDate: string;
}

export interface LiveFeedstock {
  id: number;
  name: string;
  category: string;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
  batches?: LiveBatchRef[];
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
  createdAt?: string;
  supplier?: Pick<LiveSupplier, "id" | "name" | "siteName" | "county">;
  feedstock?: Pick<LiveFeedstock, "id" | "name" | "category">;
}

export interface CreateSupplierPayload {
  name: string;
  siteName: string;
  county: string;
  town?: string;
}

export interface CreateFeedstockPayload {
  name: string;
  category: string;
  description?: string;
}

export interface CreateBatchPayload {
  batchCode: string;
  supplierId: number;
  feedstockId: number;
  quantity: number;
  quantityUnit: string;
  collectionDate: string;
  notes?: string;
}

export interface LiveStats {
  supplierCount: number;
  feedstockCount: number;
  batchCount: number;
  recentBatches: LiveBatch[];
}

export interface LiveReport {
  id: number;
  title: string;
  type: string;
  status: string;
  summary: string;
  feedstockId: number | null;
  sections: string; // pipe-delimited
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  feedstock?: Pick<LiveFeedstock, "id" | "name" | "category"> | null;
}

export interface CreateReportPayload {
  title: string;
  type: string;
  summary?: string;
  feedstockId?: number;
  sections?: string[];
  content?: string;
  author?: string;
}

export const backendApi = {
  suppliers: {
    list: () => request<LiveSupplier[]>("/suppliers"),
    get: (id: number) => request<LiveSupplier>(`/suppliers/${id}`),
    create: (data: CreateSupplierPayload) =>
      request<LiveSupplier>("/suppliers", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: Partial<CreateSupplierPayload>) =>
      request<LiveSupplier>(`/suppliers/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    remove: (id: number) =>
      request<void>(`/suppliers/${id}`, { method: "DELETE" }),
  },

  feedstocks: {
    list: (category?: string) =>
      request<LiveFeedstock[]>(
        category
          ? `/feedstocks?category=${encodeURIComponent(category)}`
          : "/feedstocks",
      ),
    get: (id: number) => request<LiveFeedstock>(`/feedstocks/${id}`),
    create: (data: CreateFeedstockPayload) =>
      request<LiveFeedstock>("/feedstocks", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: Partial<CreateFeedstockPayload>) =>
      request<LiveFeedstock>(`/feedstocks/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    remove: (id: number) =>
      request<void>(`/feedstocks/${id}`, { method: "DELETE" }),
  },

  batches: {
    list: (filter?: { supplierId?: number; feedstockId?: number }) => {
      const params = new URLSearchParams();
      if (filter?.supplierId)
        params.set("supplierId", String(filter.supplierId));
      if (filter?.feedstockId)
        params.set("feedstockId", String(filter.feedstockId));
      const qs = params.toString();
      return request<LiveBatch[]>(`/batches${qs ? `?${qs}` : ""}`);
    },
    get: (id: number) => request<LiveBatch>(`/batches/${id}`),
    create: (data: CreateBatchPayload) =>
      request<LiveBatch>("/batches", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: Partial<CreateBatchPayload>) =>
      request<LiveBatch>(`/batches/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    remove: (id: number) =>
      request<void>(`/batches/${id}`, { method: "DELETE" }),
  },

  stats: {
    get: () => request<LiveStats>("/stats"),
  },

  reports: {
    list: () => request<LiveReport[]>("/reports"),
    get: (id: number) => request<LiveReport>(`/reports/${id}`),
    create: (data: CreateReportPayload) =>
      request<LiveReport>("/reports", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (
      id: number,
      data: Partial<CreateReportPayload> & { status?: string },
    ) =>
      request<LiveReport>(`/reports/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    remove: (id: number) =>
      request<void>(`/reports/${id}`, { method: "DELETE" }),
  },
};
