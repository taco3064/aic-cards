type SelectionClasses = Record<'drawed' | 'drawable', string>;

export interface DeckProps extends CardSize<'styled'> {
  $selector?: string;
  $selectionClasses?: SelectionClasses;
}
