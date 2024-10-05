import { Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-background border-t fixed bottom-0">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-1 text-sm animate-fade-in">
          <span>Made with</span>
          <div className="animate-pulse">
            <Heart className="w-4 h-4 text-red-500" aria-hidden="true" />
          </div>
          <span>by</span>
          <Link
            href="https://twitter.com/galaxdr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            @galaxdr
          </Link>
        </div>
      </div>
    </footer>
  )
}