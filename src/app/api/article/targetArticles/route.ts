import { getList } from "@/libs/microcms";
import { Blog } from "@/type/types";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchWord = searchParams.get("searchWord")!;
  const articles = await getList<Blog>("blogs");
  const filteredData = articles.filter((data) =>
    data.content.includes(searchWord)
  );
  return Response.json(filteredData);
}
