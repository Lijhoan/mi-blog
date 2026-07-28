import { useEffect, useState } from 'react'
import {
  archiveCertificationCredentials,
  certificationTrustSummary,
  featuredCertificationCredentials,
  supportingCertificationCredentials,
} from '@/content/certifications/certificationTrust.data.ts'

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

function CredentialCard({ credential, index, prefix, isRecent = false, onOpen }) {
  return (
    <article className="group flex flex-col border border-line bg-card transition-all duration-250 hover:-translate-y-[3px] hover:border-accent/60 motion-reduce:hover:translate-y-0">
      <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2 text-[9px] uppercase tracking-[0.14em] text-faint">
        <span className="font-doto text-[11px] font-bold text-accent">{prefix}.{String(index + 1).padStart(2, '0')}</span>
        {isRecent && <span className="text-accent">● reciente</span>}
        <span className="truncate">{credential.issuer}</span>
        <span>{credential.issuedAt}</span>
      </div>

      <div className="h-40 overflow-hidden border-b border-line">
        <CertificationImage
          credential={credential}
          className="h-full w-full object-cover object-top grayscale transition-all duration-300 group-hover:grayscale-0 motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-[13px] font-bold leading-snug text-ink">{credential.title}</h3>
        <p className="text-[10px] uppercase tracking-[0.08em] text-faint">{credential.proofTags.slice(0, 3).join(' · ')}</p>

        <div className="mt-auto border-t border-line pt-3">
          <button
            type="button"
            onClick={() => onOpen(credential)}
            className="cursor-pointer text-[11px] uppercase tracking-[0.1em] text-ink transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            Ver prueba ↗
          </button>
        </div>
      </div>
    </article>
  )
}

function TierHeader({ title, meta }) {
  return (
    <div className="flex items-baseline gap-4">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">{title}</h3>
      <span aria-hidden="true" className="h-px flex-1 self-center bg-line" />
      <span className="text-[10px] uppercase tracking-[0.12em] text-faint">{meta}</span>
    </div>
  )
}

// Los 2 credenciales destacados más recientes resaltan siempre (por fecha de emisión)
const recentFeaturedIds = [...featuredCertificationCredentials]
  .sort((a, b) => b.issuedAt.localeCompare(a.issuedAt))
  .slice(0, 2)
  .map((credential) => credential.id)

export default function CertificationTrustLayer() {
  const [selectedCredential, setSelectedCredential] = useState(null)
  const [archiveOpen, setArchiveOpen] = useState(false)

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
      <div className="space-y-12">
        <p className="text-[10px] uppercase tracking-[0.14em] text-faint">
          <span aria-hidden="true" className="text-accent">●</span> {certificationTrustSummary.featuredCount} destacadas · {certificationTrustSummary.supportingCount} apoyo · {certificationTrustSummary.archiveCount} archivo · {certificationTrustSummary.total} total
        </p>

        <section className="space-y-5">
          <TierHeader title="Destacadas" meta="posicionamiento actual" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredCertificationCredentials.map((credential, index) => (
              <CredentialCard
                key={credential.id}
                credential={credential}
                index={index}
                prefix="C"
                isRecent={recentFeaturedIds.includes(credential.id)}
                onOpen={setSelectedCredential}
              />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <TierHeader title="Apoyo" meta="amplitud técnica" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {supportingCertificationCredentials.map((credential, index) => (
              <CredentialCard key={credential.id} credential={credential} index={index} prefix="S" onOpen={setSelectedCredential} />
            ))}
          </div>
        </section>

        <section className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-5">
          <p className="text-[12px] text-dim">
            Archivo histórico · {certificationTrustSummary.archiveCount} credenciales bajo demanda.
          </p>
          <button
            type="button"
            onClick={() => setArchiveOpen(true)}
            className="cursor-pointer rounded-full border border-line px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] text-ink transition-all duration-200 hover:-translate-y-px hover:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            Abrir archivo ↗
          </button>
        </section>
      </div>

      {archiveOpen && (
        <div className="fixed inset-0 z-[90] overflow-y-auto bg-bg/95 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-24 sm:px-8">
            <div className="mb-10 flex items-baseline gap-4">
              <span className="font-doto text-[13px] font-bold text-accent">[A]</span>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.22em] text-ink">Archivo de certificaciones</h4>
              <span aria-hidden="true" className="h-px flex-1 self-center bg-line" />
              <button
                type="button"
                onClick={() => setArchiveOpen(false)}
                className="cursor-pointer text-[11px] uppercase tracking-[0.1em] text-dim transition-colors duration-200 hover:text-accent"
              >
                Cerrar ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {archiveCertificationCredentials.map((credential, index) => (
                <CredentialCard key={credential.id} credential={credential} index={index} prefix="A" onOpen={setSelectedCredential} />
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedCredential && (
        <div className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-sm" onClick={() => setSelectedCredential(null)}>
          <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-center px-4 py-14 sm:px-8" onClick={(event) => event.stopPropagation()}>
            <div className="w-full border border-line bg-card">
              <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-faint">{selectedCredential.issuer}</p>
                  <h4 className="mt-1 text-[14px] font-bold text-ink">{selectedCredential.title}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCredential(null)}
                  className="cursor-pointer text-[11px] uppercase tracking-[0.1em] text-dim transition-colors duration-200 hover:text-accent"
                >
                  Cerrar ✕
                </button>
              </div>
              <div className="max-h-[78vh] overflow-auto p-4">
                <img
                  src={selectedCredential.asset.fullSrc}
                  alt={selectedCredential.asset.alt}
                  className="w-full border border-line object-contain"
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
