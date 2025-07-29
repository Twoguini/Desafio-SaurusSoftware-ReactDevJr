import { useNavigate } from 'react-router-dom';

import '../style/Header.css';

interface HeaderProps {
  pageTitle: string;
}

export default function Header({ pageTitle }: HeaderProps) {
  const navigate = useNavigate();

  return(
    <div className='header-container'>
      <a className='header-return-icon' onClick={() => navigate(-1)}>
        <svg className="arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15 18L9 12L15 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
      <span className='page-title'>{pageTitle}</span>
    </div>
  )
}