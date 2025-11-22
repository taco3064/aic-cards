import type { SpreadMode } from '~app/hooks/useSpreadCards';

export interface CardsFanStageProps<Meta extends CardMeta> extends BaseStageProps<Meta> {
  spreadMode?: SpreadMode;
  onCardsDiscard?: (meta: Meta[]) => void;
}
