import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export function SEO({
  title,
  description,
  keywords,
  image,
  type = 'website',
  noindex = false,
  structuredData,
}) {
  const location = useLocation();
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://avuruduulela.lk';
  const currentUrl = `${siteUrl}${location.pathname}`;
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const defaultDescription = 'Experience the rich traditions of Sinhala and Tamil New Year with Avurudu Ulela - Digital Village. Shop traditional items, play traditional games, explore recipes, and celebrate the festival online.';
  const defaultKeywords = 'Sinhala New Year, Tamil New Year, Avurudu, Sri Lanka, Traditional Games, Traditional Food, Bazaar, Culture, Recipes, Nakath Times';

  const metaTitle = title ? `${title} | Avurudu Ulela` : 'Avurudu Ulela - Digital Village | Sinhala & Tamil New Year Celebration';
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const metaKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Avurudu Ulela" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="Avurudu Ulela" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="si_LK" />
      <meta property="og:locale:alternate" content="ta_LK" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content="@avuruduulela" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Alternate Language Versions */}
      <link rel="alternate" hreflang="en" href={currentUrl} />
      <link rel="alternate" hreflang="si" href={currentUrl} />
      <link rel="alternate" hreflang="ta" href={currentUrl} />
      <link rel="alternate" hreflang="x-default" href={currentUrl} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

