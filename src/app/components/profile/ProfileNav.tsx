export default function ProfileNav({ section, handlePostSection, handleRepostSection, handleCommentSection }: { section: string, handlePostSection: () => void, handleRepostSection: () => void, handleCommentSection: () => void }) {
	return (
		<nav className={`flex items-center justify-evenly px-6 border-b-2 mt-2`}>
			<button onClick={handlePostSection} className={`py-2 font-medium text-base h-full transition-all duration-150 ${section == 'post' && 'border-b-4 border-blue-400'}`}>Posts</button>
			<button onClick={handleRepostSection} className={`py-2 font-medium text-base h-full transition-all duration-150 ${section == 'repost' && 'border-b-4 border-blue-400'}`}>Reposts</button>
			<button onClick={handleCommentSection} className={`py-2 font-medium text-base h-full transition-all duration-150 ${section == 'comment' && 'border-b-4 border-blue-400'}`}>Comments</button>
		</nav>
	)
}