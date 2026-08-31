;;; -*- lexical-binding: t; -*-
;; ============================================================
;; Emacs 31.1 Minimal + Wombat Theme 
;; ============================================================


;; UTF-8 기본 인코딩
(prefer-coding-system 'utf-8)

;; -------------------------------
;; 1. UI 최소화 / 기본 환경
;; -------------------------------
;;(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)

(setq inhibit-startup-screen t
      inhibit-startup-message t
      initial-scratch-message nil)

;; 글꼴 설정 (GUI 전용)
(when (display-graphic-p)
  (set-frame-font "Sarasa Mono K Nerd Font-12" nil t))

;; 백업/자동저장 끄기
(setq auto-save-default nil
      make-backup-files nil
      vc-follow-symlinks t)
(delete-selection-mode t)

;; -------------------------------
;; 2. 파일 찾기 (fido-mode 권장)
;; -------------------------------
(fido-mode 1)
(global-set-key (kbd "C-x C-f") 'find-file)

;; -------------------------------
;; 3. 테마 (내장 wombat)
;; -------------------------------
(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(add-to-list 'package-archives '("org" . "https://orgmode.org/elpa/"))
(add-to-list 'package-archives '("melpa-stable" . "https://stable.melpa.org/packages/"))
(add-to-list 'package-archives '("nongnu" . "https://elpa.nongnu.org/nongnu/"))
(package-initialize)

(load-theme 'tsdh-dark t)

(use-package org-modern
  :ensure t
  :config
  (with-eval-after-load 'org
    (global-org-modern-mode)))

;; 헤딩 크기 키우기 (예: 제목 레벨별 폰트 크기 조정)
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(markdown-header-face-1 ((t (:height 1.4 :weight bold))))
 '(markdown-header-face-2 ((t (:height 1.2 :weight bold))))
 '(markdown-header-face-3 ((t (:height 1.1))))
 '(markdown-header-face-4 ((t (:height 1.0))))
 '(markdown-header-face-5 ((t (:height 0.9))))
 '(markdown-header-face-6 ((t (:height 0.8))))
 '(org-level-1 ((t (:height 1.4 :weight bold))))
 '(org-level-2 ((t (:height 1.2 :weight bold))))
 '(org-level-3 ((t (:height 1.1)))))

(use-package markdown-mode
  :ensure t
  :mode (("\\.md\\'" . gfm-mode)
         ("\\.markdown\\'" . markdown-mode)))

;; Markdown 헤딩 크기 조정



;; -------------------------------
;; 4. 줄번호 + 현재줄 강조
;; -------------------------------
(global-display-line-numbers-mode 1)
(setq display-line-numbers-type 'absolute)

(global-hl-line-mode 1)
(global-visual-line-mode 1) ;; Soft Word-Wrap
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages '(markdown-mode nov org-modern))
 '(warning-suppress-log-types '((unlock-file) (unlock-file))))

(use-package nov
  :ensure t
  :mode ("\\.epub\\'" . nov-mode))
