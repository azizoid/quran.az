export const coloredTextcolors = [
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

export const ColoredText = ({ content }: ColoredTextProps): JSX.Element => {
  const text = content.split(' ')
  let randomColor = 0

  return (
    <div className="flex flex-wrap">
      {text.map((word, index) => {
        if (randomColor === coloredTextcolors.length) {
          randomColor = 0
        }

        return (
          <span
            style={{ color: coloredTextcolors[randomColor++] }}
            className="px-1 py-0.5 hover:bg-gray-100 hover:cursor-pointer"
            key={index}
          >
            {word + ' '}
          </span>
        )
      })}
    </div>
  )
}
