;; ============================================================
;; Emacs 30.2 Minimal + Wombat Theme 
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
(package-initialize)

(load-theme 'wombat t)

(use-package org-modern
  :ensure t
  :config
  (with-eval-after-load 'org
    (global-org-modern-mode)))

;; 헤딩 크기 키우기 (예: 제목 레벨별 폰트 크기 조정)
(custom-set-faces
 '(org-level-1 ((t (:height 1.4 :weight bold))))
 '(org-level-2 ((t (:height 1.2 :weight bold))))
 '(org-level-3 ((t (:height 1.1)))))

;; -------------------------------
;; 4. 줄번호 + 현재줄 강조
;; -------------------------------
(global-display-line-numbers-mode 1)
(setq display-line-numbers-type 'absolute)

(global-hl-line-mode 1)
(global-visual-line-mode 1) ;; Soft Word-Wrap
