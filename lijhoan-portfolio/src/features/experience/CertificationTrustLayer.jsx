import { useEffect, useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  archiveCertificationCredentials,
  certificationTrustSummary,
  featuredCertificationCredentials,
  supportingCertificationCredentials,
} from '@/content/certifications/certificationTrust.data.ts'
import { Calendar, Eye, ShieldCheck, X } from 'lucide-react'

function CertificationImage({ credential, className }) {
  const [src, setSrc] = useState(credential.asset.thumbSrc)

  useEffect(() => {
    setSrc(credential.asset.thumbSrc)
  }, [credential.asset.thumbSrc])

  return (
    <img
      src={src}
      alt={credential.asset.alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setSrc(credential.asset.fullSrc)}
      sizes="(max-width: 768px) 100vw, 40vw"
    />
  )
}

function CredentialCard({ credential, compact = false, onOpen }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/12 bg-white/[0.045] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/35 hover:bg-white/[0.08]">
      <div className="relative">
        <CertificationImage
          credential={credential}
          className={compact ? 'h-44 w-full object-cover' : 'h-56 w-full object-cover'}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-md">
          <Calendar size={12} />
          {credential.issuedAt}
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/70">{credential.issuer}</p>
          <h3 className={compact ? 'text-base font-semibold leading-snug text-white' : 'text-xl font-semibold leading-snug text-white'}>
            {credential.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {credential.proofTags.slice(0, compact ? 2 : 3).map((tag) => (
            <Badge key={tag} variant="outline" className="border-cyan-200/25 bg-cyan-500/10 text-cyan-100">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          onClick={() => onOpen(credential)}
          variant="secondary"
          className="w-full justify-center bg-cyan-500/18 text-cyan-100 hover:bg-cyan-500/30"
        >
          Ver prueba
          <Eye size={14} className="ml-2" />
        </Button>
      </div>
    </article>
  )
}

export default function CertificationTrustLayer() {
  const [selectedCredential, setSelectedCredential] = useState(null)
  const [archiveOpen, setArchiveOpen] = useState(false)

  const archiveCountLabel = useMemo(
    () => `${certificationTrustSummary.archiveCount} credenciales historicas`,
    [],
  )

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedCredential(null)
        setArchiveOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <div className="grid gap-6">
        <article className="rounded-2xl border border-cyan-300/25 bg-gradient-to-r from-cyan-500/12 via-blue-500/8 to-transparent p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/75">Trust Layer</p>
              <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Credenciales verificables para reforzar evidencia profesional</h3>
              <p className="mt-2 max-w-3xl text-sm text-slate-200/85 sm:text-base">
                Priorizacion editorial: featured para posicionamiento actual, supporting para amplitud tecnica y archive para trazabilidad completa.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-cyan-500/22 text-cyan-100">Featured {certificationTrustSummary.featuredCount}</Badge>
              <Badge className="bg-blue-500/22 text-blue-100">Supporting {certificationTrustSummary.supportingCount}</Badge>
              <Badge variant="secondary" className="bg-white/10 text-slate-100">Total {certificationTrustSummary.total}</Badge>
            </div>
          </div>
        </article>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-lg font-semibold tracking-tight text-white sm:text-xl">Featured Credentials</h4>
            <span className="text-xs uppercase tracking-[0.22em] text-cyan-200/70">Alta relevancia de posicionamiento</span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredCertificationCredentials.map((credential) => (
              <CredentialCard key={credential.id} credential={credential} onOpen={setSelectedCredential} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-lg font-semibold tracking-tight text-white sm:text-xl">Supporting Credentials</h4>
            <span className="text-xs uppercase tracking-[0.22em] text-cyan-200/70">Contexto y cobertura complementaria</span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {supportingCertificationCredentials.map((credential) => (
              <CredentialCard key={credential.id} credential={credential} compact onOpen={setSelectedCredential} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-base font-semibold text-white sm:text-lg">Archive</h4>
              <p className="text-sm text-gray-300">{archiveCountLabel}. Se muestran bajo demanda para no sobrecargar la lectura inicial.</p>
            </div>
            <Button onClick={() => setArchiveOpen(true)} variant="outline" className="border-cyan-300/40 text-cyan-100 hover:bg-cyan-500/12">
              Abrir archivo
              <ShieldCheck size={14} className="ml-2" />
            </Button>
          </div>
        </section>
      </div>

      {archiveOpen && (
        <div className="fixed inset-0 z-[90] bg-slate-950/86 backdrop-blur-sm">
          <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
            <Button onClick={() => setArchiveOpen(false)} variant="ghost" className="text-white hover:bg-white/10">
              Cerrar
              <X size={16} className="ml-2" />
            </Button>
          </div>
          <div className="mx-auto h-full w-full max-w-6xl overflow-y-auto px-4 pb-16 pt-20 sm:px-6">
            <h4 className="mb-1 text-2xl font-semibold text-white">Certification Archive</h4>
            <p className="mb-6 text-sm text-slate-300">Historial completo de credenciales con acceso a prueba visual.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {archiveCertificationCredentials.map((credential) => (
                <CredentialCard key={credential.id} credential={credential} compact onOpen={setSelectedCredential} />
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedCredential && (
        <div className="fixed inset-0 z-[100] bg-black/88 backdrop-blur-sm" onClick={() => setSelectedCredential(null)}>
          <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
            <Button onClick={() => setSelectedCredential(null)} variant="ghost" className="text-white hover:bg-white/10">
              Cerrar
              <X size={16} className="ml-2" />
            </Button>
          </div>

          <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center px-4 py-14 sm:px-8" onClick={(event) => event.stopPropagation()}>
            <div className="w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900/85 shadow-2xl shadow-black/35">
              <div className="border-b border-white/10 px-4 py-3 sm:px-5">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/75">{selectedCredential.issuer}</p>
                <h4 className="mt-1 text-lg font-semibold text-white sm:text-xl">{selectedCredential.title}</h4>
              </div>
              <div className="max-h-[80vh] overflow-auto bg-slate-950 p-3 sm:p-5">
                <img
                  src={selectedCredential.asset.fullSrc}
                  alt={selectedCredential.asset.alt}
                  className="w-full rounded-xl border border-white/10 object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
