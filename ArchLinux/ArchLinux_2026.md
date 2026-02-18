# Arch Linux My System Step!!

```bash
archinstall
pjkwon add user / manual part - f2fs suggestion layout / Asia/Seoul => Install & reboot
 

# pacman -S base-devel git 
reboot

# pjkwon login

# curl -O http://www.edbrowse.org/static/edbrowse-x86_64
# mv edbrowse-x86_64 /usr/bin/edb
# chmod 755 /usr/bin/edb

curl -O https://raw.githubusercontent.com/xenostream/edbrowse/refs/heads/main/ebrc  {zshrc, config.py, vimrc ...}
mv ebrc ~/.ebrc

~/.config/qutebrowser/config.py
~/.config/nvim/init.vim
~/.zshrc

mv zshrc .zshrc
chsh (/usr/bin/zsh)

re-login

$ git clone https://aur.archlinux.org/yay
$ makepkg -si

$ yay -Syuu

$ yay -S libx11 libxft libxinerama xorg xorg-xinit noto-fonts-cjk terminus-font 
            cmus bluez bluez-utils qutebrowser alsa-utils ntfs-3g  zsh zsh-autosuggestions zsh-syntax-highlighting 
            
$ yay -S kime-git    (long time & heavy rust + cargo...  kime-bin is failed)  

$ yay -S dwm dmenu

$ git clone https://git.suckless.org/st, slstatus
$ cd {st, slstaus}; => mv config.def.h config.h

$ ed .build/st/config.h
$ static char *font = "xos4 Terminus:pixelsize=18:antialias=true:autohint=true";

ed .build/slstatus/config.h
/* function format          argument */
	{ cpu_perc, "CPU: %s %% | ", NULL },
	{ ram_used, "RAM: %s | ", NULL },
	{ netspeed_rx, "Net: %s | ", "enp3s0" },
	{ uptime, "Run: %s | ", NULL },
	{ datetime, "%s",           "%F %T" },

/st/slstatus => make && sudo make clean install

$ edb /home/pjkwon/.xinitrc

export XMODIFIERS=@im=kime    
export QT_IM_MODULE=kime      
export GTK_IM_MODULE=kime     

exec xrandr --rate 75 &
exec xset s off &
exec xset -dpms &
exec kime-xim &               
exec slstatus &

exec dwm


re-login
$ startx


▶  bluetooth:
# systemctl enable bluetooth
# systemctl start bluetooth (or reboot)
# bluetoothctl
power on
agent on
default-agent
scan on
pair XX:XX:XX
trust XX:XX:XX

▶  Yaft FrameBuffer Terminal with Hangul key (working root)
# pacman -S libhangul
# git clone https://github.com/uobikiemukot/yaft.git
# cd yaft
# patch -p1 < hangul.patch
# edb tools/mkfont_bdf.c  -> 1st line added
#define _GNU_SOURCE
#include <wchar.h>
# make 
# make install

# cd /root
# dumpkeys > kmap
string F60 = "\200"  (add)

keycode 100 = AltGr
    alt	keycode 100 = AltGr
    shift keycode 57 = F60

# ed /etc/vconsole.conf
KMAP=/root/kmap

yaft -> Shift + Space (Han/Eng)
```


# DWM shortcut
| Shortcut | Description |
| --- | --- |
| Shift+Alt+Q | dwm 종료 |
| Shift+Alt+Enter | 터미널 실행 |
| Alt+P | demnu 열기 |
| Shift+Alt+C | 현재 창 닫기 |
|    |    |
| Alt+j, k | 창 커서 이동 |
| Alt+h, l | 마스터 창 크기 조절 |
| Alt+d, l | 창 마스터 / 스택으로 이동 |
| Alt+Enter | 마스터 창과 스택 바꾸기 |
| Alt+1..9 | 숫자 태그로 이동 |
| Shift+Alt+1..9 | 현재 창 해당 태그로 보내기 |
| 레이아웃 |   |
| Alt+t | 타일 모드 |
| Alt+f | 플로팅 모드 |
| Alt+m | 모노클 모드 |
| 플로팅 모드 |    |
| Alt+R클릭 | 창 크기 조절 |
| Alt+L클릭 | 창 위치 이동 |
| Shift+Alt+Space | 플로팅 전환 |

