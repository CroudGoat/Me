/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import goatIllustration from './assets/images/1790412946906-01a0dced-13bf-7de9-8acb-2582d08cf4c0.webp';

type Section = 'works' | 'about' | 'Machine' | null;

interface WorkItem {
  id: string;
  title: string;
  description: string;
  url: string;
}

const WORKS: WorkItem[] = [
  {
    id: '01',
    title: 'GoatMerge',
    description: 'Streaming task-arithmetic merge engine。省メモリでモデルマージするエンジン。',
    url: 'https://github.com/CroudGoat/GoatMerge',
  },
  {
    id: '02',
    title: 'mergekit-cabs',
    description: 'CABS (ICML 2025) & CABS+ を mergekit で使える拡張。',
    url: 'https://github.com/CroudGoat/mergekit-cabs',
  },
  {
    id: '03',
    title: 'RoMM',
    description: 'ベクトルの幾何学特徴から最適なモデルマージを行う方法',
    url: 'https://github.com/CroudGoat/RoMM',
  },
  {
    id: '04',
    title: 'Baphomet-1.0-4B',
    description: '4Bモデル。',
    url: 'https://huggingface.co/CloudGoat/Baphomet-1.0-4B',
  },
  {
    id: '05',
    title: 'Mephisto-1.0-4B',
    description: '4Bの対話モデル。',
    url: 'https://huggingface.co/CloudGoat/Mephisto-1.0-4B',
  },
  {
    id: '06',
    title: 'Qwen3.5-0.8B-JP-Tuned',
    description: '日本語に特化したqwen3.5-0.8B。',
    url: 'https://huggingface.co/CloudGoat/Qwen3.5-0.8B-JP-Tuned-v2.0',
  },
];

const MACHINE_SPECS = [
  { label: 'GPU', value: 'RTX3060 12GB' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [customGoatSrc, setCustomGoatSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleNavClick = (section: Exclude<Section, null>) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCustomGoatSrc(reader.result);
          setImageError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="min-h-screen w-full bg-[#fdfdf9] text-[#111111] flex items-center justify-center px-6 py-12 md:px-16 lg:px-24 select-none"
    >
      <div className="w-full max-w-[1360px] grid grid-cols-1 md:grid-cols-12 items-center gap-12 md:gap-8">
        {/* Left Column: CloudGoat & Navigation */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => {
              setActiveSection(null);
            }}
            className="text-[38px] sm:text-[44px] lg:text-[48px] font-normal tracking-tight text-[#111111] hover:opacity-70 transition-opacity duration-150 cursor-pointer focus:outline-none focus-visible:underline"
          >
            CloudGoat
          </button>

          <nav
            aria-label="Primary Navigation"
            className="mt-20 md:mt-28 flex flex-col items-center gap-3.5 text-[22px] sm:text-[25px] lg:text-[27px] font-normal leading-snug"
          >
            {(['works', 'about', 'Machine'] as const).map((item) => {
              const isActive = activeSection === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`cursor-pointer transition-opacity duration-150 hover:opacity-60 focus:outline-none focus-visible:underline whitespace-nowrap ${
                    isActive ? 'underline underline-offset-8 decoration-1' : ''
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Column: Goat Illustration (default) or Section Content */}
        <div className="md:col-span-7 flex items-center justify-center min-h-[380px] md:min-h-[520px]">
          {activeSection === null && (
            <div className="w-full max-w-[740px] flex items-center justify-center">
              {!imageError ? (
                <img
                  src={customGoatSrc || goatIllustration}
                  alt="CloudGoat illustration — vintage woodcut of a goat wearing small round spectacles"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-auto max-h-[540px] object-contain"
                />
              ) : (
                <div className="w-full aspect-[3/2] flex items-center justify-center border border-[#111111]/15 text-sm text-[#111111]/60">
                  CloudGoat
                </div>
              )}
            </div>
          )}

          {activeSection === 'works' && (
            <section className="w-full max-w-[640px] text-left select-text">
              <div className="flex items-baseline justify-between border-b border-[#111111]/15 pb-3 mb-5">
                <h2 className="text-xl font-normal">works</h2>
                <button
                  type="button"
                  onClick={() => setActiveSection(null)}
                  className="text-xs text-[#111111]/60 hover:text-[#111111] transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  ← close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WORKS.map((work) => (
                  <a
                    key={work.id}
                    href={work.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-[#111111]/10 p-3.5 hover:border-[#111111]/30 transition-colors duration-150"
                  >
                    <div className="text-sm text-[#111111] leading-snug">
                      {work.title} ↗
                    </div>
                    <p className="mt-1.5 text-xs text-[#111111]/70 leading-relaxed">
                      {work.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {activeSection === 'about' && (
            <section className="w-full max-w-[580px] text-left select-text">
              <div className="flex items-baseline justify-between border-b border-[#111111]/15 pb-3 mb-6">
                <h2 className="text-xl font-normal">about</h2>
                <button
                  type="button"
                  onClick={() => setActiveSection(null)}
                  className="text-xs text-[#111111]/60 hover:text-[#111111] transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  ← close
                </button>
              </div>

              <div className="space-y-5 text-sm leading-relaxed text-[#111111]/85">
                <p>
                  学生。AI愛好家。RTX3060、Qwen3.8-27B-GSQ-RCOと共に生きる。モデルマージなどを嗜んでいます
                </p>

                <div className="pt-3 border-t border-[#111111]/10 space-y-2 text-xs text-[#111111]/70">
                  <div className="flex gap-4">
                    <span className="w-24 text-[#111111]/50 shrink-0">Interests</span>
                    <span>Model Merge</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-24 text-[#111111]/50 shrink-0">Location</span>
                    <span>Niigata, Japan</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-24 text-[#111111]/50 shrink-0">Links</span>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://x.com/croudgoat"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#111111] hover:underline underline-offset-4"
                      >
                        X
                      </a>
                      <span aria-hidden="true">·</span>
                      <a
                        href="https://huggingface.co/CloudGoat"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#111111] hover:underline underline-offset-4"
                      >
                        Hugging Face
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'Machine' && (
            <section className="w-full max-w-[580px] text-left select-text">
              <div className="flex items-baseline justify-between border-b border-[#111111]/15 pb-3 mb-6">
                <h2 className="text-xl font-normal">Machine</h2>
                <button
                  type="button"
                  onClick={() => setActiveSection(null)}
                  className="text-xs text-[#111111]/60 hover:text-[#111111] transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  ← close
                </button>
              </div>

              <dl className="divide-y divide-[#111111]/10 text-sm">
                {MACHINE_SPECS.map((item) => (
                  <div
                    key={item.label}
                    className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
                  >
                    <dt className="w-32 shrink-0 text-xs text-[#111111]/50">{item.label}</dt>
                    <dd className="text-[#111111]/85 leading-relaxed">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

