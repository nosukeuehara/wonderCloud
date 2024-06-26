"use client";

import ArticleCard from "@/app/components/ArticleCard";
import SearchBar from "@/app/components/SearchBar";
import { Blog } from "@/libs/microcms";
import { parseContent } from "@/util/parseString";
import { usePathname, useRouter } from "next/navigation";
import React, { Suspense, cache, useCallback, useEffect, useState } from "react";

const Page = ({ searchParams }: { searchParams: { query: string } }) => {
  const path = usePathname();
  const [articles, setArticles] = useState<Blog[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchParams.query }),
      });
      if (res.status === 204) {
        setArticles(null)
      } else {
        const data = await res.json();
        setArticles(data);
      }
    };
    fetchData();
  }, [searchParams.query]);

  if (articles === null) {
    return (
      <div>
        <div>
          <SearchBar query={searchParams.query} path={path} />
        </div>
        <div className=" flex justify-center items-center mt-16">no articles</div>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <SearchBar query={searchParams.query} path={path} />
        </div>
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col items-center">
            <Suspense>
              <ArticleCard post={article} />
            </Suspense>
          </div>
        ))}
      </div>
    );
  }
};

export default Page;
