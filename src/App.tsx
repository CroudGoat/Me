/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import goatIllustration from './assets/images/1790412946906-01a0dced-13bf-7de9-8acb-2582d08cf4c0.webp';
import { isAcceptableImage } from './imageInput.ts';

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
    description: 'Qwen3.5-4Bベースに8つのtask-vectorを線形マージした視覚言語モデル。GoatMerge製。',
    url: 'https://huggingface.co/CloudGoat/Baphomet-1.0-4B',
  },
  {
    id: '05',
    title: 'Mephisto-1.0-4B',
    description: 'Qwen3.5-4Bベースを多段階マージしたエージェント向け4B対話モデル。SLERP+DARE-TIES製。',
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b border-[#111111]/10 pb-2 text-xs uppercase tracking-widest text-[#111111]/40">
      {children}
    </h2>
  );
}

export default function App() {
  const [customGoatSrc, setCustomGoatSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (isAcceptableImage(file)) {
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
      className="min-h-screen w-full bg-[#fdfdf9] text-[#111111] px-6 py-12 md:px-16 lg:px-24 select-none"
    >
      <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-8">
        {/* Left Column: CloudGoat & illustration */}
        <header className="flex flex-col items-center justify-center md:sticky md:top-12 md:col-span-5">
          <h1 className="text-[38px] font-normal tracking-tight text-[#111111] sm:text-[44px] lg:text-[48px]">
            CloudGoat
          </h1>

          <div className="mt-10 flex w-full max-w-[420px] flex-col items-center gap-3">
            {!imageError ? (
              <img
                src={customGoatSrc || goatIllustration}
                alt="CloudGoat illustration — vintage woodcut of a goat wearing small round spectacles"
                onError={() => setImageError(true)}
                className="w-full h-auto max-h-[480px] object-contain"
              />
            ) : (
              <div className="flex aspect-[3/2] w-full items-center justify-center border border-[#111111]/15 text-sm text-[#111111]/60">
                CloudGoat
              </div>
            )}

            {customGoatSrc && (
              <button
                type="button"
                onClick={() => {
                  setCustomGoatSrc(null);
                  setImageError(false);
                }}
                className="cursor-pointer text-xs text-[#111111]/60 transition-colors duration-150 hover:text-[#111111] focus:outline-none focus-visible:underline"
              >
                reset image
              </button>
            )}
          </div>
        </header>

        {/* Right Column: all content, one flow */}
        <div className="flex flex-col gap-14 select-text md:col-span-7">
          <section>
            <SectionHeading>works</SectionHeading>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

          <section>
            <SectionHeading>about</SectionHeading>
            <div className="space-y-5 text-sm leading-relaxed text-[#111111]/85">
              <p>
                学生。AI愛好家。モデルマージやモデル手術などを嗜んでいます。計算資源が欲しいです
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

          <section>
            <SectionHeading>machine</SectionHeading>
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
        </div>
      </div>
    </main>
  );
}
