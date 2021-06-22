import React from 'react'
import Helmet from 'react-helmet'

// This is the thumbnail that appears when someone shares your website
import Thumbnail from '../logo.svg';

const SEO = ({
  url,
  defaultTitle = "",
  defaultDescription = "",
  title,
  type,
  description,
  cover,
}) => {
  return(
  // Notice I'm using react-helmet to inject these elements within the header tag
  <Helmet>
    {/* The description that appears under the title of your website appears on search engines results */}

    {/* The thumbnail of your website */}
    <meta
      name="image"
      content={cover ? `${url}${cover}` : `${url}${Thumbnail}`}
    />

    {/* Opengraph meta tags for Facebook & LinkedIn */}
    <meta property="og:url" content={`${url}`} />
    <meta
      property="og:type"
      content={type === 'NewsArticle' ? 'NewsArticle' : 'website'}
    />
    <meta
      property="og:title"
      content={title ? `${title}` : defaultDescription}
    />
    <meta
      property="og:description"
      content={description ? `${description}` : defaultDescription}
    />
    <meta
      property="og:image"
      content={cover ? `${url}${cover}` : `${url}${Thumbnail}`}
    />

    {/* The title of your current page */}
    <title>{title ? `${title}` : defaultTitle}</title>

    <meta name="description" content={description ? `${description}` : defaultDescription} />
  
    {/* Default language and direction */}
    <html lang="en" dir="ltr" />
  </Helmet>
  )
}

export default SEO;