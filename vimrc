" netrw 설정
let g:netrw_liststyle = 3     " 트리 형태로 표시
let g:netrw_browse_split = 4  " 파일 선택시 새로운 분할 창으로 열기
let g:netrw_winsize = 20      " 파일 탐색기 전체 장 표시 비율

set encoding=utf-8            " 유니코드 인코딩 사용
set nocompatible              " Vi 설정 대신 Vim 설정 사용
set softtabstop=2             " 탭 키 입력 시 2칸 들여쓰기
set shiftwidth=4              " 자동 들여쓰기 시 4칸 들여쓰기
set tabstop=4                 " 기존 탭을 4칸 너비로 표시
set autoindent                " 자동 들여쓰기 활성화
set number                    " 줄 번호 활성화
set nobackup                  " 백업 파일 생성 비활성화
set laststatus=2              " 상태표시줄 표시
set statusline=%F%m%r%h%w%=(%{&ff}/%Y)\ (line\ %l\/%L,\ col\ %c)
set wildmenu                  " 명령줄의 탭 완성 옵션을 메뉴로 표시
set cursorline                " 현재 라인 강조

set relativenumber            " 명령 모드는 상대 번호 입력 모드는 절대 번호
augroup toggle_relative_number
autocmd InsertEnter * :setlocal norelativenumber
autocmd InsertLeave * :setlocal relativenumber

" GUI English
set guifont=Cascadia_Mono:h12:cANSI:qDRAFT
set langmenu=en_US.UTF-8
language messages en_US.UTF-8

syntax on                     " 구문 강조 활성화
filetype indent on            " 파일 들여쓰기 활성화
filetype plugin indent on     " 파일 타입 들여쓰기
colorscheme elflord           " 보기 좋은 색상 테마 설정


" --- Folding Settings ---
set foldenable                " 폴딩 기능 활성화
set foldcolumn=2              " 왼쪽에 폴딩 표시 컬럼 2칸
set foldmethod=indent         " 들여쓰기 기반 폴딩
set foldlevelstart=1          " 파일 열 때 기본 폴딩 레벨 (1이면 최상위만 열림, 나머지는 접힘)
set foldnestmax=10            " 폴딩 중첩 최대 깊이


" 사용자 정의 설정

" 리더 키 설정
let mapleader = "\<Space>"

" Visual 모드: 선택 영역을 클립보드에 복사
vnoremap <Leader>c "+y

" Normal 모드: 클립보드 붙여넣기
nnoremap <Leader>v "+p

" Normal 모드: 커서 단어를 백틱으로 감싸기
nnoremap <leader>b viw<Esc>a`<Esc>bi`<Esc>

" Visual 모드   : 선택한 블록을 백틱으로 감싸기
xnoremap <leader>b <Esc>`<i`<Esc>`>a`<Esc>

" Visual 모드: 선택한 블록을 #iconbox()[ ... ] 로 감싸기
"vnoremap <leader>x :<C-u>set paste<CR>gvc<CR>#iconbox()[<CR>```<CR><C-r>"<CR>```<CR>]<CR><Esc>:<C-u>set nopaste<CR>
vnoremap <leader>x <Esc>`<:put! =['', '```']<CR><Esc>`>:put =['```', '']<CR>

" 현재 라인 trans 로 번역해서 삽입
nnoremap <leader>t :.t.<CR>:.!trans -no-ansi -brief :ko<CR>

" 비주얼 블럭 trans 로 번역해서 삽입 (번역 -> 원문 형식)
xnoremap <leader>t y'>P:'<,'>!trans -no-ansi -brief :ko<CR>
