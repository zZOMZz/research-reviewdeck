export const supportedLocales = ['en', 'zh-CN'] as const

export type Locale = (typeof supportedLocales)[number]

export type I18nMessages = {
  meta: {
    htmlLang: string
    title: string
  }
  common: {
    localeLabel: string
    localeOptions: Record<Locale, string>
  }
  enums: {
    reviewSide: {
      additions: string
      deletions: string
    }
    draftStatus: {
      accepted: string
      rejected: string
      pending: string
    }
  }
  review: {
    loading: string
    loadErrorTitle: string
    reload: string
    emptyStateTitle: string
    emptyStateDescription: string
    deckEyebrow: string
    pageTitle: string
    pageDescription: string
    summary: {
      patches: string
      comments: string
      drafts: string
      resolved: string
    }
    patchQueueTitle: string
    patchGroupLabel: (index: number) => string
    draftHints: (count: number) => string
    commentCount: (count: number) => string
    patchBadge: (index: number) => string
    fileCount: (count: number) => string
    metadataDescription: string
    groupIndex: string
    draftComments: string
    agentDraftCommentsTitle: string
    agentDraftCommentsHint: string
    linePositionLabel: (sideLabel: string, line: number) => string
    decisionActions: {
      accept: string
      reject: string
      pending: string
    }
    diffTitle: string
    diffDescription: string
    diffLineCount: (count: number) => string
    diffParseFallback: string
    fileState: {
      deleted: string
      added: string
    }
    addComment: string
    humanComment: string
    remove: string
    composerTitle: (file: string, line: number, sideLabel: string) => string
    composerPlaceholder: string
    saveComment: string
    cancel: string
    floatingSummaryTitle: string
    floatingSummaryDescription: (commentCount: number, resolvedCount: number) => string
    submittedSuccess: string
    submitting: string
    submitReview: string
    clearStatus: string
  }
}
