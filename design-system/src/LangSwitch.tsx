import React from 'react';

export interface LangSwitchProps {
  /** Language labels. */
  langs?: string[];
  /** Active language. */
  active?: string;
  /** Selection handler. */
  onChange?: (lang: string) => void;
}

/** LangSwitch — JP / EN / 中 language toggle; the active language uses the accent color. */
export function LangSwitch({ langs = ['JP', 'EN', '中'], active = 'JP', onChange }: LangSwitchProps) {
  return (
    <div className="lang" role="group" aria-label="Language">
      {langs.map((l) => (
        <button key={l} className={l === active ? 'is-active' : ''} onClick={() => onChange?.(l)}>
          {l}
        </button>
      ))}
    </div>
  );
}
