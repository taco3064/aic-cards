type CardSize<Meta extends 'component' | 'styled'> = Meta extends 'component'
  ? Record<'width' | 'height', number>
  : Record<'$width' | '$height', number>;
