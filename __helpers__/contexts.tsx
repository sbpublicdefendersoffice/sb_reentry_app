import { ReactElement } from 'react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { render, RenderResult } from '@testing-library/react'

import { Language, SantaBarbaraCountyCoords } from '../types'
import {
  LangProvider,
  LocationProvider,
  ToastProvider,
  GlobalSearchProvider,
  LoginStatusProvider,
} from '../hooks'
import { ENGLISH } from '../constants/language'

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

export const blankGeoCoords: GeolocationCoordinates = {
  accuracy: 0,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: 0,
  longitude: 0,
  speed: null,
}

export const blankSBCoords: SantaBarbaraCountyCoords = {
  ...blankGeoCoords,
  isInSBCounty: false,
}

// eslint-disable-next-line no-unused-vars
const blankFn = (arg?: any): void => {}

export const renderWithRouter = (
  component: ReactElement,
  routerOptions?: any,
): RenderResult =>
  render(
    <RouterContext.Provider
      value={routerOptions ? { ...blankRouter, ...routerOptions } : blankRouter}
    >
      {component}
    </RouterContext.Provider>,
  )

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

export const renderWithLocation = (
  component: ReactElement,
  sbCoords?: Partial<SantaBarbaraCountyCoords>,
): RenderResult =>
  render(
    <LocationProvider
      value={{
        coords: sbCoords ? { ...blankSBCoords, ...sbCoords } : blankSBCoords,
        setCoords: blankFn,
      }}
    >
      {component}
    </LocationProvider>,
  )

export const renderWithToast = (
  component: ReactElement,
  toastText?: string,
): RenderResult =>
  render(
    <ToastProvider value={{ toast: toastText || null, setToast: blankFn }}>
      {component}
    </ToastProvider>,
  )

export const renderWithGlobalSearch = (component: ReactElement): RenderResult =>
  render(<GlobalSearchProvider>{component}</GlobalSearchProvider>)

export const renderWithAllContext = (
  component: ReactElement,
  contextOptions?: {
    routerOptions?: any
    language?: Language
    sbCoords?: Partial<SantaBarbaraCountyCoords>
    toastText?: string
  },
): RenderResult =>
  render(
    <RouterContext.Provider
      value={
        contextOptions?.routerOptions
          ? { ...blankRouter, ...contextOptions?.routerOptions }
          : blankRouter
      }
    >
      <LangProvider
        value={{
          language: contextOptions?.language || ENGLISH,
          setLanguage: blankFn,
        }}
      >
        <LocationProvider
          value={{
            coords: contextOptions?.sbCoords
              ? { ...blankSBCoords, ...contextOptions?.sbCoords }
              : blankSBCoords,
            setCoords: blankFn,
          }}
        >
          <ToastProvider
            value={{
              toast: contextOptions?.toastText || null,
              setToast: blankFn,
            }}
          >
            <GlobalSearchProvider>
              <LoginStatusProvider>{component}</LoginStatusProvider>
            </GlobalSearchProvider>
          </ToastProvider>
        </LocationProvider>
      </LangProvider>
    </RouterContext.Provider>,
  )
