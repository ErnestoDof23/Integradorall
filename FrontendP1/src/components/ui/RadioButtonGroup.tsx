import type { AnswerLevel } from '../../types';

interface RadioButtonGroupProps {
  name: string;
  options: { value: AnswerLevel; label: string; description: string }[];
  selected: AnswerLevel | null;
  onChange: (value: AnswerLevel) => void;
}

const colorMap: Record<AnswerLevel, string> = {
  optimo: 'border-success bg-success/5 text-success',
  aceptable: 'border-warning bg-warning/5 text-warning',
  malo: 'border-danger bg-danger/5 text-danger',
};

const activeColorMap: Record<AnswerLevel, string> = {
  optimo: 'border-success bg-success/10 ring-2 ring-success/30',
  aceptable: 'border-warning bg-warning/10 ring-2 ring-warning/30',
  malo: 'border-danger bg-danger/10 ring-2 ring-danger/30',
};

const dotColor: Record<AnswerLevel, string> = {
  optimo: 'bg-success',
  aceptable: 'bg-warning',
  malo: 'bg-danger',
};

export default function RadioButtonGroup({
  name,
  options,
  selected,
  onChange,
}: RadioButtonGroupProps) {
  return (
    <fieldset className="flex flex-col gap-3 sm:flex-row" role="radiogroup" aria-label="Nivel de condicion">
      {options.map((opt) => {
        const isActive = selected === opt.value;
        return (
          <label
            key={opt.value}
            className={`flex-1 cursor-pointer rounded-lg border-2 p-4 transition-all ${
              isActive ? activeColorMap[opt.value] : colorMap[opt.value]
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isActive}
              onChange={() => onChange(opt.value)}
              aria-label={`${opt.label} - ${opt.description}`}
              className="sr-only"
            />
            <div className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  isActive ? 'border-current' : 'border-gray-300'
                }`}
              >
                {isActive && (
                  <div className={`h-2 w-2 rounded-full ${dotColor[opt.value]}`} />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">{opt.label}</div>
                <div className="text-xs text-gray-500">{opt.description}</div>
              </div>
            </div>
          </label>
        );
      })}
    </fieldset>
  );
}
