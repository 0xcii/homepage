/* eslint-disable max-len */
/* eslint-disable @next/next/no-page-custom-font */
import * as React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import '../styles/globals.scss'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/dist/shared/lib/router/router'
import ReactGA from 'react-ga'
import { Navigation } from '@ccdao/components'
import { useRouter } from 'next/router'
import { SEO } from '../config'
import ActiveLink from '../components/ActiveLink'
import Logo from '../components/Logo'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 1000
  return library
}

// const menuItems = [
//   <ActiveLink href='/' label='Home' />,
//   <ActiveLink href='/bots' label='Bots' />,
//   <ActiveLink href='/projects' label='Projects' />,
//   <ActiveLink href='/faq' label='FAQ' />,
// ]

const YOUR_TRACKING_ID = 'G-YTZ512CCQL'

const ThemeProvider = dynamic(() => import('../contexts/Theme'), { ssr: false })

const App: React.FC<AppProps> = (props) => {
  const { pageProps, Component } = props
  const { push } = useRouter()

  const menuItems = [
    { label: '首页', onClick: () => push('/') },
    // { label: 'Bots', onClick: () => push('/bots') }, 
    { label: '经典案例', onClick: () => push('/projects') },
    { label: '服务咨询', onClick: () => push('https://t.me/madaodev') },
    { label: '关于我们', onClick: () => push('/CCDAO.pdf') },
    { label: 'ICEFROG冰蛙', onClick: () => push('https://twitter.com/Ice_Frog666666') },
  ]
  const mobileMenuItems = [
    { label: '首页', onClick: () => push('/') },
    // { label: 'Profile', onClick: () => push('/profile') },
    // { label: 'Bots', onClick: () => push('/bots') },
    { label: '经典案例', onClick: () => push('/projects') },
    { label: '服务咨询', onClick: () => push('https://t.me/madaodev') },
    { label: '关于我们', onClick: () => push('/CCDAO.pdf') },
    { label: 'ICEFROG冰蛙', onClick: () => push('https://twitter.com/Ice_Frog666666') },
    // { label: '关于', onClick: () => push('/faq') },
  ]

  React.useEffect(() => {
    ReactGA.initialize(`${YOUR_TRACKING_ID}`)
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <>
      <Head>
        <title>{SEO.title}</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='apple-touch-icon' sizes='180x180' href='favicon.ico' />
        <link rel='icon' type='image/png' sizes='32x32' href='favicon.ico' />
        <link rel='icon' type='image/png' sizes='16x16' href='favicon.ico' />
        <link rel='manifest' href='favicon/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#20c593' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Sarpanch:wght@800&display=swap'
          rel='stylesheet'
        />
        <script src='https://cdn.jsdelivr.net/npm/soonaverse@0.1.10/dist/soon.js' />

        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
        <meta key='description' name='description' content={SEO.description} />
        <meta key='og:type' name='og:type' content={SEO.openGraph.type} />
        <meta key='og:title' name='og:title' content={SEO.openGraph.title} />
        <meta
          key='og:description'
          name='og:description'
          content={SEO.openGraph.description}
        />
        <meta key='og:url' name='og:url' content={SEO.openGraph.url} />
        <meta key='og:image' name='og:image' content={SEO.openGraph.image} />
        <meta name='keywords' content='Web3, NFT, Metaverse, DeFi, EVM' />
        <script
          async
          // eslint-disable-next-line max-len
          src={`https://www.googletagmanager.com/gtag/js?id=${YOUR_TRACKING_ID}`}
        />
        <script
          async
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${YOUR_TRACKING_ID}');`,
          }}
        />
      </Head>
      <ThemeProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Navigation
            menu={menuItems}
            mobileMenu={mobileMenuItems}
            identity
            logo={<Logo />}
            onClickProfile={() => push('/profile')}
          />
          <Component {...pageProps} />
        </Web3ReactProvider>
      </ThemeProvider>
    </>
  )
}

export default App
