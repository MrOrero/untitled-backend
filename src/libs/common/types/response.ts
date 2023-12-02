export interface UpdateResponse {
  id: string;
  status: boolean;
}

export interface CreateResponse {
  id: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    pageSize: number;
    currentPage: number;
  };
}
