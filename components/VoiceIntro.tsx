"use client";

import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const BARS = 38;
// deterministic resting shape so server and client render the same thing
const REST = Array.from({ length: BARS }, (_, i) =>
  Math.round((0.25 + 0.55 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.43))) * 100) / 100,
);

/**
 * Aysha's own recorded voice. Never autoplays; the waveform is driven by the
 * real audio signal while playing. If the file is missing, shows a quiet
 * "coming soon" state and nothing breaks.
 */
export function VoiceIntro({ src }: { src: string | null }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barsRef = useRef<HTMLSpanElement[]>([]);
  const ctxRef = useRef<{ ctx: AudioContext; analyser: AnalyserNode } | null>(null);
  const rafRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  const available = Boolean(src) && !error;

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    ctxRef.current?.ctx.close().catch(() => {});
  }, []);

  const animate = () => {
    const a = ctxRef.current?.analyser;
    if (a) {
      const data = new Uint8Array(a.frequencyBinCount);
      a.getByteFrequencyData(data);
      const step = Math.floor(data.length / BARS) || 1;
      barsRef.current.forEach((bar, i) => {
        const v = data[i * step] / 255;
        bar.style.transform = `scaleY(${Math.max(0.12, v)})`;
      });
    }
    rafRef.current = requestAnimationFrame(animate);
  };

  const setupAnalyser = () => {
    if (ctxRef.current || !audioRef.current) return;
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const srcNode = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      srcNode.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = { ctx, analyser };
    } catch {
      /* waveform stays static; audio still plays */
    }
  };

  const resetBars = () => {
    cancelAnimationFrame(rafRef.current);
    barsRef.current.forEach((bar, i) => (bar.style.transform = `scaleY(${REST[i]})`));
  };

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      setupAnalyser();
      await ctxRef.current?.ctx.resume().catch(() => {});
      try {
        await el.play();
      } catch {
        setError(true);
      }
    } else el.pause();
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    if (el.paused) await toggle();
  };

  return (
    <div className="mt-10 border-t border-white/15 pt-8" data-reveal="fade">
      <p className="font-bebas text-[clamp(1.8rem,3.2vw,3rem)] leading-none text-paper">{profile.voiceIntroTitle}</p>

      {available ? (
        <>
          <audio
            ref={audioRef}
            src={src ?? undefined}
            preload="none"
            onPlay={() => {
              setPlaying(true);
              cancelAnimationFrame(rafRef.current);
              rafRef.current = requestAnimationFrame(animate);
            }}
            onPause={() => {
              setPlaying(false);
              resetBars();
            }}
            onEnded={() => {
              setPlaying(false);
              setProgress(0);
              resetBars();
            }}
            onTimeUpdate={(e) => {
              const el = e.currentTarget;
              setProgress(el.duration ? el.currentTime / el.duration : 0);
            }}
            onError={() => setError(true)}
          />
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button type="button" onClick={toggle} className="btn btn-red" aria-label={playing ? "Pause intro" : "Play intro"}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? "Pause" : "Play intro"}
            </button>
            <button type="button" onClick={replay} className="p-2 text-paper/80 hover:text-red" aria-label="Replay intro">
              <RotateCcw size={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (!audioRef.current) return;
                audioRef.current.muted = !muted;
                setMuted(!muted);
              }}
              className="p-2 text-paper/80 hover:text-red"
              aria-label={muted ? "Unmute intro" : "Mute intro"}
              aria-pressed={muted}
            >
              {muted ? <VolumeX size={20} strokeWidth={1.5} /> : <Volume2 size={20} strokeWidth={1.5} />}
            </button>

            <div className="flex h-10 flex-1 items-center gap-[3px]" aria-hidden="true">
              {REST.map((h, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    if (el) barsRef.current[i] = el;
                  }}
                  className={cn(
                    "h-full w-[3px] origin-center transition-transform duration-150",
                    i / BARS < progress ? "bg-red" : "bg-white/35",
                  )}
                  style={{ transform: `scaleY(${h})` }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="mt-4 flex items-center gap-3 text-sm text-grey">
          <span className="flex h-6 items-end gap-[3px]" aria-hidden="true">
            {REST.slice(0, 10).map((h, i) => (
              <span key={i} className="w-[3px] bg-white/25" style={{ height: `${h * 100}%` }} />
            ))}
          </span>
          Voice intro coming soon.
        </p>
      )}
    </div>
  );
}
