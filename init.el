;;; -*- lexical-binding: t; -*-
;; ============================================================
;; Emacs 31.1 / Windows 11
;; Minimal UI + Tsdh Dark + Org + GFM + EPUB
;; ============================================================

;; ------------------------------------------------------------
;; 0. 기본 인코딩
;; ------------------------------------------------------------

(prefer-coding-system 'utf-8)
(set-language-environment "UTF-8")
(set-default-coding-systems 'utf-8)

;; ------------------------------------------------------------
;; 1. UI 최소화 / 기본 환경
;; ------------------------------------------------------------

(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)

(setq inhibit-startup-screen t
inhibit-startup-message t
initial-scratch-message nil)

;; GUI에서만 폰트 설정
(when (display-graphic-p)
(set-frame-font "Sarasa Mono K Nerd Font-12" nil t))

;; 선택 영역에 입력하면 기존 텍스트 삭제
(delete-selection-mode 1)

;; 백업 / 자동 저장 끄기
(setq auto-save-default nil
make-backup-files nil)

;; 심볼릭 링크 방문 시 질문하지 않음
(setq vc-follow-symlinks t)

;; ------------------------------------------------------------
;; 2. 패키지 시스템
;; ------------------------------------------------------------

(require 'package)

(setq package-archives
'(("gnu" . "https://elpa.gnu.org/packages/")
("nongnu" . "https://elpa.nongnu.org/nongnu/")
("melpa" . "https://melpa.org/packages/")))

(package-initialize)

;; use-package가 없으면 설치
(unless (package-installed-p 'use-package)
(package-refresh-contents)
(package-install 'use-package))

(require 'use-package)

(setq use-package-always-ensure t)

;; ------------------------------------------------------------
;; 3. 파일 찾기
;; ------------------------------------------------------------

(fido-mode 1)
(global-set-key (kbd "C-x C-f") #'find-file)

;; ------------------------------------------------------------
;; 4. 테마
;; ------------------------------------------------------------

(load-theme 'tsdh-dark t)

;; ------------------------------------------------------------
;; 5. 줄번호 / 현재줄 / Soft Wrap
;; ------------------------------------------------------------

(global-display-line-numbers-mode 1)
(setq display-line-numbers-type 'absolute)
(global-hl-line-mode 1)
(global-visual-line-mode 1)

;; ------------------------------------------------------------
;; 6. Org
;; ------------------------------------------------------------

(use-package org
:ensure nil
:config

;; Org 기본 기능
(require 'ox)

;; Org → Markdown export
(require 'ox-md))

;; ------------------------------------------------------------
;; 7. Org Modern
;; ------------------------------------------------------------

(use-package org-modern
:ensure t
:after org
:config
(global-org-modern-mode 1))

;; ------------------------------------------------------------
;; 8. Org 제목 크기
;; ------------------------------------------------------------

(custom-set-faces

'(org-level-1
((t (:height 1.4 :weight bold))))

'(org-level-2
((t (:height 1.2 :weight bold))))

'(org-level-3
((t (:height 1.1 :weight bold))))

'(org-level-4
((t (:height 1.0))))

'(org-level-5
((t (:height 1.0))))

'(org-level-6
((t (:height 1.0))))

;; Markdown heading
'(markdown-header-face-1
((t (:height 1.4 :weight bold))))

'(markdown-header-face-2
((t (:height 1.2 :weight bold))))

'(markdown-header-face-3
((t (:height 1.1 :weight bold))))

'(markdown-header-face-4
((t (:height 1.0))))

'(markdown-header-face-5
((t (:height 0.9))))

'(markdown-header-face-6
((t (:height 0.8)))))

;; ------------------------------------------------------------
;; 9. Markdown / GitHub Flavored Markdown
;; ------------------------------------------------------------

(use-package markdown-mode
:ensure t
:mode
(("\.md\'" . gfm-mode)
("\.markdown\'" . gfm-mode)))

;; ------------------------------------------------------------
;; 10. EPUB
;; ------------------------------------------------------------

(use-package nov
:ensure t
:mode ("\.epub\'" . nov-mode))

;; ------------------------------------------------------------
;; 11. Org / Markdown Soft Wrap
;; ------------------------------------------------------------

(add-hook 'org-mode-hook
#'visual-line-mode)

(add-hook 'markdown-mode-hook
#'visual-line-mode)

;; ------------------------------------------------------------
;; 12. 경고 메시지
;; ------------------------------------------------------------

(setq warning-suppress-log-types
'((unlock-file)))
