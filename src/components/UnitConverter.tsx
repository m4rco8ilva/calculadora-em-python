import React, { useState } from 'react';
import { ArrowRightLeft, Sparkles, Copy, Check } from 'lucide-react';

type UnitCategory = 'length' | 'mass' | 'temp' | 'data';

interface ConversionFactor {
  label: string;
  toBase: (val: number) => number;
  fromBase: (baseVal: number) => number;
}

const CONVERSIONS: Record<UnitCategory, { name: string; units: Record<string, ConversionFactor> }> = {
  length: {
    name: 'Comprimento',
    units: {
      m: { label: 'Metros (m)', toBase: (v) => v, fromBase: (b) => b },
      km: { label: 'Quilômetros (km)', toBase: (v) => v * 1000, fromBase: (b) => b / 1000 },
      cm: { label: 'Centímetros (cm)', toBase: (v) => v / 100, fromBase: (b) => b * 100 },
      mm: { label: 'Milímetros (mm)', toBase: (v) => v / 1000, fromBase: (b) => b * 1000 },
      mi: { label: 'Milhas (mi)', toBase: (v) => v * 1609.344, fromBase: (b) => b / 1609.344 },
      ft: { label: 'Pés (ft)', toBase: (v) => v * 0.3048, fromBase: (b) => b / 0.3048 },
      in: { label: 'Polegadas (in)', toBase: (v) => v * 0.0254, fromBase: (b) => b / 0.0254 },
    },
  },
  mass: {
    name: 'Massa & Peso',
    units: {
      kg: { label: 'Quilogramas (kg)', toBase: (v) => v, fromBase: (b) => b },
      g: { label: 'Gramas (g)', toBase: (v) => v / 1000, fromBase: (b) => b * 1000 },
      mg: { label: 'Miligramas (mg)', toBase: (v) => v / 1000000, fromBase: (b) => b * 1000000 },
      lb: { label: 'Libras (lb)', toBase: (v) => v * 0.45359237, fromBase: (b) => b / 0.45359237 },
      oz: { label: 'Onças (oz)', toBase: (v) => v * 0.0283495, fromBase: (b) => b / 0.0283495 },
    },
  },
  temp: {
    name: 'Temperatura',
    units: {
      c: { label: 'Graus Celsius (°C)', toBase: (v) => v, fromBase: (b) => b },
      f: { label: 'Fahrenheit (°F)', toBase: (v) => ((v - 32) * 5) / 9, fromBase: (b) => (b * 9) / 5 + 32 },
      k: { label: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (b) => b + 273.15 },
    },
  },
  data: {
    name: 'Dados Digitais',
    units: {
      b: { label: 'Bytes (B)', toBase: (v) => v, fromBase: (b) => b },
      kb: { label: 'Kilobytes (KB)', toBase: (v) => v * 1024, fromBase: (b) => b / 1024 },
      mb: { label: 'Megabytes (MB)', toBase: (v) => v * 1024 * 1024, fromBase: (b) => b / (1024 * 1024) },
      gb: { label: 'Gigabytes (GB)', toBase: (v) => v * 1024 * 1024 * 1024, fromBase: (b) => b / (1024 * 1024 * 1024) },
      tb: { label: 'Terabytes (TB)', toBase: (v) => v * Math.pow(1024, 4), fromBase: (b) => b / Math.pow(1024, 4) },
    },
  },
};

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('km');
  const [inputValue, setInputValue] = useState<string>('1000');
  const [copied, setCopied] = useState<boolean>(false);

  const currentCategoryData = CONVERSIONS[category];
  const unitKeys = Object.keys(currentCategoryData.units);

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const keys = Object.keys(CONVERSIONS[newCat].units);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
  };

  const calculateResult = (): string => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '0';

    const fromFactor = currentCategoryData.units[fromUnit];
    const toFactor = currentCategoryData.units[toUnit];

    if (!fromFactor || !toFactor) return '0';

    const baseVal = fromFactor.toBase(val);
    const finalVal = toFactor.fromBase(baseVal);

    // Round neatly
    const rounded = Math.round(finalVal * 1e8) / 1e8;
    return String(rounded);
  };

  const result = calculateResult();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Conversor de Unidades</h3>
            <p className="text-xs text-slate-400">Converta medidas instantaneamente com alta precisão.</p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
          {(Object.keys(CONVERSIONS) as UnitCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                category === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {CONVERSIONS[cat].name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* From Input */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <label className="text-xs text-slate-400 font-medium block">De:</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-lg font-mono text-white focus:outline-none focus:border-emerald-500"
            placeholder="0"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {unitKeys.map((u) => (
              <option key={u} value={u}>
                {currentCategoryData.units[u].label}
              </option>
            ))}
          </select>
        </div>

        {/* To Result */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 relative">
          <div className="flex items-center justify-between">
            <label className="text-xs text-slate-400 font-medium block">Para:</label>
            <button
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-lg font-mono font-bold text-emerald-400 truncate">
            {result}
          </div>

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {unitKeys.map((u) => (
              <option key={u} value={u}>
                {currentCategoryData.units[u].label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
