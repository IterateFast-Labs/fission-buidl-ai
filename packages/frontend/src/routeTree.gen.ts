/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PromptImport } from './routes/prompt'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const PromptRoute = PromptImport.update({
  id: '/prompt',
  path: '/prompt',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/prompt': {
      id: '/prompt'
      path: '/prompt'
      fullPath: '/prompt'
      preLoaderRoute: typeof PromptImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/prompt': typeof PromptRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/prompt': typeof PromptRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/prompt': typeof PromptRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/prompt'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/prompt'
  id: '__root__' | '/' | '/prompt'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PromptRoute: typeof PromptRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PromptRoute: PromptRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/prompt"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/prompt": {
      "filePath": "prompt.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
