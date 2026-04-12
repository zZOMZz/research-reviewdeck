import type {
  ReviewSide,
  ReviewSubmission,
  SubPatch,
} from '../../../shared/src/types'

import type { LocalComment, ParsedDiffFile, ParsedHunk } from '../types/review'

export function getCommentsForLine(
  comments: LocalComment[],
  target?: { file: string; line: number; side: ReviewSide },
) {
  if (!target) {
    return []
  }

  return comments.filter(
    (comment) =>
      comment.file === target.file &&
      comment.line === target.line &&
      comment.side === target.side,
  )
}

export function isSubmissionShape(value: unknown): value is ReviewSubmission {
  if (!value || typeof value !== 'object') {
    return false
  }

  return (
    Array.isArray((value as ReviewSubmission).comments) &&
    Array.isArray((value as ReviewSubmission).draftComments)
  )
}

export function parsePatchDiff(patch: SubPatch): ParsedDiffFile[] {
  const files: ParsedDiffFile[] = []
  const lines = patch.diff.split('\n')

  let currentFile: ParsedDiffFile | null = null
  let currentHunk: ParsedHunk | null = null
  let oldLineNumber = 0
  let newLineNumber = 0
  let lineIndex = 0

  for (const rawLine of lines) {
    if (rawLine.startsWith('diff --git ')) {
      const match = rawLine.match(/^diff --git a\/(.+?) b\/(.+)$/)
      if (!match) {
        continue
      }

      currentFile = {
        key: `${match[1]}-${match[2]}-${files.length}`,
        srcFile: match[1],
        dstFile: match[2],
        hunks: [],
      }
      files.push(currentFile)
      currentHunk = null
      continue
    }

    if (!currentFile) {
      continue
    }

    if (rawLine.startsWith('@@')) {
      const match = rawLine.match(/^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/)
      if (!match) {
        continue
      }

      oldLineNumber = Number(match[1])
      newLineNumber = Number(match[3])
      currentHunk = {
        header: rawLine,
        lines: [],
      }
      currentFile.hunks.push(currentHunk)
      continue
    }

    if (!currentHunk) {
      continue
    }

    const lineKey = `${currentFile.key}-${currentHunk.header}-${lineIndex}`
    lineIndex += 1

    if (rawLine.startsWith('\\')) {
      currentHunk.lines.push({
        key: lineKey,
        kind: 'meta',
        content: rawLine.slice(1).trimStart(),
      })
      continue
    }

    const marker = rawLine[0]
    const content = rawLine.slice(1)

    if (marker === ' ') {
      currentHunk.lines.push({
        key: lineKey,
        kind: 'context',
        content,
        oldLineNumber,
        newLineNumber,
      })
      oldLineNumber += 1
      newLineNumber += 1
      continue
    }

    if (marker === '-') {
      currentHunk.lines.push({
        key: lineKey,
        kind: 'delete',
        content,
        oldLineNumber,
        commentTarget: {
          file: currentFile.srcFile,
          line: oldLineNumber,
          side: 'deletions',
        },
      })
      oldLineNumber += 1
      continue
    }

    if (marker === '+') {
      currentHunk.lines.push({
        key: lineKey,
        kind: 'add',
        content,
        newLineNumber,
        commentTarget: {
          file: currentFile.dstFile,
          line: newLineNumber,
          side: 'additions',
        },
      })
      newLineNumber += 1
      continue
    }

    currentHunk.lines.push({
      key: lineKey,
      kind: 'meta',
      content: rawLine,
    })
  }

  return files
}
