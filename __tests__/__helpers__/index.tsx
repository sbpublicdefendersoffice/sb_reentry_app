import { ReactElement } from 'react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { render, RenderResult } from '@testing-library/react'

import { Language } from '../../types/language'
import { Provider as LangProvider } from '../../hooks/useLanguage'
import { ENGLISH } from '../../constants/language'

const blankRouter = {
  asPath: '/',
  back: () => {},
  basePath: '',
  beforePopState: () => {},
  components: {},
  defaultLocale: undefined,
  events: {
    on: () => null,
    off: () => null,
    emit: () => null,
  },
  isFallback: false,
  isReady: true,
  locale: undefined,
  locales: undefined,
  pathname: '/',
  prefetch: async () => undefined,
  push: async () => true,
  query: {},
  reload: () => {},
  replace: async () => true,
  route: '/',
}

// eslint-disable-next-line no-unused-vars
const blankFn = (arg?: any): void => {}

export const renderWithLanguage = (
  component: ReactElement,
  language?: Language,
): RenderResult =>
  render(
    <LangProvider
      value={{
        language: language || ENGLISH,
        setLanguage: blankFn,
      }}
    >
      {component}
    </LangProvider>,
  )

export const renderWithRouter = (component: ReactElement): RenderResult =>
  render(
    <RouterContext.Provider value={blankRouter}>
      {component}
    </RouterContext.Provider>,
  )

export const renderWithAllContext = (
  component: ReactElement,
  language?: Language,
): RenderResult =>
  render(
    <RouterContext.Provider value={blankRouter}>
      <LangProvider
        value={{
          language: language || ENGLISH,
          setLanguage: blankFn,
        }}
      >
        {component}
      </LangProvider>
    </RouterContext.Provider>,
  )
