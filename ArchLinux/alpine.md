setup-alpine

apk add intel-ucode linux-firmware build-base git \
        libx11 libxft libxinerama xorg-server xinit \
        noto-cjk terminus-font \
        moc alsa-utils bluez bluez-utils \
        qutebrowser neovim zsh zsh-autosuggestions zsh-syntax-highlighting


# Nerd Terminus
git clone https://github.com/ryanoasis/nerd-fonts.git
cd nerd-fonts
./install.sh Terminus

fc-list | grep Terminus

static const char *fonts[] = {
    "Terminus Nerd Font:size=12"
};


apk add doas

/etc/doas.conf
permit persist :wheel

addgroup <사용자명> wheel

doas apk update
