import axios from "axios";

export interface Image {
    id: string;
    urls: {
        small: string;
        regular: string;
    };
    alt_description: string;
    user: {
        name: string;
    };
    likes: number;
    description?: string; 
}

interface FetchArticlesResponse {
    results: Image[]; 
}

export const fetchArticles = async (topic: string, page: number): Promise<Image[]> => {
    try {
        const response = await axios.get<FetchArticlesResponse>("https://api.unsplash.com/search/photos", {
            headers: {
                Authorization: "Client-ID z84fcuITCax-77rSnKJBtHbzYiUapQ_YCHts72m6Xio"
            },
            params: {
                query: topic,
                page,
                per_page: 8,
            },
        });
        return response.data.results; 
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error; 
    }
};

