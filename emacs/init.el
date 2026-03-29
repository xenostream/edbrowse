;; ============================================================
;; Emacs 30.2 Minimal + Nord Theme + Vim-style Line Numbers
;; ============================================================

;; UTF-8을 기본 인코딩으로 설정
(prefer-coding-system 'utf-8)
(set-language-environment "UTF-8")
(set-terminal-coding-system 'utf-8)
(set-keyboard-coding-system 'utf-8)
(set-buffer-file-coding-system 'utf-8)
(setq default-buffer-file-coding-system 'utf-8)

;; -------------------------------
;; 1. UI 최소화 / 기본 환경
;; -------------------------------
(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)

(setq inhibit-startup-screen t)
(setq inhibit-startup-message t)
(setq initial-scratch-message nil)

;; 글꼴 설정 (GUI Emacs)
(set-frame-font "JetBrainsMono NFM-12" nil t)

;; 백업/자동저장 끄기
(setq auto-save-default nil)
(setq make-backup-files nil)
(delete-selection-mode t)
(setq vc-follow-symlinks t)

;; -------------------------------
;; 2. IDO 모드 (파일 찾기)
;; -------------------------------
(ido-mode 1)
(setq ido-enable-flex-matching t)
(global-set-key (kbd "C-x C-f") 'ido-find-file)

;; -------------------------------
;; 3. Nord Theme
;; -------------------------------
(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(add-to-list 'package-archives '("org" . "https://orgmode.org/elpa/"))
(add-to-list 'package-archives '("melpa-stable" . "https://stable.melpa.org/packages/"))
(package-initialize)

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))
(require 'use-package)
(setq use-package-always-ensure t)

(use-package nord-theme
  :config
  (load-theme 'nord t))

(use-package pdf-tools
  :config
  (pdf-tools-install))

;; -------------------------------
;; 4. 줄번호 + 현재줄 강조
;; -------------------------------
(global-display-line-numbers-mode 1)
(setq display-line-numbers-type 'absolute) 

(global-hl-line-mode 1)
(set-face-attribute 'hl-line nil :background "#3b4252") 

(when (facep 'line-number-current-line)
  (set-face-attribute 'line-number-current-line nil
                      :foreground "#ebcb8b"               ;; 노란색
                      :weight 'bold))
