import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/meta?page=home`, {
      cache: "no-store",
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      throw new Error('Failed to fetch metadata')
    }

    const data = await res.json();

    return {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      authors: [{ name: data.author }],
      robots: data.robots,
      icons: {
        icon: data.favicon,
      },
      openGraph: {
        title: data.title,
        description: data.description,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: data.title,
        description: data.description,
      },
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    // Fallback metadata
    return {
      title: 'ChatBox - AI Assistant',
      description: 'Your intelligent AI conversation partner',
    };
  }
}

export default function AboutUs() {
  return <div>About Us</div>
}