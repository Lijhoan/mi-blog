import { certificationGroups } from './certifications/certifications.data'
import { experienceTimeline } from './experience/experience.data'
import { featuredProjects } from './projects/projects.data'
import { profileContent } from './profile/profile.data'
import { aiSkills, dataBiSkills, devSkills, infraSkills, mlSkills } from './skills/skills.data'

export const professionalContent = {
  profile: profileContent.identity,
  hero: {
    headline: profileContent.positioning.headline,
    summary: profileContent.positioning.summary,
    metrics: profileContent.metrics.slice(0, 2),
  },
  positioning: profileContent.positioning,
  overview: profileContent.positioning.summary,
  links: profileContent.links,
  stack: profileContent.stack,
  metrics: profileContent.metrics,
  skills: {
    dataBi: dataBiSkills,
    ml: mlSkills,
    dev: devSkills,
    infra: infraSkills,
    ai: aiSkills,
  },
  experience: experienceTimeline,
  projects: featuredProjects,
  certifications: certificationGroups,
  verification: profileContent.verification,
} as const
