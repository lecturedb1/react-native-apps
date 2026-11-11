import { list } from "@vercel/blob";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "recipes/" });
    const recipeBlobs = blobs.filter((blob) =>
      blob.pathname.endsWith("/recipe.json"),
    );
    const recipes = await Promise.all(
      recipeBlobs.map(async (blob) => {
        const response = await fetch(blob.url);
        return response.json();
      }),
    );

    return Response.json(recipes);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "공유 레시피를 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
