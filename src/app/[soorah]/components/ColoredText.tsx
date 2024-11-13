export const coloredTextColors = [
  '#3490dc',
  '#6574cd',
  '#9561e2',
  '#f66d9b',
  '#f6993f',
  '#38c172',
  '#4dc0b5',
  '#6cb2eb',
]

type ColoredTextProps = {
  content: string
}

export const ColoredText = ({ content }: ColoredTextProps) => {
  const text = content.split(' ')

  return (
    <div className="flex flex-wrap">
      {text.map((word, index) => (
        <span
          key={index}
          style={{ color: coloredTextColors[index % coloredTextColors.length] }}
          className="px-1 py-0.5 hover:bg-gray-100 hover:cursor-pointer"
        >
          {word}{' '}
        </span>
      ))}
    </div>
  )
}
