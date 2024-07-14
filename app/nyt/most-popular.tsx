"use client";

import { TypographyH3 } from "@/components/ui/typography";
import axios from "axios";
import { useEffect, useState } from "react";

type Article = {
  url: string;
  title: string;
};

export default function NYTMostPopular() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Function to fetch most viewed articles
    const fetchMostViewedArticles = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.NEXT_PUBLIC_NYT_MOST_POPULAR_KEY}`,
        );
        setArticles(response.data.results);
        console.log("result: ", response.data.results);
      } catch (error) {
        console.error("Error fetching data from NYT API:", error);
        console.log("error");
      }
    };

    // Fetch articles only on initial load
    fetchMostViewedArticles();
  }, []);

  return (
    <>
      <TypographyH3>Most Viewed Articles</TypographyH3>
      <ol>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url}>{article.title}</a>
          </li>
        ))}
      </ol>
    </>
  );
}
