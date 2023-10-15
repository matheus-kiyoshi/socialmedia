export function MainPostContent({ id, text }: { id: string; text: string }) {
  return (
    <div className="w-full text-left pr-3 leading-5 mt-2 pl-2">
      <p className="break-words">{text}</p>
    </div>
  )
}
