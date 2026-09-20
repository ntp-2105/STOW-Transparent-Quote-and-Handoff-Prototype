import { StowApp } from "@/components/stow-app";

type PageProps = {
  searchParams: Promise<{ submit?: string | string[] }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  return <StowApp simulateSubmitError={params.submit === "error"} />;
}
