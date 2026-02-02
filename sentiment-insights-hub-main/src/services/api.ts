import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from "axios";

/* ===============================
   Environment
================================ */
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() ||
  "http://localhost:5000/api";

/* ===============================
   Axios Instance
================================ */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   Interceptors
================================ */

// Request
apiClient.interceptors.request.use(
  (config) => {
    // Add token here if needed later
    // const token = localStorage.getItem("token");

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });

    return Promise.reject(error);
  }
);

/* ===============================
   Types
================================ */

export interface Review {
  id: string;
  productId: string;
  productName: string;
  platform: "amazon" | "flipkart";
  reviewerName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  sentiment: "positive" | "negative" | "neutral";
  sentimentScore: number;
  helpful: number;
}

export interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
  averageRating: number;
}

export interface TrendData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface WordFrequency {
  word: string;
  count: number;
}

export interface ProductSearchResult {
  id: string;
  name: string;
  platform: "amazon" | "flipkart";
  image: string;
  price: string;
  rating: number;
  reviewCount: number;
}

/* ===============================
   Helpers
================================ */

const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* ===============================
   API Methods
================================ */

export const api = {
  /* Search Products */
  searchProducts: (
    query: string,
    platform?: string
  ): Promise<ProductSearchResult[]> => {
    return handleRequest(
      apiClient.get("/products/search", {
        params: { query, platform },
      })
    );
  },

  /* Get Reviews */
  getReviews: (
    productId: string,
    filters?: {
      sentiment?: string;
      startDate?: string;
      endDate?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{ reviews: Review[]; total: number }> => {
    return handleRequest(
      apiClient.get(`/reviews/${productId}`, {
        params: filters,
      })
    );
  },

  /* Sentiment Stats */
  getSentimentStats: (
    productId: string
  ): Promise<SentimentStats> => {
    return handleRequest(
      apiClient.get(`/analytics/sentiment/${productId}`)
    );
  },

  /* Trend Data */
  getTrendData: (
    productId: string,
    days = 7
  ): Promise<TrendData[]> => {
    return handleRequest(
      apiClient.get(`/analytics/trends/${productId}`, {
        params: { days },
      })
    );
  },

  /* Word Frequency */
  getWordFrequency: (
    productId: string,
    sentiment?: string
  ): Promise<WordFrequency[]> => {
    return handleRequest(
      apiClient.get(`/analytics/words/${productId}`, {
        params: { sentiment },
      })
    );
  },

  /* Start Scraping */
  scrapeReviews: (
    productUrl: string,
    platform: "amazon" | "flipkart"
  ): Promise<{ jobId: string }> => {
    return handleRequest(
      apiClient.post("/scrape", {
        url: productUrl,
        platform,
      })
    );
  },
};

export default api;
