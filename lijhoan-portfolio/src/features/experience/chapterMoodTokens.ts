import type { SceneChapterId } from './scene.types'

export type ChapterMoodToken = {
  typographyEmphasis: {
    titleSize: string
    titleWeight: string
    titleTracking: string
    summaryTone: string
  }
  captionStyle: {
    tracking: string
    tone: string
  }
  spacingRhythm: {
    framePadding: string
    stackGap: string
  }
  panelDensity: {
    panelBg: string
    panelBorder: string
    blur: string
  }
  atmosphere: {
    intensityOpacity: number
    gridOpacity: number
    frameLineOpacity: number
  }
  accentDensity: {
    meterOpacity: string
    accentGlow: string
  }
  frameVisibility: {
    desktop: boolean
    mobile: boolean
  }
  contrastBehavior: {
    titleClass: string
    summaryClass: string
    chipClass: string
  }
  motionIntensity: {
    driftMultiplier: number
    pulseMultiplier: number
  }
  calmExpressiveBalance: number
}

export const chapterMoodTokens: Record<SceneChapterId, ChapterMoodToken> = {
  identity: {
    typographyEmphasis: {
      titleSize: 'text-2xl lg:text-4xl',
      titleWeight: 'font-semibold',
      titleTracking: 'tracking-tight',
      summaryTone: 'text-gray-200',
    },
    captionStyle: {
      tracking: 'tracking-[0.28em]',
      tone: 'text-cyan-200/80',
    },
    spacingRhythm: {
      framePadding: 'p-4 lg:p-5',
      stackGap: 'gap-3',
    },
    panelDensity: {
      panelBg: 'bg-slate-950/45',
      panelBorder: 'border-white/10',
      blur: 'backdrop-blur-xl',
    },
    atmosphere: {
      intensityOpacity: 0.54,
      gridOpacity: 0.06,
      frameLineOpacity: 0.08,
    },
    accentDensity: {
      meterOpacity: 'text-cyan-300/90',
      accentGlow: 'shadow-cyan-500/20',
    },
    frameVisibility: {
      desktop: true,
      mobile: false,
    },
    contrastBehavior: {
      titleClass: 'text-white',
      summaryClass: 'text-gray-300',
      chipClass: 'text-gray-200 border-white/10 bg-black/30',
    },
    motionIntensity: {
      driftMultiplier: 0.74,
      pulseMultiplier: 0.86,
    },
    calmExpressiveBalance: 0.44,
  },
  proof: {
    typographyEmphasis: {
      titleSize: 'text-2xl lg:text-4xl',
      titleWeight: 'font-semibold',
      titleTracking: 'tracking-tight',
      summaryTone: 'text-slate-200',
    },
    captionStyle: {
      tracking: 'tracking-[0.3em]',
      tone: 'text-blue-100/80',
    },
    spacingRhythm: {
      framePadding: 'p-4 lg:p-5',
      stackGap: 'gap-3',
    },
    panelDensity: {
      panelBg: 'bg-slate-950/48',
      panelBorder: 'border-slate-200/15',
      blur: 'backdrop-blur-2xl',
    },
    atmosphere: {
      intensityOpacity: 0.64,
      gridOpacity: 0.07,
      frameLineOpacity: 0.1,
    },
    accentDensity: {
      meterOpacity: 'text-blue-200/95',
      accentGlow: 'shadow-blue-500/25',
    },
    frameVisibility: {
      desktop: true,
      mobile: false,
    },
    contrastBehavior: {
      titleClass: 'text-white',
      summaryClass: 'text-slate-200',
      chipClass: 'text-slate-100 border-slate-200/20 bg-slate-900/35',
    },
    motionIntensity: {
      driftMultiplier: 0.9,
      pulseMultiplier: 0.94,
    },
    calmExpressiveBalance: 0.66,
  },
  trust: {
    typographyEmphasis: {
      titleSize: 'text-2xl lg:text-4xl',
      titleWeight: 'font-semibold',
      titleTracking: 'tracking-tight',
      summaryTone: 'text-slate-300',
    },
    captionStyle: {
      tracking: 'tracking-[0.25em]',
      tone: 'text-cyan-100/70',
    },
    spacingRhythm: {
      framePadding: 'p-4 lg:p-5',
      stackGap: 'gap-2',
    },
    panelDensity: {
      panelBg: 'bg-slate-950/50',
      panelBorder: 'border-white/10',
      blur: 'backdrop-blur-xl',
    },
    atmosphere: {
      intensityOpacity: 0.38,
      gridOpacity: 0.04,
      frameLineOpacity: 0.06,
    },
    accentDensity: {
      meterOpacity: 'text-cyan-100/90',
      accentGlow: 'shadow-slate-500/15',
    },
    frameVisibility: {
      desktop: true,
      mobile: false,
    },
    contrastBehavior: {
      titleClass: 'text-white',
      summaryClass: 'text-gray-300',
      chipClass: 'text-gray-200 border-white/10 bg-slate-950/40',
    },
    motionIntensity: {
      driftMultiplier: 0.52,
      pulseMultiplier: 0.78,
    },
    calmExpressiveBalance: 0.24,
  },
  cta: {
    typographyEmphasis: {
      titleSize: 'text-2xl lg:text-4xl',
      titleWeight: 'font-semibold',
      titleTracking: 'tracking-tight',
      summaryTone: 'text-amber-100/90',
    },
    captionStyle: {
      tracking: 'tracking-[0.24em]',
      tone: 'text-amber-100/80',
    },
    spacingRhythm: {
      framePadding: 'p-4 lg:p-5',
      stackGap: 'gap-2',
    },
    panelDensity: {
      panelBg: 'bg-slate-950/52',
      panelBorder: 'border-amber-100/15',
      blur: 'backdrop-blur-xl',
    },
    atmosphere: {
      intensityOpacity: 0.32,
      gridOpacity: 0.03,
      frameLineOpacity: 0.04,
    },
    accentDensity: {
      meterOpacity: 'text-amber-100/90',
      accentGlow: 'shadow-amber-500/20',
    },
    frameVisibility: {
      desktop: true,
      mobile: false,
    },
    contrastBehavior: {
      titleClass: 'text-white',
      summaryClass: 'text-amber-50/90',
      chipClass: 'text-amber-50 border-amber-100/20 bg-slate-900/40',
    },
    motionIntensity: {
      driftMultiplier: 0.46,
      pulseMultiplier: 0.72,
    },
    calmExpressiveBalance: 0.18,
  },
}

export const getChapterMoodToken = (chapterId: SceneChapterId) => {
  return chapterMoodTokens[chapterId]
}

export const chapterPanelClassesById: Record<SceneChapterId, string> = {
  identity: 'border border-white/10 bg-slate-950/40 text-gray-200',
  proof: 'border border-slate-200/20 bg-slate-950/45 text-slate-100',
  trust: 'border border-white/10 bg-slate-950/45 text-gray-200',
  cta: 'border border-amber-100/20 bg-slate-950/45 text-amber-50',
}
