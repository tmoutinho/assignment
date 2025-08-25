export async function GET() {
  // Simulate a slow API to mimic real fetch latency
  await new Promise((r) => setTimeout(r, 1500));
  return Response.json({ title: "Fetched Title" });
}