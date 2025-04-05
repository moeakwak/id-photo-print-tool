import React from 'react'
import githubLogo from '../assets/github.svg'

interface FooterProps {
  repoUrl: string
}

const Footer: React.FC<FooterProps> = ({ repoUrl }) => {
  return (
    <footer className="w-full py-6 border-t border-border bg-background/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} 证件照排版工具 | 根据 MIT 许可证开源</p>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
            aria-label="GitHub 仓库"
          >
            <img src={githubLogo} alt="GitHub" className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer 