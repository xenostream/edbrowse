# Crux Linux 3.8 Handbook

---
<br><br>
# 1. Preface
이 핸드북은 _Per Lidén_ 이 작성했습니다. _RobertMcMeekin_ 은 이를 DocBook으로 변환했으며, CRUX 팀은 위키 버전을 만들었습니다. 수많은 다른 분들이 피드백과 개선 제안을 해주셨습니다.


<br><br>
# 2. Introduction
## 2.1. What is CRUX?
`CRUX` 는 숙련된 리눅스 사용자를 대상으로 하는 x86-64 아키텍처용 경량 리눅스 배포판입니다. 이 배포판의 주요 초점은 “간결함 유지” (keep it simple)이며, 이는 간단한 tar.gz 기반 패키지 시스템, BSD 스타일 initscripts, 그리고 비교적 소규모로 정제된 패키지 모음에 반영됩니다. 부차적인 초점은 새로운 리눅스 기능과 최신 도구 및 라이브러리의 활용입니다. 또한, CRUX는 애플리케이션 설치 및 업그레이드를 용이하게 만드는 포트 시스템을 갖추고 있습니다.


## 2.2. Why use CRUX?
현재는 수많은 리눅스 배포판이 존재합니다. 그렇다면 CRUX가 사용자들에게 매력적인 선택인 이유는 무엇일까요? 결국 배포판 선택은 취향의 문제입니다. CRUX를 만든 사람들의 취향과 목표에 대한 몇 가지 힌트를 알려드립니다. CRUX는 처음부터 끝까지 "단순함" (simplicity)을 염두에 두고 만들어졌습니다. 새로운 패키지를 쉽게 만들고 기존 패키지를 업데이트하는 것이 핵심입니다. CRUX에서 패키지를 업데이트하는 것은 종종 `sudo prt-get update $MYPKG` 명령어를 입력하는 것으로 충분합니다. 포트 시스템을 사용하면 패키지를 최신 상태로 유지할 수 있습니다. 최신 알파 버전이 아니라 안정적인 최신 버전으로 말입니다. 또 다른 특징은 프로세서에 최적화된 패키지(예: -march=x86-64 컴파일)와, 사용하지 않을 파일(예: `/usr/share/doc/*`)로 인해 어지럽혀지지 않은 깔끔한 파일 시스템이 있습니다. 마지막으로, CRUX 개발팀은 새로운 기능이 안정화 단계에 도달하는 즉시 도입하기 위해 노력하지만, 이러한 혁신은 상류 소스(upstream source)나 CRUX 시스템의 나머지 부분에 급격한 변경 없이 CRUX에서 작동하도록 신중하게 검토됩니다.

요약하면, 다음과 같은 분이라면 CRUX가 적합할 수 있습니다:

- 설치 기반으로 깔끔하고 견고한 리눅스 배포판을 원하는 어느 정도 경험이 있는 리눅스 사용자
- 타사 소스 트리를 탐색하고 컴파일하는 데 필요한 사항을 파악하는 도전을 즐기는 사용자
- 대규모 패키지를 정기적으로 재빌드할 수 있는 인내심을 가진 사용자
- 운영체제를 조립하는 복잡한 과정을 탐구하고 다른 애호가들과 논의하는 것을 즐기는 사용자

> [!NOTE]
> 참고 : CRUX를 사용한다면, 보안 업데이트 및 사용자 조치가 필요한 업데이트가 공지되는 저용량 메일링 리스트 구독을 적극 권장합니다.


## 2.3. License
### 2.3.1. Packages
CRUX는 리눅스 배포판이므로 다양한 사람들이 작성한 소프트웨어를 포함합니다. 각 소프트웨어 패키지는 개발자가 선택한 자체적인 라이선스를 따릅니다. 특정 패키지의 라이선스 정보를 확인하려면 해당 소스 코드를 살펴보시기 바랍니다.

### 2.3.2. Build Scripts
CRUX의 모든 패키지 빌드 스크립트(core, opt, xorg 및 compat-32 패키지 범주에 속함)는 _Per Lidén_ 과 CRUX 개발팀이 저작권을 소유하며(Copyright ©2000-2025), GNU 일반 공중 사용 허가서(GNU General Public License)에 따라 배포됩니다.

### 2.3.3. NO WARRANTY
CRUX는 유용할 것이라는 희망을 가지고 배포되지만, 어떠한 보증도 없이 배포됩니다. 상품성 또는 특정 목적에의 적합성에 대한 묵시적 보증조차 포함되지 않습니다. 사용자는 자신의 책임 하에 사용하시기 바랍니다.


<br><br>
# 3. Installing CRUX
## 3.1. Supported Hardware / Requirements
공식 CRUX ISO 이미지에 포함된 패키지는 x86-64(AMD Athlon 64, Intel Core, Intel Atom) 또는 최신 프로세서용으로 최적화되어 컴파일되었습니다. i686(Pentium-Pro, Celeron, Pentium-III) 이하 프로세서에 설치하려고 시도하지 마시기 바랍니다시. 제대로 작동하지 않습니다.

DVD 또는 이동식 플래시 드라이브에서 CRUX를 설치하려면 "최소 2GB의 시스템 메모리" 가 필요합니다. 좀 더 적은 양의 RAM도 커스텀 `chroot` 설치를 수행할 수 있습니다.

설치 시 사용되는 커널(즉, CRUX ISO 이미지(El Torito)로 부팅할 때)은 대부분의 디스크 컨트롤러를 지원하도록 컴파일되었습니다. ISO 이미지로 부팅한 후 하드 디스크가 인식되지 않는 경우(예: `lsblk` 출력에 CRUX 매체만 표시됨), CRUX 위키, 메일링 리스트 또는 버그 트래커에서 해결책을 찾을 수 있습니다. 또한, CRUX IRC 채널에 도움을 요청할 수도 있습니다. 예를 들어, 메인 디스크로 보드에 납땜된 메모리 카드를 사용하는 저전력 머신 소유자는 `CONFIG_X86_INTEL_LPSS` 를 활성화하도록 커널을 커스터마이징한 ISO를 빌드한 후 CRUX를 성공적으로 설치할 수 있었습니다.


## 3.2. Installing or Upgrading From Optical Medium or Removable Flash Drive
### 3.2.1. Prepare the Boot Medium
CRUX ISO 이미지(`crux-3.8.iso`)와 SHA256 체크섬(`crux-3.8.sha256`)을 다운로드합니다. 다운로드가 성공적으로 이루어졌는지 확인하려면 체크섬을 검사합니다.

```
$ sha256sum -c crux-3.8.sha256
```

명령어가 "crux-3.8.iso: OK" 를 반환하면 다운로드가 성공한 것이므로, ISO 이미지를 DVD에 굽거나 이동식 플래시 드라이브에 기록해서 계속 진행할 수 있습니다. 예를 들어, 이미지를 플래시 드라이브에 기록하려면 다음과 같이 처리합니다(**기존 내용을 모두 덮어씁니다!**):

```
# dd if=crux-3.8.iso of=/dev/sd? bs=1M
```

`/dev/sd?` 를 실제 플래시 드라이브의 장치 노드로 교체해야 합니다.

ISO 이미지는 부팅 가능합니다. BIOS에서 광학 드라이브나 플래시 드라이브에 우선 순위를 부여하도록 설정한 후, 새로 작성한 DVD나 이동식 플래시 드라이브를 삽입하고 컴퓨터를 재부팅합니다. 부팅 프롬프트에서 Enter 키를 누릅니다(하드웨어 구성에 따라 `root=` 매개변수를 조정해야 할 수도 있습니다).

새로 작성한 매체로 성공적으로 부팅되면 `tty1` 에서 `root` 로 로그인됩니다(비밀번호 입력 불필요). 이때 다른 키보드 레이아웃을 적용하려면 `loadkeys` 를 실행합니다. 사용 가능한 키맵은 `/usr/share/kbd/keymaps` 에서 찾을 수 있습니다.

### 3.2.2. Prepare the Disks
새로 설치할 경우, CRUX를 설치할 파티션을 생성(필요한 경우)한 후 포맷합니다. 업그레이드할 경우는 이 단계를 건너뛸 수 있습니다. 파일 시스템(특히 루트)에 대한 선택을 기억하시기 바랍니다! 선택한 파일 시스템의 드라이버는 Linux 커널에 컴파일되어 있거나 `initramfs` 에 포함되야 합니다.

```
# fdisk /dev/sd?
# mkfs.???? /dev/sd??
# mkswap /dev/sd??
```

> [!NOTE]
> "SATA 하드디스크는 일반적으로 SCSI 장치로 인식된다" 는 점에 유의합니다. 첫 번째 SATA 디스크는 `/dev/hda` 대신 `/dev/sda` 로 명명됩니다. 하드디스크 명명 규칙에 대한 자세한 내용은 "Linux Partition HOWTO" 를 참조합니다.

설치에 필요한 디스크 공간은 설치할 패키지 수에 따라 달라집니다. "최소 5GB의 루트 파티션을 확보할 것을 권장" 합니다. CRUX는 /usr용 별도 파티션 생성 여부 및 설치 과정에서의 기타 선택 사항에 따라 대략 500MB~1GB를 사용합니다.

스왑 공간 요구량은 최대 절전 모드 사용 여부나 RAM에서 패키지 빌드 계획 등 여러 요소에 따라 달라집니다. 현대 Linux 커널의 메모리 처리 방식에 대한 자세한 내용은 "In Defense of Swap" 을 참조합니다.


> [!NOTE]
> **UEFI** : 대부분의 UEFI 설치는 GPT 디스크 레이블과 EFI 시스템 파티션(ESP)이 필요합니다. ESP는 매우 클 필요가 없으며(예: 100MiB), FAT32 파일 시스템으로 포맷하고 부팅 가능으로 표시해야 합니다. UEFI를 사용할 경우 부트 로더/매니저는 기존 방식인 마스터 부트 레코드(MBR)에 설치하는 대신 ESP에 설치됩니다.

> [!NOTE]
> **MBR** : BIOS가 UEFI 부팅 모드를 지원하지 않으면(또는 레거시 MBR 모드를 위해 비활성화한 경우) EFI 로더나 커널 이미지를 위한 별도의 작은 파티션을 생성할 필요는 없습니다. 이 경우 `/` (루트)를 위한 하나의 파티션만으로 충분하며, GRUB은 `/boot` 하위 디렉토리에 저장된 리눅스 커널을 찾을 수 있어야 합니다. 그러나, 부트 로더로 `SYSLINUX` 를 선택할 경우 `syslinux.cfg` 파일이 포함된 파티션을 부팅 가능 파티션으로 표시해야 합니다. 자세한 내용은 ‘부트 로더 설치’ 섹션을 참조합니다.

CRUX는 리눅스 커널이 루트 파일 시스템으로 지원하는 btrfs, ext2, ext3, ext4, JFS, reiserfs 및 XFS 등의 모든 파일 시스템을 지원합니다. 또한, 시스템 데이터와 사용자 데이터를 분리하는 것을 강력히 권장합니다. 즉, `/home` (및 필요 시 `/var`)을 별도의 파티션에 배치해야 합니다. 이는 시스템 업그레이드나 재설치 또는 제거 시 작업을 훨씬 더 수월하게 만들어 줍니다.


> [!NOTE]
> 사용자 공간 처리용 파일 시스템 도구가 설치되어 있는지 확인합니다. xfsprogs, btrfs-progs, jfsutils 및 reiserfsprogs 는 opt 저장소에서 찾을 수 있습니다.

> [!NOTE] 
> BIOS 바이러스 보호 옵션이 비활성화되어 있는지 확인합니다. 이 옵션은 `fdisk` 로 새로운 파티션을 작성하는 것을 방해할 수 있습니다.


### 3.2.3. Mount Disks and Run the Setup Script
이 배포판을 설치하려는 파티션을 마운트합니다.

```
# mount /dev/sd?? /mnt
```

여러 파티션에 설치하려면 해당 파티션들도 마운트합니다. 예를 들어, `/home` 이나 `/var` 를 별도의 파티션에 배치하려면 다음과 같이 처리합니다:

```
# mkdir /mnt/var
# mount /dev/sd?? /mnt/var
```

UEFI를 사용할 경우, EFI 시스템 파티션에 대한 마운트 포인트를 생성한 후 마운트하는 것을 잊지 마시기 바랍니다:

```
# mkdir /mnt/boot
# mount /dev/sd?? /mnt/boot
```

스왑 파티션을 활성화합니다:

```
# swapon /dev/sd??
```

설치를 시작하려면 `setup` 을 입력합니다. 설치 스크립트는 새로운 루트 파티션을 마운트한 위치와 설치할 패키지를 묻습니다. 설치할 패키지를 선택합니다. `core` 에 포함된 모든 패키지를 설치하는 것이 권장됩니다.

> [!NOTE]
> **initramfs** : 모듈식 커널을 구축할 계획이면, `opt` 컬렉션에서 `dracut` 패키지를 선택해야 합니다.

> [!NOTE]
> **UEFI** : UEFI 시스템을 설치할 경우 패키지 선택 단계에서 `opt` 컬렉션의 `efibootmgr` 패키지를 **반드시** 선택해야 합니다. 부트 로더로 `grub2-efi` 를 선택하면 의존성 해결 과정에서 `efibootmgr` 가 자동으로 설치되지만, CRUX 를 사용할 때는 사용할 관리 도구에 좀 더 세심한 주의를 기울이는 것이 좋습니다.

> [!NOTE]
> Upgrading an existing CRUX installation
> 코어(`core`) 및 옵트(`opt`) 등의 외부 소프트 종속성에 연결된 패키지를 업그레이드하면, 해당 패키지가 코어 및 옵트 내의 종속성만 연결된 패키지로 대체됩니다. 기존 CRUX 시스템의 기능을 유지하려면 해당 패키지를 재빌드해야 합니다. 반면 기존 CRUX 시스템에서 포트 트리를 새로 고치고 오래된 패키지를 재빌드한 지 오래되었다면, 모든 패키지를 업그레이드하면 문제(예: 일부 라이브러리의 호환성 깨는 변경 사항)를 피할 수 있습니다. 설정 스크립트는 대상 시스템의 `/etc/pkgadd.conf` 파일을 참조해서 업그레이드 대상 파일과 제외 대상을 결정합니다. 이렇게 제외된 파일은 `/var/lib/pkg/rejected/` 디렉토리에 저장됩니다(파일 충돌 해결 방법은 “패키지 업그레이드” 섹션을 참조합니다). 패키지 설치가 완료되면 설치 스크립트가 설치 로그를 표시합니다. 로그의 마지막 줄에 “0 error(s)” 라고 표시되는지 확인합니다.

설치 과정에서 특정 패키지를 누락하거나 설치하지 못한 경우, CRUX 설치 매체를 마운트한 후 `pkgadd` 를 사용해서 해당 패키지를 설치할 수 있습니다.


### 3.2.4. Chroot and Build a Kernel
이제 커널을 컴파일하고 기본 시스템 구성을 수행할 차례입니다. 커널 컴파일 작업은 새로운 CRUX 설치 환경으로 “chroot” 합니다.

> [!NOTE]
> `chroot` 환경을 생성하는 `setup-chroot` 단축 명령어가 있습니다. 이 명령어는 다음의 모든 단계를 한 번에 실행합니다.

```
# mount --bind /dev /mnt/dev
# mount --bind /tmp /mnt/tmp
# mount --bind /run /mnt/run
# mount -t proc proc /mnt/proc
# mount -t sysfs none /mnt/sys
# mount -t devpts -o noexec,nosuid,gid=tty,mode=0620 devpts /mnt/dev/pts
(UEFI only) $ mount --bind /sys/firmware/efi/efivars /mnt/sys/firmware/efi/efivars
# chroot /mnt /bin/bash
```

루트 비밀번호를 설정합니다. (기존 CRUX 설치 환경에서 업그레이드할 경우는 필요하지 않습니다.)

```
$ passwd
```

파일 시스템을 구성하도록 `/etc/fstab` 파일을 편집합니다. 이때 vim 편집기를 사용할 수 있습니다. 설치 스크립트가 설치한 `fstab` 파일에는 가장 일반적인 마운트 포인트(물론 주석 처리됨)가 포함되어 있으며, 파티션 구성에 맞도록 `fstab` 파일을 사용자 정의할 때 참고 자료로 활용할 수 있습니다.

udev는 `/sys/*` 및 `/proc/*` 내의 파일을 읽습니다. 해당 가상 파일시스템은 커널 구성 과정에서 활성화되고 시스템 시작 시 사용 가능하도록 설정되었는지 확인합니다. 또한, udev는 `/dev/pts` 를 자동으로 마운트하지 않는다는 점에 유의합니다. `xterm(1)` 같은 터미널 애플리케이션은 이를 마운트하지 않으면 제대로 작동하지 않습니다. `fstab` 파일에 다음과 같은 줄이 포함되어 있는지 **반드시** 확인하시기 바랍니다:

```
# <dev> <mountpoint> <type> <options>              <dump> <pass>
[..]
devpts  /dev/pts      devpts noexec,nosuid,gid=tty,mode=0620  0      0
```

`/etc/rc.conf` 파일을 편집해서 글꼴, 키보드, 시간대, 호스트명 및 서비스를 구성합니다. `/etc/rc.conf` 파일에 대한 자세한 내용은 “/etc/rc.conf의 구성 변수” 섹션을 참조합니다.

시스템용 로케일을 생성합니다. 자세한 내용은 “로케일 생성” 섹션을 참조합니다.

네트워크 설정(IP 주소/게이트웨이/호스트명/도메인/DNS)을 위해 `/etc/rc.d/net, /etc/hosts` 및 `/etc/resolv.conf` 파일을 편집합니다. 자세한 내용은 네트워크 구성 섹션을 참조합니다.

이제 `/usr/src/linux-6.12.23` 디렉터리로 이동해서 새로운 커널을 구성하고 컴파일합니다.

> [!NOTE]
> 루트 파일 시스템을 활성화하는 데 필요한 드라이버를 **반드시** 포함해야 합니다! `dracut` 으로 `initramfs` 를 생성하지 않는 한, 이 드라이버들은 커널 모듈이 아닌 내장형이라야 합니다. 커널 구성 시 “SCSI 디스크 지원”, “파티션 유형”, “디스크 컨트롤러” 라는 제목의 섹션을 찾아보시기 바랍니다. 
>
>  ```
> CONFIG_SATA_AHCI=y
> CONFIG_BLK_DEV_SD=y
> CONFIG_EXT4_FS=y
> ```


> [!NOTE]
> 설치 프로그램은 `/usr/src/linux-6.12.23/.config` 구성 파일을 설치합니다. 이 파일은 `CONFIG_DEVTMPFS` 같은 필요한 옵션이 모두 활성화되어 있으므로 커스텀 커널 설정의 좋은 시작점이 됩니다. 이 구성을 시작점으로 사용하려면 `make mrproper` 명령을 건너뛰거나, 먼저 `.config` 파일을 다른 디렉터리로 복사한 후 `make mrproper` 실행 후 다시 복사합니다. 새로 압축 해제한 커널 트리의 경우 `make mrproper` 는 반드시 필요한 작업이 아닙니다. 해당 디렉토리에 CRUX 설치 시도 시 생성된 잔여 파일이 없다면 이 과정은 생략해도 됩니다.

```
# cd /usr/src/linux-6.12.23
# make mrproper
# make menuconfig
# make all
# make modules_install
# cp arch/x86/boot/bzImage /boot/vmlinuz-6.12.23
# cp System.map /boot
```

> [!NOTE]
> `/boot` 는 GRUB이 커널 이미지를 검색할 기본 경로입니다. 커널이 EFI 스텁을 부트 로더로 사용할 경우, 커널을 좀 더 적절한 위치로 복사하도록 `cp` 명령어를 수정합니다. UEFI 시스템의 SYSLINUX 부트 로더 역시 저장된 커널에 대해 다른 위치를 요구합니다. 적절한 `cp` 명령어는 UEFI 부팅 모드의 SYSLINUX 문서를 참조합니다.

> [!NOTE]
> 사용자가 기여한 모듈식 커널 구성에 대한 예제 파일이 제공됩니다. 특정 하드웨어에 필요한 정확한 모듈 세트를 알려주는 커널로 부팅하거나, `make menuconfig` 단계의 인터페이스를 탐색하는 것이 너무 어렵게 느껴진다면 이 예제 파일을 활용합니다. 이 파일(`config-6.12.23-modular`)은 설치 미디어의 `/crux/kernel/contrib` 디렉터리에서 찾을 수 있습니다.


### 3.2.5. Install a Bootloader
커널을 EFI 스텁을 제공하도록 컴파일하지 않았거나 BIOS에서 UEFI 부팅 모드가 활성화되어 있지 않다면, 하드 디스크에 부트 로더를 설치해야 합니다. 다음은 부트 로더와 BIOS 설정의 네 가지 서로 다른 조합에 대한 간단한 지침이 제공됩니다. BIOS 구성 방식과 “직접 설정하는” 구성 파일의 중요도를 고려해서 다음 옵션 중 하나를 선택하시기 바랍니다. 구성 파일 수정보다 EFI 변수 수정이 좀 더 간편하다고 생각되시면 부록에 제시된 EFI 스텁 옵션을 참고합니다.

> [!NOTE]
> `LILO` 는 더 이상 공식 포트 컬렉션에서 유지 관리되지 않습니다. CRUX 3.6 이하 버전을 부팅하기 위해 LILO를 사용 중이라면, CRUX 3.8로 업그레이드할 때 부트 섹터를 GRUB 또는 SYSLINUX로 교체할 것을 권장합니다.

> [!NOTE]
> 다른 운영체제와의 듀얼 부팅은 본 핸드북에서 다루지 않습니다. 이런 설치에 관한 보다 포괄적인 자료는 SYSLINUX 위키나 GRUB 매뉴얼에서 확인할 수 있습니다.

#### Option 1: GRUB, in UEFI boot mode:
`grub-install /boot` 명령어(`/boot` 는 마운트된 ESP 파티션 위치로 대체)를 사용해서 EFI 시스템 파티션에 `grub2` 를 설치합니다. 패키지 선택 단계에서 `efibootmgr` 가 선택된 경우, `grub-install` 이 자동으로 부팅 항목을 생성하고 활성 상태로 설정합니다. 

`grub-mkconfig > /boot/grub/grub.cfg` 를 실행하거나 수동으로 구성 파일을 생성합니다.


#### Option 2: GRUB, in legacy (non-UEFI) boot mode:
`grub-install /dev/sd??` 명령어를 사용해서 `grub2` 를 마스터 부트 레코드(MBR)에 설치합니다. `/dev/sd??` 는 덮어쓸 장치의 실제 노드로 대체해야 합니다. 예를 들어, 첫 번째 SATA 디스크의 경우 `/dev/sda` 입니다.

`grub-mkconfig > /boot/grub/grub.cfg` 를 실행하거나 수동으로 구성 파일을 생성합니다.

`grub-mkconfig` 의 출력은 구성 파일 `/etc/default/grub` 에서 변수를 설정해서 변경할 수 있습니다. 이 파일은 기본적으로 생성되지 않으며 필수 사항은 아니지만, `grub.cfg` 파일을 수동으로 작성하지 않고도 비디오 해상도와 GRUB 메뉴 색상을 사용자 정의하는 데는 유용합니다. 자세한 내용은 [GRUB 매뉴얼](http://www.gnu.org/software/grub/manual/) 을 참조합니다.


#### Option 3: SYSLINUX, in UEFI boot mode:
`/usr/share/syslinux` 에 있는 부트 로더 코드를 마운트된 EFI 시스템 파티션, 특히 대부분의 UEFI 구현에서 기본적으로 검색하는 하위 디렉터리인 `EFI/BOOT` 로 복사합니다. (이 예시는 ESP가 `/boot` 에 마운트된 것으로 가정합니다)

```
# mkdir -p /boot/EFI/BOOT
# cd /boot/EFI/BOOT
# cp /usr/src/linux-6.12.23/arch/x86/boot/bzImage vmlinuz-6.12.23
# cp /usr/share/syslinux/efi64/ldlinux.e64 .
# cp /usr/share/syslinux/efi64/syslinux.efi BOOTX64.EFI
# cat <<EOF > syslinux.cfg
DEFAULT CRUX-3.8
PROMPT 1
TIMEOUT 10

LABEL CRUX-3.8
  SAY "Now booting into CRUX"
  KERNEL vmlinuz-6.12.23
  APPEND root=/dev/sda2 rw quiet

# End of config file
EOF
```

`syslinux.efi` 파일을 보다 일반적인 이름인 `BOOTX64.EFI` 로 저장하면 `efibootmgr` 를 사용해서 부팅 항목을 맞춤 설정하는 추가 단계를 생략할 수 있습니다. EFI 파티션에 다른 마운트 포인트를 선택한 경우 `mkdir` 및 `cd` 명령어를 적절히 사용해서 조정합니다(UEFI 자체는 `/etc/fstab` 에 지정한 마운트 포인트와 무관합니다).

SYSLINUX는 커널에 대한 상대 경로를 `syslinux.cfg` 파일 기준으로 해석하지만, 파일 시스템 경계를 넘어서 커널을 찾을 수는 없습니다. 따라서, 커널 빌드 단계의 `cp` 명령어는 SYSLINUX가 EFI 마운트 포인트 `/boot/efi` 에 설치된 경우는 적용되지 않으며, 위의 `cp` 명령어는 다른 대상 디렉터리가 나타납니다.


#### Option 4: SYSLINUX, in legacy (non-UEFI) boot mode:
vfat 또는 ext2/3/4 로 포맷된 파티션에 `syslinux` 디렉터리를 생성하고, 여기에 커널과 부트 로더를 배치합니다. `/boot` 가 부팅 가능으로 표시된 파티션에 있다고 가정하면 다음과 같이 수행할 수 있습니다:

```
# mkdir /boot/syslinux
# cd /boot/syslinux
# cp /usr/share/syslinux/ldlinux.c32 .
# extlinux --install /boot/syslinux
# [ -e ../vmlinuz-6.12.23 ] || cp /usr/src/linux-6.12.23/arch/x86/boot/bzImage ../vmlinuz-6.12.23
# cat <<EOF > syslinux.cfg
DEFAULT CRUX-3.8
PROMPT 1
TIMEOUT 10

LABEL CRUX-3.8
  SAY "Now booting into CRUX"
  KERNEL ../vmlinuz-6.12.23
  APPEND root=/dev/sda2 rw quiet

# End of config file
EOF
```

위의 명령어에서 `/boot/syslinux` 를 `/boot/EFI/BOOT` 로 대체하면 레거시 부팅 모드와 UEFI 부팅 모드 간의 전환이 용이해집니다.

SYSLINUX는 커널에 대한 상대 경로를 `syslinux.cfg` 파일 기준으로 해석하지만, 파일 시스템 경계를 넘어서 커널을 찾을 수는 없습니다. 전용 EFI 파티션이 없는 레거시 시스템은 커널 빌드 단계의 `cp` 명령어가 커널에 접근 가능한 경로에 배치해야 하므로, 커널이 이미 예상 위치에 복사된 경우 위의 `cp` 명령어를 실행할 필요는 없습니다.

마지막으로 마스터 부트 레코드(MBR) 내용을 파티션 유형에 맞는 바이너리 블롭(GPT/GUID 파티셔닝의 경우 `gptmbr.bin`, DOS 파티셔닝의 경우 `mbr.bin`)으로 덮어씁니다.

```
# PTYPE=$(fdisk -l /dev/sda | grep "^Disklabel type" | cut -d " " -f3)
# [ "$PTYPE" = "gpt" ] && BINBLOB=gptmbr.bin || BINBLOB=mbr.bin
# dd bs=440 count=1 conv=notrunc if=/usr/share/syslinux/$BINBLOB of=/dev/sda
```

UEFI 및 기타 부트 로더/매니저 옵션에 대한 자세한 내용은 [CRUX 위키](https://crux.nu/Wiki/UEFI) 에서 확인할 수 있습니다.

컴퓨터에서 CRUX 설치 매체를 제거하고 하드디스크에서 재부팅합니다.



<br><br>
# 4. Configuration
## 4.1. Initialization Scripts
### 4.1.1. Runlevels

CRUX는 다음과 같은 런레벨을 사용합니다(`/etc/inittab` 에 정의됨).

| Runlevel | Description |
| --- | --- |
| 0 | Halt |
| 1 (S) | Single-user Mode |
| 2 | Multi-user Mode |
| 3-5 | (Not used) |
| 6 | Reboot |


### 4.1.2. Layout
CRUX에서 사용하는 초기화 스크립트는 SysV 스타일과 다르게 BSD 스타일을 따르며 다음과 같은 구조를 가집니다.

| File | Description |
| --- | --- |
| /etc/rc | System boot script |
| /etc/rc.single | Single-user startup script |
| /etc/rc.modules | Module initialization script |
| /etc/rc.multi	 | Multi-user startup script |
| /etc/rc.local | Local multi-user startup script (empty by default) |
| /etc/rc.shutdown | System shutdown script |
| /etc/rc.conf | System configuration |
| /etc/rc.d/ | Service start/stop script directory |

필요에 따라 `/etc/rc.modules, /etc/rc.local` 및 `/etc/rc.conf` 파일을 수정합니다.


### 4.1.3. Configuration Variables in /etc/rc.conf
다음 구성 변수들은 `/etc/rc.conf` 에서 찾을 수 있습니다.

| Variable | Description | Example |
| --- | --- | --- |
| FONT | 시스템 시작 시 로드할 콘솔 글꼴을 지정합니다. 이 변수의 내용은 `setfont(1)` 의 인수로 전달됩니다. 사용 가능한 글꼴은 `/usr/share/kbd/consolefonts/` 에 위치합니다. | `FONT=default` |
| KEYMAP | 시스템 시작 시 로드할 콘솔 키보드 매핑을 지정합니다. 이 변수의 내용은 `loadkeys(1)` 의 인수로 전달됩니다. 사용 가능한 키보드 매핑은 `/usr/share/kbd/keymaps/` 에 위치합니다. | `KEYMAP=sv-latin1` |
| TIMEZONE | 시스템에서 사용할 시간대를 지정합니다. 사용 가능한 시간대 설명 파일은 `/usr/share/zoneinfo/` 에 위치합니다. | `TIMEZONE=Asia/Seoul' |
| HOSTNAME	| 호스트 이름을 설정합니다. | `HOSTNAME=pluto` |
| SYSLOG	 | 시스템 로그 데몬을 시작 시 실행하도록 지정합니다. | `SYSLOG=sysklogd` |
| SERVICES | 시스템 시작 시 실행할 서비스를 지정합니다. 이 배열에 명시된 서비스는 `/etc/rc.d/` 에 대응하는 시작/중지 스크립트가 있어야 합니다. 다중 사용자 모드로 진입할 때 지정된 스크립트는 start 인자와 함께 지정된 순서로 호출됩니다. 시스템 종료 시 또는 단일 사용자 모드로 진입할 때 이 스크립트들은 stop 인자와 함께 역순으로 호출됩니다. | `SERVICES=(crond lo net sshd)` |
| BLANKTIME | 화면이 자동으로 꺼지기까지의 비활성 시간 간격을 분 단위로 설정합니다. 기본값은 15분입니다. | `BLANKTIME=15` |
| USE_COLOR | 컬러 하이라이트를 출력하도록 설정합니다. 기본값은 false 입니다. | `USE_COLOR=true` |
| VERBOSE | rc 프로세스의 자세한 출력을 좀 더 많이 출력합니다. 기본값은 false 입니다. | `VERBOSE=true` |


## 4.2. Generating locales
CRUX 2.5부터 glibc 는 더 이상 모든 사용 가능한 로케일을 포함하지 않으므로, 필요한 로케일은 직접 생성해야 합니다. `pkgmk` 의 정상 작동을 보장하기 위해 CRUX 설치 과정에서 `C.UTF-8` 로케일이 자동 생성됩니다. 기타 필요한 로케일은 관리자가 직접 생성해야 합니다.

핵심 포트 glibc 는 구성 파일 `/etc/locale.gen` 을 기반으로 사용하기 원하는 로케일을 생성하는 스크립트를 제공하므로, 더 이상 `localedef` 를 수동으로 실행할 필요는 없습니다. 편집기로 `/etc/locale.gen` 파일을 열고 사용하기 원하는 로케일의 주석을 해제한 후 `/usr/sbin/locale-gen` 을 실행하면 됩니다. `/etc/pkgadd.conf` 에 적절한 `UPGRADE` 지시어를 설정하면, 선택한 로케일을 잃지 않고 나중에 glibc 를 안전하게 업그레이드할 수 있습니다. 단, `pkgadd -u` 실행 시 `/etc/locale.gen` 파일이 덮어쓰기되지 않도록 보호해야 합니다.


## 4.3. Network Configuration
네트워크 구성은 서비스 스크립트 `/etc/rc.d/net` 에서 찾을 수 있습니다. 이 서비스를 활성화하려면 `/etc/rc.conf` 의 `SERVICES` 배열에 `net` 을 추가해야 합니다. 기본적으로 이 서비스 스크립트는 동적 IP 주소를 구성합니다.

```
#!/bin/sh
#
# /etc/rc.d/net: start/stop network interface
#

# Connection type: "DHCP" or "static"
TYPE="DHCP"

# For "static" connections, specify your settings here:
# To see your available devices run "ip link".
DEV=enp11s0
ADDR=192.168.1.100
MASK=24
GW=192.168.1.1

# Optional settings:
DHCPOPTS="-h `/bin/hostname` -t 10"

case $1 in
        start)
                if [ "${TYPE}" = "DHCP" ]; then
                        /sbin/dhcpcd ${DHCPOPTS}
                else
                        /sbin/ip addr add ${ADDR}/${MASK} dev ${DEV} broadcast +
                        /sbin/ip link set ${DEV} up
                        /sbin/ip route add default via ${GW}
                fi
                ;;
        stop)
                if [ "${TYPE}" = "DHCP" ]; then
                        /sbin/dhcpcd -x
                else
                        /sbin/ip route del default
                        /sbin/ip link set ${DEV} down
                        /sbin/ip addr del ${ADDR}/${MASK} dev ${DEV}
                fi
                ;;
        restart)
                $0 stop
                $0 start
                ;;
        *)
                echo "Usage: $0 [start|stop|restart]"
                ;;
esac

# End of file
```

시스템을 고정 IP 주소로 구성하려면 `TYPE=static` 을 지정하고 올바른 인터페이스를 선택합니다. 또한, `/etc/resolv.conf` 에 DNS 설정을 구성해야 합니다.

```
#!/bin/sh
#
# /etc/rc.d/net: start/stop network interface
#

# Connection type: "DHCP" or "static"
TYPE="static"

# For "static" connections, specify your settings here:
# To see your available devices run "ip link".
DEV=enp11s0
ADDR=192.168.1.100
MASK=24
GW=192.168.1.1

# Optional settings:
DHCPOPTS="-h `/bin/hostname` -t 10"

case $1 in
        start)
                if [ "${TYPE}" == "DHCP" ]; then
                        /sbin/dhcpcd ${DHCPOPTS}
                else
                        /sbin/ip addr add ${ADDR}/${MASK} dev ${DEV} broadcast +
                        /sbin/ip link set ${DEV} up
                        /sbin/ip route add default via ${GW}
                fi
                ;;
        stop)
                if [ "${TYPE}" == "DHCP" ]; then
                        /sbin/dhcpcd -x
                else
                        /sbin/ip route del default
                        /sbin/ip link set ${DEV} down
                        /sbin/ip addr del ${ADDR}/${MASK} dev ${DEV}
                fi
                ;;
        restart)
                $0 stop
                $0 start
                ;;
        *)
                echo "Usage: $0 [start|stop|restart]"
                ;;
esac

# End of file
#
# /etc/resolv.conf: resolver configuration file
#

search <your internal domain>
nameserver <your DNS server>

# End of file
```

WPA2 로 보호된 무선 네트워크에 연결하려면 먼저 `wpa_supplicant` 가 사용할 구성 파일을 생성한 후 해당 인터페이스로 `wpa_supplicant` 를 실행해야 합니다.

```
# wpa_passphrase MYNETWORK MYPASS > /etc/wpa_supplicant-wlan0.conf
# wpa_supplicant -i wlan0 -c /etc/wpa_supplicant-wlan0.conf
```

_MYNETWORK_ 를 네트워크 SSID로, _MYPASS_ 를 해당 암호로, _wlan0_ 을 실제 네트워크 인터페이스 이름으로 교체합니다. 사용 가능한 모든 인터페이스 목록을 보려면 `ip link` 명령을 실행합니다.

`wpa_supplicant` 출력에 "인증 성공" 이 표시되면 프로세스를 백그라운드로 전환하고 `dhcpcd wlan0` 을 실행해서 DHCP 서버로부터 주소를 요청할 수 있습니다.

`wpa_supplicant` 패키지는 `/etc/rc.d` 에 두 개의 시작 스크립트를 제공합니다. `/etc/rc.conf` 의 `SERVICES` 배열에 `wlan` 을 추가(`net` 을 대체)해서 `wpa_supplicant` 가 모든 네트워크 인터페이스를 관리하도록 설정할 수 있습니다. 또 다른 옵션은 `/usr/share/dhcpcd/hooks/10-wpa_supplicant` 예제 파일을 `/lib/dhcpcd/dhcpcd-hooks/` 에 복사해서 `net` 시작 스크립트가 필요할 때 `wpa_supplicant` 를 호출하도록 처리하는 것입니다.


## 4.4. Passwords and User Environment
CRUX는 기본적으로 SHA512 암호화를 사용합니다. 암호화 방식을 변경하려면 `/etc/login.defs` 파일에서 `ENCRYPT_METHOD` 변수를 `DES, MD5` 또는 `SHA256` 으로 설정합니다.

또한, `crypt(3)` 함수를 사용해서 사용자를 인증하는 프로그램을 컴파일할 때는 해당 프로그램이 `libcrypt` 라이브러리에 링크되야 합니다(즉, 링크 시 `-lcrypt` 옵션을 사용). 이 라이브러리는 SHA512 버전의 `crypt` 함수를 포함합니다(이 버전은 하위 호환성이 있으므로 DES 암호도 인식합니다).

`/etc/login.defs` 에서 사용자 추가(`useradd(8)`) 시 비-루트 사용자 생성 방식을 제어하는 설정(예: `CREATE_HOME, USERGROUPS_ENAB`)도 구성 가능합니다. CRUX를 처음 사용하는 관리자는 `useradd -m` 명령으로 새로운 사용자를 생성할 때 기본 쉘 시작 파일이 홈 디렉터리에 자동으로 생성되지 않는다는 점에 놀랄 수 있습니다. 이는 `/etc/skel/` 디렉터리에 초기 홈 디렉터리 구성 요소를 포함하는 다른 리눅스 배포판과 다릅니다!!

CRUX 3.7부터 `/etc/profile` 에 의존해서 `PATH` 를 설정하는 쉘은 UID 와 무관하게 모두 동일한 값을 이 변수에 할당합니다. 이런 변경으로 비-루트 사용자는 전체 경로를 입력하지 않고도 모든 관리 명령에 쉽게 접근할 수 있습니다(bash를 쉘로 사용하고 적절한 `doas/sudo` 권한이 부여된 경우). 사용자는 언제든지 다른 쉘을 선택하고 `PATH` 를 직접 관리할 수 있지만, 이제 기본 동작으로 이러한 혼란을 유발시킬 가능성은 줄었습니다.

핵심 패키지인 `linux-pam` 과 `dumb_runtime_dir` 은 로그인 시 로드할 수 있는 다양한 모듈을 제공합니다. `/etc/pam.d` 디렉터리의 파일들은 로그인 유형(예: tty, SSH, su, X 디스플레이 관리자)과 로드되는 모듈(예: pam_env, pam_exec, pam_limits) 간의 연관성을 제어합니다. PAM 모듈로 깔끔하게 처리할 수 있는 몇 가지 일반적인 상황은 다음 표에 나열되어 있습니다.

`/etc/pam.d` 디렉터리의 파일    일반적인 사용법

| 파일 이름 | 설명 |
| --- | --- |
| pam_dumb_runtime_dir.so | freedesktop.org 사양을 준수하는 애플리케이션을 위한 `XDG_RUNTIME_DIR` 생성합니다 |
| pam_env.so | 사용자가 선택한 로그인 쉘과 무관하게 일부 공통 환경 변수를 내보냅니다 |
| pam_limits.so | 일부 게임의 정상 작동을 보장하기 위해 허용된 열려 있는 파일 수를 증가시킵니다 |
| pam_xauth.so | `su` 로 호출된 프로그램이 정상 작동할 수 있도록 로그인한 사용자의 X 디스플레이에 다른 사용자의 접근을 허용합니다 |
| pam_mount.so | 인증 성공 후 LUKS로 암호화된 홈 파티션을 자동으로 마운트합니다 |

> [!NOTE]
많은 데스크톱 애플리케이션의 정상적인 작동을 위해 쓰기 가능한 `XDG_RUNTIME_DIR` 의 존재가 필요합니다. CRUX 3.8 클린 설치 시 `/etc/pam.d/common-session` 에 `pam_dumb_runtime_dir.so` 모듈을 로드하는 줄이 추가되어 있으므로 이런 요구 사항을 충족시킵니다.

상기 표의 상황 중 하나에 해당한다면, 원하는 구성을 달성하는 방법을 알아보기 위해 해당 PAM 모듈의 매뉴얼 페이지를 참조합니다.


## 4.5. Upgrading the Kernel
커널 소스(`/usr/src/linux-6.12.23/` 위치)는 `pkgadd` 를 통해 설치되지 않습니다. 커널 업그레이드를 결정한 경우, 커널 소스를 새로운 버전으로 수동으로 교체해서(또는 새로운 소스 트리를 다른 위치에 압축 해제) 진행할 수 있습니다. 이 작업은 패키지 데이터베이스의 불일치를 유발하지 않습니다(`pkgadd` 로 설치되지 않음). 또한 `/usr/include/linux` 및 `/usr/include/asm` 에 포함된 커널 헤더에 영향을 미치지 않습니다. 해당 헤더들은 커널 소스의 심볼릭 링크가 아닌, 헤더 파일의 복사본을 포함하기 때문입니다.



<br><br>
# 5. The Package System
## 5.1. Introduction
패키지 시스템(`pkgutils`)은 단순성을 염두에 두고 설계되었으며, 모든 패키지는 순수한 tar.gz 파일(즉, 어떠한 메타데이터도 포함하지 않음)로 구성됩니다. CRUX를 처음 사용하는 사용자는 설치 중 설정 스크립트의 진행 보고서에 패키지 파일명이 표시되는 것을 이미 보셨을 겁니다. 이러한 패키지는 ISO에 포함되어 제공되지만, 직접 패키지를 빌드할 수 있습니다.

패키지 명명 규칙은 `<이름>#<버전>-<릴리스>.pkg.tar.gz` 형식을 따릅니다. 여기서 `<이름>` 은 프로그램 이름, `<버전>` 은 프로그램 버전 번호, `<릴리스>` 는 패키지 버전 번호를 의미합니다.

`pkg.tar.gz` 확장자는 (단순한 tar.gz 대신) 이 파일이 일반적인 tar.gz 파일이 아니라 `pkgadd` 를 사용해서 설치하도록 의도된 tar.gz 임을 나타내기 위해 사용됩니다. 이는 다른 tar.gz 파일과 구분하는 데도 도움이 됩니다. 현재 `pkgmk` 는 bzip2, lzip, xz, zstd 같은 추가적인 압축 방식을 지원합니다(각각 tar.bz2, tar.lz, tar.xz, tar.zst 확장자를 사용).

`pkgadd(8), pkgrm(8), pkginfo(8), pkgmk(8)` 은 패키지 관리 전용 유틸리티입니다. 이 유틸리티를 사용하면 패키지를 설치, 제거, 검사하거나 패키지를 생성할 수 있으며 패키지 데이터베이스를 조회할 수 있습니다.

`pkgadd` 를 사용해서 패키지를 설치하면 패키지 데이터베이스(`/var/lib/pkg/db` 에 저장됨)에 새로운 레코드가 추가됩니다. 기본적으로 패키지 시스템은 어떠한 종류의 종속성 검사도 수행하지 않으므로, 다른 패키지의 라이브러리나 헤더를 필요로 하는 패키지를 빌드해도 경고하지 않습니다. 따라서, 오류가 발생해서 `pkgmk` 빌드 기능이 종료될 때만 실수가 드러납니다. 그러나, 포함된 `prt-get` 도구는 단순히 `prt-get install` 대신 `prt-get depinst` 로 호출하면 의존성을 해결하도록 지시할 수 있습니다.

다음 섹션에서 패키지 유틸리티 사용법에 대해 간략히 설명합니다. 해당 유틸리티에 대한 추가 정보는 각 매뉴얼 페이지에서 확인할 수 있습니다.


## 5.2. Using the Package System
### 5.2.1. Installing a Package
패키지 설치는 `pkgadd` 를 사용해서 수행합니다. 이 유틸리티는 최소한 하나의 인자, 즉 설치할 패키지 이름을 요구합니다.

```
$ pkgadd bash#5.2.37-1.pkg.tar.gz
```

패키지를 설치할 때 패키지 관리자는 기존 파일을 덮어쓰지 않도록 보장합니다. 만약, 충돌이 발견되면 오류 메시지가 출력되고 `pkgadd` 는 패키지 설치 없이 중단됩니다. 오류 메시지에는 충돌한 파일 이름을 포함합니다. 

```
$ pkgadd bash#5.2.37-1.pkg.tar.gz
bin/sh
usr/man/man1/sh.1.gz
pkgadd error: listed file(s) already installed (use -f to ignore and overwrite)
```

기존 디렉토리는 오류 메시지가 발생하지 않습니다. 패키지 데이터베이스는 하나의 디렉토리가 여러 패키지와 연관될 수 있도록 허용하기 때문입니다. 그러나, 기존 디렉토리의 소유자/그룹 및 권한은 요청된 패키지의 설정과 일치하도록 변경되지 않습니다.

충돌하는 파일이 보고될 때 설치를 강제로 진행하려면 `-f` (또는 `--force`) 옵션을 사용할 수 있습니다. 

```
$ pkgadd -f bash#5.2.37-1.pkg.tar.gz
```

패키지 시스템은 파일이 정확히 하나의 패키지만 소유될 수 있도록 처리합니다. 강제 설치를 수행할 경우 충돌하는 파일의 소유권은 현재 설치 중인 패키지로 이전됩니다.

> [!CAUTION]
> 강제로 설치한다는 것은 자신이 정말 무엇을 처리하는지 모르는 한 좋은 생각이 아닙니다. 패키지가 이미 설치된 파일과 충돌할 경우, 해당 패키지가 손상되어 예상치 못한 파일을 설치할 수 있다는 신호일 수 있습니다. 따라서, 이 옵션을 사용할 때는 극도로 주의해야 하며, 가능하면 아예 사용하지 않는 것이 좋습니다.

앞서 언급한 것 같이, 패키지 파일 자체는 어떤 메타데이터도 포함되지 않습니다. 대신 패키지 관리자는 패키지 파일명으로 패키지 이름과 버전을 결정합니다. 따라서, `bash#5.2.37-1.pkg.tar.gz` 라는 이름의 패키지 파일을 설치할 때, 패키지 관리자는 이를 버전 5.2.37-1 의 bash 라는 이름의 패키지로 해석합니다. `pkgadd` 가 파일 이름을 해석할 수 없는 경우(예: `#` 이 누락되거나 파일 이름이 `.pkg.tar.gz` 로 끝나지 않음), 오류 메시지가 출력되고 `pkgadd` 는 패키지를 설치하지 않은 채로 중단합니다.


### 5.2.2. Upgrading a Package
패키지 업그레이드는 `pkgadd` 명령어에 `-u` 옵션을 사용해서 수행합니다. 

```
$ pkgadd -u bash#5.2.37-1.pkg.tar.gz
```

이 명령은 기존에 설치된 bash 패키지를 새로운 패키지로 교체합니다. 이전에 bash를 설치한 적이 없다면 `pkgadd` 는 오류 메시지를 출력합니다. 패키지 시스템은 패키지의 버전 번호를 전혀 고려하지 않으므로 버전 5.2.37-1 을 버전 5.2.35-1(또는 심지어 버전 5.2.37-1 자체)로 “업그레이드” 할 수 있습니다. 설치된 패키지는 지정된 패키지로 대체됩니다.

패키지 업그레이드는 단순히 `pkgrm` 을 실행한 후 `pkgadd` 를 실행하는 과정이 아닙니다. 이미 설치된 패키지가 소유한 config 및 log 파일의 사용자 설정을 보존해야 하기 때문입니다. 따라서, `pkgadd -u` 는 파일 시스템과 패키지 데이터베이스에 업그레이드 전용 검사를 수행해서 “유지 목록” (모든 `pkgadd` 작업에 초기화되는 “비설치 목록” 에 추가됨)을 구성합니다. 두 목록의 구성은 `/etc/pkgadd.conf` 파일에 의해 제어됩니다.

`/etc/pkgadd.conf` 는 패키지 설치 또는 업그레이드 시 `pkgadd` 의 동작 방식을 정의하는 규칙을 포함할 수 있습니다. 이 규칙은 "이벤트, 패턴, 액션" 이라는 세 가지 요소로 구성됩니다. 

- "이벤트" 는 이 규칙이 적용될 작업 유형(`INSTALL` 또는 `UPGRADE`)을 명시합니다. 

- "패턴" 은 정규 표현식으로 표현된 파일명에 대한 패턴이며, `INSTALL` 또는 `UPGRADE` 이벤트에 적용 가능한 "액션" 은 `YES` 또는 `NO` 입니다. 동일한 이벤트 유형의 규칙을 여러 개 정의할 수 있으며, 이 경우 첫 번째 규칙이 가장 낮은 우선순위를, 마지막 규칙이 가장 높은 우선순위를 가집니다.

```
# 
# /etc/pkgadd.conf: pkgadd(8) configuration
#

UPGRADE         ^etc/.*$                NO
UPGRADE         ^var/log/.*$            NO
UPGRADE         ^etc/X11/.*$            YES
UPGRADE         ^etc/X11/xorg.conf$     NO

# End of file
```

위의 예는 `pkgadd` 가 `/etc/` 또는 `/var/log/` (하위 디렉터리 포함) 내의 어떤 것도 업그레이드하지 않도록 처리합니다. 단, `/etc/X11/` (하위 디렉터리 포함) 내의 파일은 예외이며, `fn%/etc/X11/xorg.conf` 파일의 경우만 업그레이드됩니다. 기본 규칙은 모든 것을 설치하고 업그레이드하는 것이며, 이 파일의 규칙들은 해당 규칙에 대한 예외 사항 목록입니다.


> [!NOTE]
> "패턴" 은 디스크상의 파일이 아닌 패키지 내의 파일을 참조하므로 시작 부분에 “/” 를 포함해서는 절대 안 됩니다.

`pkgadd` 가 특정 파일을 업그레이드하지 않아야 한다고 판단하면 해당 파일은 `/var/lib/pkg/rejected/` 에 설치합니다. 이 디렉토리의 파일은 패키지 데이터베이스에 추가되지 않습니다. 사용자는 해당 파일을 자유롭게 검토, 사용 또는 수동으로 제거할 수 있습니다. 또 다른 방법은 `rejmerge` 를 사용하는 것입니다. `rejmerge` 는 `/var/lib/pkg/rejected/` 에서 발견된 각각의 거부된 파일에 설치된 버전과 거부된 버전의 차이점을 표시합니다. 사용자는 설치된 버전을 유지하거나, 거부된 버전으로 업그레이드하거나, 두 버전을 병합할 수 있습니다. (위의 `/etc/pkgadd.conf` 사용):

```
 $ pkgadd -u ports#1.6-4.pkg.tar.gz
 pkgadd: rejecting etc/ports/compat-32.pub, keeping existing version
 pkgadd: rejecting etc/ports/compat-32.rsync.inactive, keeping existing version
 pkgadd: rejecting etc/ports/contrib.pub, keeping existing version
 pkgadd: rejecting etc/ports/contrib.rsync.inactive, keeping existing version
 pkgadd: rejecting etc/ports/core.pub, keeping existing version
 pkgadd: rejecting etc/ports/core.rsync, keeping existing version
 pkgadd: rejecting etc/ports/opt.pub, keeping existing version
 pkgadd: rejecting etc/ports/opt.rsync, keeping existing version
 pkgadd: rejecting etc/ports/xorg.pub, keeping existing version
 pkgadd: rejecting etc/ports/xorg.rsync, keeping existing version

 $ tree -L 3 /var/lib/pkg/rejected/
 /var/lib/pkg/rejected
   etc
      ports
         compat-32.pub
         compat-32.rsync.inactive
         contrib.pub
         contrib.rsync.inactive
         core.pub
         core.rsync
         drivers
         opt.pub
         opt.rsync
         xorg.pub
         xorg.rsync
```

`pkgadd.conf` 파일이 CRUX 3.7에서 3.8로 업그레이드할 동안 존재했고, `/var/lib/pkg/rejected/` 의 내용을 확인하지 않았다면(수동으로 또는 `rejmerge` 실행을 통해), `ports -u` 명령은 포트 트리를 구버전 브랜치와 동기화할 것입니다! 따라서, `pkgadd` 가 보고하는 경고와 오류에 항상 주의를 기울여야 합니다.


### 5.2.3. Removing a Package
패키지 제거는 `pkgrm` 을 사용해서 수행합니다. 이 유틸리티는 제거하려는 패키지의 이름이라는 하나의 인수를 필요로 합니다. 

```
$ pkgrm bash
```

> [!CAUTION]
> 이 작업은 패키지가 소유한 모든 파일을 묻지도 않고 제거합니다. 실행하기 전에 신중히 생각하고, 패키지 이름을 잘못 입력하지 않았는지 반드시 확인해야 합니다. 잘못 입력하면 완전히 다른 것이 제거될 수 있습니다(예: glib 를 glibc 로 잘못 입력했을 때 어떤 일이 발생할지 생각해 보시기 바랍니다).


### 5.2.4. Querying the Package Database
패키지 데이터베이스 조회는 `pkginfo` 를 사용해서 수행됩니다. 이 유틸리티는 다양한 질의에 응답하기 위한 몇 가지 옵션을 제공합니다.

|Option |	Description |
| -i, --installed | 현재 설치된 패키지와 버전을 나열합니다. |
| -o, --owner pattern | 패턴과 일치하는 파일의 소유자를 나열합니다.  |
| -l, --list package|file | 지정된 패키지가 소유하거나 파일에 포함된 파일을 나열합니다. |
| -f <package>	 | 지정된 패키지의 설치 공간을 표시합니다. 기본적으로 `-l <패키지>` 와 동일하지만 소유자/그룹 및 권한 정보가 포함됩니다. |

```
$ pkginfo -i
acl 2.3.2-1
alsa-lib 1.2.13-1
alsa-utils 1.2.13-1
...
zip 3.0-2
zlib 1.3.1-1
zstd 1.5.6-1

$ pkginfo -l bash
bin/
bin/bash
bin/sh
etc/
etc/profile
usr/
usr/man/
usr/man/man1/
usr/man/man1/bash.1.gz
usr/man/man1/sh.1.gz

$ pkginfo -l grep#3.11-1.pkg.tar.gz
usr/
usr/bin/
usr/bin/egrep
usr/bin/fgrep
usr/bin/grep
usr/man/
usr/man/man1/
usr/man/man1/egrep.1.gz
usr/man/man1/fgrep.1.gz
usr/man/man1/grep.1.gz

$ pkginfo -o bin/ls
e2fsprogs  usr/bin/lsattr
fileutils  bin/ls
modutils   sbin/lsmod
```
 
## 5.3. Creating Packages
패키지 생성은 `pkgmk` 를 사용해서 수행됩니다. 이 유틸리티는 `Pkgfile` 이라는 파일을 사용하며, 이 파일에 패키지에 대한 정보(이름, 버전 등)와 해당 패키지를 컴파일하기 위해 실행할 명령어가 포함되어 있습니다.

좀 더 구체적으로 말하면, `Pkgfile` 파일은 실제로 여러 변수(이름, 버전, 릴리스, 소스)와 함수(빌드)를 정의하는 bash(1) 스크립트입니다. 

다음은 `Pkgfile` 파일의 예입니다. 이 예는 grep(1) 유틸리티를 패키징하는 방법을 보여줍니다. 설명을 위해 일부 주석이 삽입되어 있습니다.

```
# Specify the name of the package.
name=grep

# Specify the version of the package.
version=3.11

# Specify the package release.
release=1

# The source(s) used to build this package.
source=(ftp://ftp.ibiblio.org/pub/gnu/$name/$name-$version.tar.gz)

# The build() function below will be called by pkgmk when
# the listed source files have been unpacked.
build() {
   # The first thing we do is to cd into the source directory.
   cd $name-$version

   # Run the configure script with desired arguments.
   # In this case we want to put grep under /usr/bin and
   # disable national language support.
   ./configure --prefix=/usr --disable-nls

   # Compile.
   make

   # Install the files, BUT do not install it under /usr, instead
   # we redirect all the files to $PKG/usr by setting the DESTDIR
   # variable. The $PKG variable points to a temporary directory
   # which will later be made into a tar.gz-file. Note that the
   # DESTDIR variable is not used by all Makefiles, some use prefix
   # and others use ROOT, etc. You have to inspect the Makefile in
   # question to find out. Some Makefiles do not support redirection
   # at all. In those cases you will have to create a patch for it.
   make DESTDIR=$PKG install

   # Remove unwanted files, in this case the info-pages.
   rm -rf $PKG/usr/info
}
```

실제로는 모든 주석을 포함하지 않으므로, `grep(1)` 의 실제 `Pkgfile` 파일은 다음과 같습니다:

```
# Description: GNU grep, egrep and fgrep
# URL:         http://www.gnu.org/software/grep/grep.html
# Maintainer:  Per Lid&#65533;n, per at fukt dot bth dot se

name=grep
version=3.11
release=1
source=(ftp://ftp.ibiblio.org/pub/gnu/$name/$name-$version.tar.gz)

build() {
  cd $name-$version
  ./configure --prefix=/usr --disable-nls
  make
  make DESTDIR=$PKG install
  rm -rf $PKG/usr/info
}
```

> [!NOTE]
> 위 예제의 `build()` 함수는 `grep` 이 빌드되는 방식에 대한 예시일 뿐입니다. 프로그램이 다른 방식으로 빌드될 경우(예: `autoconf` 를 사용하지 않는 경우) 함수의 내용은 달라질 수 있습니다.

`build()` 함수가 실행되면 `$PKG` 디렉터리가 `<name>#<version>-<release>.pkg.tar.gz` 라는 이름의 패키지로 생성됩니다. 패키지 생성이 완료되기 전에 `pkgmk` 는 패키지 내용을 `.footprint` 파일과 비교해서 검사합니다. 이 파일이 존재하지 않으면 새로 생성되며 검사 과정은 건너뜁니다. `.footprint` 파일은 빌드가 성공했을 경우 패키지에 포함될 모든 파일 목록이나, (`$PKG` 에 이미 설치된 파일 목록이 `.footprint` 에 존재하지 않는 경우) `$PKG` 에 설치된 모든 파일 목록이 포함됩니다. 불일치가 발생하면 테스트는 실패하고 오류 메시지를 출력합니다. 하지만, `.footprint` 파일을 수동으로 작성해서는 안 됩니다. 대신 패키지가 업그레이드되어 `.footprint` 파일 내용을 업데이트할 때는 단순히 `pkgmk -uf` 를 실행하면 됩니다. 이 테스트는 패키지 재빌드가 예상대로 완료되었는지 확인합니다.

패키지가 오류 없이 빌드되면 `pkgadd` 를 사용해서 설치하고 테스트해 볼 차례입니다. 다른 패키지의 `Pkgfile` 을 살펴보는 것을 적극 권장합니다. 예를 살펴보는 것이 학습에선 매우 효과적인 방법이기 때문입니다.


> [!NOTE]
> `Pkgfile` 변수(name, version, release, build) 및 설치 공간에 관한 추가 지침은 `Pkgfile(5)` 매뉴얼 페이지를 참조합니다.


## 5.4. Adjusting/Configuring the Package Build Process
패키지 빌드 프로세스와 관련된 많은 설정은 `pkgmk(8)` 구성 파일 `/etc/pkgmk.conf` 를 편집해서 조정할 수 있습니다. 구성 가능한 설정 중 일부는 다음과 같습니다:

| 설정값 | 설명 |
| --- | --- |
| CFLAGS, CXXFLAGS | 패키지 컴파일을 위한 최적화 및 아키텍처 옵션을 제어합니다. 절대적으로 무엇을 처리하는지 알지 못하는 한 변경하지 않는 것이 좋습니다! |
| PKGMK_SOURCE_MIRRORS | `pkgmk` 가 소스 아카이브를 가져오려고 시도할 위치를 정의합니다. 이 배열에 CRUX 팀이 관리하는 미러만 포함된 경우, 개인 소스 컬렉션에서 포트를 빌드하면 모든 미러를 전부 시도할 때까지 "404 Not Found" 오류가 발생할 수 있으며, 이후 `Pkgfile` 에 정의된 소스를 시도합니다. |
| PKGMK_SOURCE_DIR | `pkgmk` 가 빌드 시 소스 아카이브를 저장(다운로드 시)하고 사용할 위치를 정의합니다. |
| PKGMK_PACKAGE_DIR | 빌드 프로세스가 완료된 후 `pkgmk` 가 패키지 파일을 생성할 위치를 정의합니다. |
| PKGMK_WORK_DIR | `pkgmk` 가 패키지를 빌드하는 데 사용할 작업 영역을 정의합니다. |

몇 가지 예는 다음과 같습니다:

| 설정값 | 설명 |
| --- | --- |
| PKGMK_SOURCE_MIRRORS=(http://fileserver.intranet/crux/sources/) | `pkgmk` 가 `Pkgfile` 에 지정된 소스 URL로 전환하기 전에 `http://fileserver.intranet/crux/sources/` 에서 모든 소스 아카이브를 가져오도록 지시합니다. 여러 URL을 공백으로 구분할 수 있습니다. |
| PKGMK_SOURCE_DIR=“/usr/ports/srcfiles” | `pkgmk` 가 소스 아카이브를 `/usr/ports/srcfiles` 에 저장하고 찾도록 지시합니다. 이 설정의 장점 중 하나는 로컬 네트워크의 NFS 서버에 `/usr/ports/srcfiles` 를 저장해서 여러 Crux 설치 환경에 사용할 수 있다는 점입니다. (PKGMK_PACKAGE_DIR도 동일한 방식으로 설정 및 사용 가능합니다. 하지만, 로컬 네트워크에서 NFS 설정이 너무 까다롭고 http 서버 구성이 더 쉽다면, opt 컬렉션의 `pkg-get` 을 사용해서 빌드된 패키지를 공유하는 대체 메커니즘을 활용할 수 있습니다.) |
| PKGMK_WORK_DIR="/usr/ports/work/$name" | `pkgmk` 가 지정된 패키지 빌드 작업 영역으로 `/usr/ports/work/$name` 을 사용하도록 지시합니다. `grep` 패키지를 빌드하면 작업 영역이 `/usr/ports/work/grep` 이 됩니다. 작업 디렉터리로 `tmpfs` 를 사용하는 것도 대안일 수 있습니다. |

`pkgmk.conf` 매뉴얼 페이지에 좀 더 많은 설정 항목을 확인할 수 있습니다.


## 5.5. Package Guidelines
### 5.5.1. General
패키지 이름은 항상 소문자로 표기합니다(예: `name=eterm 이며 name=Eterm` 이 아님). 해당 패키지가 CRUX 포트 시스템에 추가될 경우, 포트 구조 내의 디렉터리 이름도 정확히 동일한 이름을 사용해야 합니다. 즉, `/usr/ports/???/eterm` 형식입니다. 여러 개의 별도로 배포되는 프로그램/라이브러리를 하나의 패키지로 통합하지 마시기 바랍니다. 대신 여러 개의 패키지를 생성합니다. 빌드 함수는 작업 디렉터리 외부에 절대 접근해서는 안 되며, 이상적으로는 인터넷 연결(예: 소스 배열에 나열되지 않은 소스 다운로드)에 의존하지 않아야 합니다. 현재 `pkgmk` 는 소스 배열 내의 git URL을 인식하지 않지만, 이 기능을 추가하기 위한 작업이 현재 진행 중입니다. 이를 통해 최신 git 소스 트리를 얻기 위해 인터넷에 접근하는 빌드 함수를 작성하려는 유혹을 제거할 수 있습니다.

소스 무결성 검증(signify)을 위한 일관된 메커니즘을 보장하는 것 외에도, '다운로드' 와 '빌드' 를 분리하는 정책은 간헐적인 인터넷 접속이 가능한 사용자가 모든 구식 패키지의 디렉터리에서 `pkgmk -do` 를 실행한 후 오프라인 상태로 전환해서 `sysup` 작업을 완료할 수 있도록 처리합니다. 러스트와 파이썬이 채택한 언어별 툴체인(각각 `cargo` 와 `pip`)은 이런 정책의 시행을 더욱 더 어렵게 만들고 있습니다. CRUX `pkgutils` 를 포기하고 N개의 언어 생태계가 각각의 소프트웨어를 별도 하위 디렉터리(python의 `~/.local/share/virtualenv` 나 rust의 `~/.cargo` 등)에서 관리하도록 허용할 수 있습니다. 다만 이 경우 CRUX `pkgutils` 하나의 관리 도구 세트 대신 N+1개의 관리 도구 세트를 익혀야 한다는 대가를 치러야 합니다. 공식 저장소에 등장하는 모든 언어별 프로젝트는 소프트웨어 개발 트렌드가 이 모델에서 멀어지는 상황 속에서도, CRUX 팀이 역사적인 소프트웨어 배포 방식을 유지하기 위해 고군분투한 노력의 결과물입니다.


### 5.5.2. Directories
일반적으로 패키지는 파일을 다음과 같은 디렉터리에 설치합니다. 물론 타당한 이유가 있다면 예외도 허용됩니다. 그러나, 가능한 한 다음과 같은 디렉터리 구조를 따르도록 노력하시기 바랍니다.

| 디렉토리 | 설명 |
| --- | --- |
| /usr/bin/ | 사용자 명령어/애플리케이션 바이너리 |
| /usr/sbin/ | 시스템 바이너리 (예: 데몬) |
| /usr/lib/ | 라이브러리 |
| /usr/include/ | 헤더 파일 |
| /usr/lib/<prog>/ | 플러그인, 애드온 및 기타 |
| /usr/share/man/ | Man 페이지 |
| /usr/share/<prog>/ | 데이터 파일 |
| /usr/etc/<prog>/ | 설정 파일 | 
| /etc/ | 시스템 소프트웨어(데몬 등)용 설정 파일 |

- `/opt` 디렉토리는 수동으로 컴파일/설치된 애플리케이션을 위해 예약됩니다. 패키지는 절대 여기에 아무것도 설치해서는 안 됩니다.
- `/usr/libexec/` 디렉토리는 CRUX에서 사용하지 않으므로 패키지는 절대 여기에 아무것도 설치해서는 안 됩니다. 대신 `/usr/lib/<프로그램명>/` 을 사용합니다.


### 5.5.3. Remove Junk Files
패키지는 “쓰레기 파일” 이 포함되면 안 됩니다. 여기는 매뉴얼 페이지를 제외한 정보 페이지 및 기타 온라인 문서가 포함됩니다(예: `usr/doc/*, README, *.info, *.html` 등).

NLS(국가 언어 지원) 관련 파일. GNU `autoconf` 로 빌드된 포트는 `--disable-nls` 옵션을 전달해서 이런 파일을 설치하지 않도록 지시할 수 있습니다. 다른 컴파일러 툴체인은 종종 이러한 옵션을 제공하지 않으므로, 패키지 설치 흔적을 수동으로 정리해야 합니다. 쓸모없거나 구식 바이너리(예: /usr/games/banner 및 /sbin/mkfs.minix).


### 5.5.4. Pkgfile Variables
`Pkgfile` 에 새로운 변수를 추가하지 않아야 합니다. 극히 드문 경우를 제외하고는 실제로 패키지의 가독성이나 품질을 향상시키지 않습니다. 또한, 향후 `pkgmk` 버전에서도 작동이 보장되는 변수는 `name, version, release, source` 뿐입니다. 다른 이름은 `pkgmk` 의 내부 변수와 충돌할 수 있습니다.

패키지를 업데이트/유지 관리하기 쉽게 하려면 `$name` 및 `$version` 변수를 사용합니다. 예를 들어, `source=(http://xyz.org/$name-$version.tar.gz)` 는 `source=(http://xyz.org/myprog-1.0.3.tar.gz)` 보다 훨씬 더 낫습니다. `$version` 변수만 수정하면 URL이 자동으로 업데이트되기 때문입니다.

`source` 는 "배열" 임을 기억합니다. 즉, 항상 `source=(...)` 를 사용하고 `source=...` 는 사용하지 마시기 바랍니다.

`pkgmk` 가 정의된 경우 활용하는 또 다른 배열은 `renames` 입니다(CRUX 3.7에서 도입됨). 이 배열을 사용하면 다운로드된 소스 타르볼을 좀 더 설명적인 파일명으로 저장할 수 있으므로, 다운로드용 공유 디렉터리를 사용할 때 파일명 충돌을 피할 수 있습니다. 자세한 내용은 `Pkgfile` 매뉴얼 페이지를 참조합니다.


### 5.5.5. Pkgfile Header
`Pkgfile` 파일 시작 부분의 주석 처리된 줄은 `pkgmk` 의 작동에는 영향을 미치진 않지만, `prt-get` 및 기타 CRUX 도구는 여기에 제공된 정보를 활용합니다. 가장 중요한 네 가지 헤더는 다음과 같습니다:


| 이름 | 의미 |
| --- | --- |
| Description | 패키지에 대한 간략한 설명; 사실에 기반해서 작성합니다|
| Maintainer | 본인의 성명과 이메일 주소(원하면 가립니다)|
| URL | 이 소프트웨어 패키지에 대한 자세한 정보가 담긴 웹 페이지 주소 |
| Depends on | 공백 또는 쉼표로 구분된 종속성 목록 |

의존성이 없는 경우 depends on 을 생략할 수 있습니다. 이 줄을 간결하게 유지하기 위해 ‘core’ 컬렉션의 런타임 의존성은 생략됩니다. 단, 빌드된 프로그램에 동적으로 링크되는 라이브러리를 제공하는 경우는 예외입니다. 자세한 내용은 `Pkgfile` 매뉴얼 페이지를 참조합니다.

`Pkgfile` 를 검토할 때 자주 접하게 되는 다른 두 가지 헤더는 `Optional` 과 `Nice to have` 입니다. 공식 CRUX 도구들은 이 줄의 내용에 영향을 받지 않지만, 관리자들은 `Optional` 에 “소프트” 의존성(컴파일 시 존재할 경우 빌드된 프로그램에 링크될 라이브러리) 목록을 저장하는 것이 유용하다고 생각합니다. 이 헤더는 적절한 `configure` 플래그를 설정하기 위해 `build()` 함수에 포함할 테스트를 상기시키는 역할을 합니다. 공식 포트의 최종 사용자로서, 이 헤더들에서 다음과 같은 단서를 찾을 수 있습니다:

- 최소한의 의존성 외에 추가 의존성을 원하는 포트 설치 전에 설치할 때 활성화될 수 있는 추가 기능
- `pkgmk` 가 풋프린트 불일치를 보고하는 이유
- 다른 CRUX 시스템에서 빌드된 패키지를 자신의 CRUX 시스템에 설치할 때 발생할 수 있는 문제점

헤더 예시:

```
# Description: CUPS - Common UNIX Printing System
# URL: https://openprinting.github.io/cups/
# Maintainer: Juergen Daubert, jue at crux dot nu
# Depends on: acl libusb zlib linux-pam
# Optional: dbus gnutls
```

##  5.6. Building ports as unprivileged user
패키지 빌드는 올바른 소유자와 그룹을 가진 파일을 생성하기 위해 루트 권한이 필요합니다. 이는 보안 문제로, 악의적이거나 잘못 설계된 포트가 셸에서 `Pkgfile` 파일을 소스 처리할 때 임의의 명령을 실행할 수 있기 때문입니다. `fakeroot` 명령어는 일반 사용자로 포트를 빌드하는 방법을 제공합니다. 특히 사용자 기여 저장소에서 패키지를 빌드할 때는 `fakeroot` 사용을 권장합니다:

```
$ fakeroot pkgmk -d
```


## 5.7. Ports Collections
BSD 용어를 차용해서 CRUX는 `Pkgfile, .footprint, .signature` 를 포함하는 디렉토리를 포트(port)라고 부릅니다. 포트의 상위 디렉토리는 컬렉션(collection) 또는 저장소(repository)로 알려져 있습니다. 한 사용자에서 다른 사용자로, 또는 CRUX 팀에서 사용자로 포트를 배포하려면 HTTP, git 또는 rsync 포트를 수신 대기하는 서버와 해당 저장소에서 포트를 다운로드할 수 있는 클라이언트 프로그램이 필요합니다. CRUX 시스템 관리자는 `/etc/ports/drivers` 아래의 스크립트 중 하나를 실행해서 원격 파일을 로컬 디렉터리(보통 `/usr/ports/` 아래)로 복사합니다. 현재 `rsync(1), httpup(1), git(1)` 프로토콜용 스크립트가 존재합니다. 드라이버 스크립트를 수동으로 실행할 수도 있지만, 일반적으로 래퍼 스크립트(역사적으로 `ports -u`)를 통해 이 작업을 자동화합니다. 래퍼 스크립트는 원격 저장소를 정의하는 파일의 확장자를 기반으로 적절한 드라이버를 선택합니다(예: `/etc/ports/core.rsync` 는 `rsync` 드라이버로 처리됨). 다른 프로토콜 지원이 필요할 경우(예: SSH를 통한 git) 자체 드라이버를 자유롭게 정의할 수 있습니다. 단, 드라이버 이름을 `inactive` 로 지정하지 마시기 바랍니다. 해당 확장자는 저장소 비활성화를 위해 예약되어 있습니다.

포트 컬렉션에는 세 가지 다른 수준이 있습니다:


### 5.7.1. The official collections 'core', 'opt', 'xorg' and 'compat-32'
`core, opt, xorg` 및 `compat-32` 는 CRUX의 네 가지 주요 컬렉션입니다. 이 컬렉션들은 CRUX 개발팀이 관리하며, 서로 일관성 있게 작동하도록 보장합니다. 처음 세 개는 기본적으로 활성화되어 있습니다. `compat-32` 컬렉션은 기본적으로 비활성화되어 있으며 32비트 호환성 포트를 포함합니다.


### 5.7.2. The user contributed collection 'contrib'
`contrib` 컬렉션은 경험 많은 포트 관리자들이 제공하는 컬렉션입니다: 일부는 CRUX 개발팀의 일원이며, 다른 이들은 일반 사용자입니다. 이 컬렉션의 목표는 개별 컬렉션에서 중복되는 포트 수를 줄이는 것입니다. 숙련된 포트 관리자라면 `contrib` 팀에 합류하는 것도 고려할 수 있습니다.

해당 포트들은 CRUX 개발팀이 공식적으로 제공하는 것이 아니므로, 이 컬렉션은 기본적으로 비활성화되어 있습니다. 저장소 동기화 파일의 이름을 변경해서 활성화할 수 있습니다:

```
$ cd /etc/ports
$ mv contrib.rsync.inactive contrib.rsync
```


### 5.7.3. The individual collections from CRUX users
HttpUp 이나 git을 사용하면 모든 사용자가 자신의 포트를 손쉽게 배포할 수 있습니다. 이를 위한 유일한 요건은 포트를 업로드할 웹 공간입니다. 테스트를 거쳐 성공적으로 실행되는 포트로 구성된 HttpUp 저장소를 유지하는 것은 CRUX 커뮤니티에 기여하는 간단한 방법입니다.


## 5.8. Package Management Frontend: prt-get
현재의 `pkgutils` 는 의존성 처리 개념을 지원하지 않습니다. 이를 해결하기 위해 프론트엔드 유틸리티인 `prt-get` 이 개발되었습니다. `prt-get` 은 (아래에 언급된 제한 사항이 있지만...) 의존성 처리를 지원하며 `pkgutils` 기능과 일부 중복되는 기능을 제공하며, 오랫동안 CRUX의 공식 구성 요소로 포함되어 왔습니다.


### 5.8.1. Functionality
`prt-get` 의 기능 및 사용 예는 다음과 같습니다:

- 설치된 포트 목록 표시:

```
$ prt-get listinst
acl
alsa-lib
alsa-utils
[...]

$ prt-get listinst -v
acl 2.3.1-1
alsa-lib 1.2.7.2-1
alsa-utils 1.2.7-1
[...]
```

- 포트에 대한 정보 조회:

```
$ prt-get info acl
Name:         acl
Path:         /usr/ports/core
Version:      2.3.1
Release:      1
Description:  Access Control Lists library
URL:          http://savannah.nongnu.org/projects/acl
Maintainer:   CRUX System Team, core-ports at crux dot nu
Dependencies: attr
```

- 이름으로 포트 검색:

```
$ prt-get search glibc
glibc
glibc-32

$ prt-get search --regex '(ba|z)sh$'
bash
zsh
```

- 설치된 파일로 포트 검색:

```
$ prt-get fsearch gconv
Found in /usr/ports/core/glibc:
  /usr/lib/gconv/

Found in /usr/ports/core/glibc-32:
  /usr/lib32/gconv/
```

- 설명에 포함된 단어로 포트 검색:

```
$ prt-get dsearch shell
dash
dialog
dsh
[...]
zsh
```

- 의존성 목록 보기:

```
$ prt-get depends bash
-- dependencies ([i] = installed)
[i] ncurses
[i] readline
[i] bash

$ prt-get quickdep bash
ncurses readline bash

$ prt-get deptree bash
-- dependencies ([i] = installed, '-->' = seen before)
[i] bash
[i]   readline
[i]     ncurses
```

- 포트 설치:

```
$ prt-get install xterm
```

> [!NOTE]
> `install` 명령어는 종속성을 처리하지 않으며, 일반적으로 `depinst` 을 사용하는 것을 권장합니다!

```
$ prt-get depinst xterm
```

이전 포트 확인 및 업데이트 (일반적으로 `ports -u` 실행 후):

- 설치된 구식 포트 목록 표시:

```
$prt-get diff
```

- 설치된 패키지와 포트 트리의 차이점:

```
Port                Installed           Available in the ports tree
imagemagick         7.1.1-41            7.1.1-44
```

- 개별 포트 업데이트:

```
$ prt-get update imagemagick
```

- 설치된 모든 포트 업데이트:

```
$ prt-get sysup
```

> [!NOTE]
> 현재 `update` 및 `sysup` 은 포트 초기 설치 후 추가된 새로운 종속성을 처리하지 않습니다. 설치된 포트의 종속성 목록에 추가된 항목을 표시하려면 다음과 같이 여러 번의 `prt-get` 호출을 awk 호출 하나로 연결할 수 있습니다.

```
$ prt-get isinst $(prt-get quickdep $(prt-get quickdiff)) | awk '/not installed/ {print $2}'
```


### 5.8.2. Configuring prt-get
#### 5.8.2.1. /etc/prt-get.conf
`prt-get` 의 주요 구성 파일인 `/etc/prt-get.conf` 는 `prt-get` 의 동작을 변경하는 데 사용할 수 있는 옵션이 포함되어 있습니다. 특히 이 파일에서 다음과 같은 옵션을 구성할 수 있습니다:

| 옵션명 | 설명 |
| --- | --- |
| prtdir | 이 옵션은 여러 번 지정할 수 있으며 `prt-get` 이 포트 검색을 수행할 컬렉션을 지정합니다. 기본적으로 ‘core’, ‘opt’, ‘xorg’ 컬렉션이 활성화됩니다. ‘compat-32’ 및 ‘contrib’ 컬렉션은 기본적으로 비활성화되어 있지만, ‘.inactive’ 접미사를 제거하면 활성화할 수 있습니다. |
| logfile | 이 옵션은 필요 시 `prt-get` 의 작업 로그를 기록할 파일을 지정합니다. |
| runscripts | 이 옵션은 설치 또는 업데이트 중인 포트에 사전/사후 설치 스크립트가 존재할 경우 이를 실행하도록 `prt-get` 을 구성합니다. 포트에 사전 또는 사후 설치 스크립트가 존재하는 경우 대부분 정상 작동을 위해 실행이 필요하므로 이 옵션을 활성화하는 것이 권장됩니다. |
| makecommand | 이 옵션을 `fakeroot pkgmk` 로 설정하면 일반 사용자가 `prt-get` 을 실행해서 소유자/그룹 불일치 없이 패키지를 생성할 수 있습니다. |
| addcommand | 이 옵션을 `doas /usr/bin/pkgadd` 로 설정하면 일반 사용자가 빌드된 패키지를 설치하기 위해 권한을 상승시킬 수 있습니다. 다른 경로의 `pkgadd` 를 지정할 수도 있습니다. 예를 들어, 자세한 디버그 출력이 필요하면 `CXXFLAGS += -DNDEBUG` 로 빌드된 버전을 사용할 수 있습니다. |

`prt-get` 자체 실행 권한을 부여하는 `sudo` 또는 `doas` 구성을 작성하는 것도 고려해 볼 수 있습니다. 그러면 비-루트 사용자는 항상 `prt-get` 을 직접 실행하기보다 `sudo prt-get` 을 실행하게 됩니다. `prt-get.conf, sudo` 또는 `doas` 매뉴얼 페이지를 참고해서 이러한 구성 요소들이 어떻게 결합되는지 확인하고 가장 적합한 옵션을 선택합니다. 공식 저장소 외부에 있는 포트를 추가로 검토하려면, 래퍼 프로그램인 `prt-get` 대신 저수준 명령어인 `pkgmk` 와 `pkgadd` 를 사용하는 것이 도움이 됩니다. 이 방법은 비공식 포트의 디렉터리에 위치하도록 강제하며, `Pkgfile` 의 소스 배열과 빌드 함수가 사용자의 세심한 주의를 받을 가능성이 높아집니다.


#### 5.8.2.2. /etc/prt-get.aliases
`prt-get` 은 별칭 개념이 있으며, 이는 다른 리눅스 배포판의 ‘provides’ 개념과 유사한 방식으로 사용할 수 있습니다. 이 파일은 `/etc/prt-get.aliases` 이며 다음과 같은 형식의 줄을 포함합니다:

```
postfix: sendmail
exim: sendmail
qmail: sendmail
masqmail: sendmail
```

위의 별칭 집합은 포스트픽스(postfix), 엑심(exim), 큐메일(qmail), 마스큐메일(masqmail) 모두 포트에서 'sendmail' 에 대한 종속성을 충족시키기에 충분하다고 간주됨을 나타냅니다.

때로는 포트 관리자가 필수 종속성 목록에 라이브러리와 데모 유틸리티를 함께 묶은 포트를 포함시키기도 합니다. 종속 포트 컴파일 시 라이브러리만 필요한 경우, 데모 유틸리티가 포함된 포트의 설치를 방지하려면 `prt-get.aliases` 를 사용할 수 있습니다. 예를 들어, aom은 빌드되지 않지만 유사한 포트인 libaom 이 `-D EXAMPLES=OFF` 옵션으로 빌드되는 시스템은 `prt-get depinst firefox` 명령이 libaom으로 만족하고 aom을 빌드하려고 시도하지 않도록 처리해야 합니다. 이는 `prt-get.aliases` 에 다음과 같은 줄을 추가해서 달성할 수 있습니다:

```
libaom: aom
```

> [!NOTE]
> `prt-get` 의 별칭 기능은 설치 또는 제거 작업 중 포트를 자동으로 대체하지 않습니다. 포트가 ‘aom' 에 의존하고 'aom' 과 'libaom’ 모두 설치되지 않은 경우, `prt-get` 은 포트 의존성에 명시된 대로 'aom' 을 설치합니다. 반면, 의존하는 포트의 설치 또는 제거 작업 전에 'libaom' 이 설치된 경우, `prt-get` 은 해당 의존성이 충족된 것으로 간주합니다. 이것은 `prt-get` 의 모든 명령어, 기능 및 구성 옵션을 망라한 목록이 아니라 단지 시작점일 뿐입니다. 자세한 내용은 `prt-get(8)` 매뉴얼 페이지와 빠른 시작 문서에서 확인할 수 있습니다.


<br><br>
# 6. Appendix
## 6.1. Troubleshooting
자주 묻는 질문 문서에는 많은 일반적인 문제에 대한 답변이 수록되어 있으므로, 어떤 문제가 발생할 경우 CRUX FAQ에 이미 답변이 포함되어 있는지 확인해 주시기 바랍니다.

추가 질문이 있을 경우, CRUX 전용 메일링 리스트와 IRC 채널이 마련되어 있습니다. 이에 대한 실제 정보는 커뮤니티 페이지에서 확인하실 수 있습니다.


## 6.2. Writing a grub config file by hand
`grub-mkconfig` 가 작동하지 않는 경우(예: 커널 이미지를 비표준 이름으로 저장한 경우), `grub.cfg` 파일을 수동으로 생성할 수 있습니다. 자세한 내용은 http://www.gnu.org/software/grub/manual/ 의 GRUB 매뉴얼을 참조합니다. 간단한 구성 예는 다음과 같습니다:

```
 # Display the menu for 10 seconds
 set timeout=10

 # Boot the first entry by default
 set default=0

 # Boot entries follow

 # Default CRUX boot entry
 menuentry "CRUX 3.8" {
	linux (hd0,msdos2)/boot/vmlinuz-6.12.23 root=/dev/sda2 quiet
 }

 # Single-user recovery entry
 menuentry "CRUX 3.8 single-user mode" {
	linux (hd0,msdos2)/boot/vmlinuz-6.12.23 root=/dev/sda2 quiet single
 }

 # Memory test entry
 menuentry "MemTest86+ 4.20" {
	linux16 (hd0,msdos2)/boot/memtest86+-4.20.bin
 }
```

수동 구성 파일을 `/boot/grub/grub.cfg` 로 저장합니다.


## 6.3. EFI Stub installation notes
GRUB과 SYSLINUX는 LILO를 사용하던 사용자에게 가장 익숙한 환경을 제공합니다. BIOS 및 마스터 부트 레코드(MBR)와의 일회성 상호작용 이후, GRUB 또는 SYSLINUX 구성의 모든 후속 업데이트는 평문 텍스트 파일 편집만으로 이루어집니다. LILO의 경우 평문 구성 파일을 편집한 후 `/sbin/lilo` 를 실행해야 했지만, GRUB과 SYSLINUX는 초기 설치 후 부트섹터나 NVRAM 내용을 절대 건드릴 필요가 없습니다. 평문 구성 파일의 변경 사항은 자동으로 감지됩니다.

CRUX 시스템으로 부팅하는 세 번째 방법은 EFI 변수와 직접 상호작용해서 리눅스 커널 이미지가 필요한 EFI 부트 로더 코드를 제공하도록 처리하는 것입니다. 이 옵션의 작업 흐름은 새로운 커널을 빌드하고 설치한 후 `/sbin/lilo` 를 실행하는 과정을 떠올리게 할 수 있습니다.

> [!NOTE]
> 이런 부팅 방식은 UEFI 모드만 작동하며, 커널이 `CONFIG_EFI_STUB=y` 로 빌드된 경우만 사용 가능합니다. 레거시 MBR 부팅은 이 방법이 지원되지 않습니다. GRUB 및 SYSLINUX와 마찬가지로, 커널은 루트 파일 시스템으로 사용할 장치를 지정받아야 합니다. 대부분의 최신 BIOS는 커널 부팅 라인에 `root=/dev/sda2` 같은 옵션을 추가할 수 있도록 허용하지만, 일부 버그가 있는 UEFI 구현체는 이러한 추가 옵션을 인식하지 못합니다. 안전을 위해 커널 구성 과정(`make menuconfig` 단계)에서 부팅 옵션을 맞춤 설정할 수 있지만, 이 경우 디스크를 외부 인클로저에 넣고 USB로 부팅하는 것이 어려워집니다(가볍게 이동할 때). 커널 구성 시 부팅 옵션을 비워두고 BIOS가 추가 옵션을 인식하지 못할 경우, 시스템에 다시 진입해서 문제를 해결하려면 복구 디스크로 부팅해야 할 수 있습니다.

빌드된 커널을 EFI 시스템 파티션(`/boot/efi` 에 마운트됨)의 BOOT 하위 디렉터리에 복사합니다. 최대 호환성을 위해 확장자를 .efi 로 저장합니다.

```
$ mkdir -p /boot/efi/BOOT
$ cd /boot/efi/BOOT
$ cp /usr/src/linux-6.12.23/arch/x86/boot/bzImage vmlinuz-6.12.23.efi
```

다음으로, 방금 저장한 커널 이미지를 BIOS에 알리는 부팅 항목을 생성합니다.

```
$ efibootmgr -c -d /dev/sda -L 'Linux 6.12.23' -l '\BOOT\vmlinuz-6.12.23.efi' -u 'root=/dev/sda2'
```

마지막으로 부팅 순서를 변경해서 새로 생성된 부팅 항목이 가장 먼저 시도하도록 처리합니다. 새로 생성된 항목에 할당된 번호를 찾은 다음, 해당 번호를 사용해서 원하는 부팅 순서를 지정합니다. 

```
$ efibootmgr
 BootCurrent: 0000
 Timeout: 1 seconds
 BootOrder: 0000,0001
 Boot0000* Linux 5.15.26  HD(1,GPT,d5a44413-...,0x800,0x64000)/File(\BOOT\vmlinuz-5.15.26.efi)72006f006f0074...
 Boot0001* Linux 6.12.23   HD(1,GPT,d5a44413-...,0x800,0x64000)/File(\BOOT\vmlinuz-6.12.23.efi)72006f006f0074...

$ efibootmgr -o 0001,0000
```
SYSLINUX의 UEFI 설치와 마찬가지로, EFI 시스템 파티션의 하위 디렉터리 `EFI/BOOT` 는 BIOS가 부트 로더를 찾을 것으로 예상하는 기본 경로입니다. 이 위치는 `efibootmgr` 명령어에서 더욱 더 명확히 드러나는데, `efibootmgr` 는 EFI 시스템 파티션의 마운트 포인트에 대해 무관심하기 때문입니다. 커널 경로가 지나치게 길 경우 이를 줄이는 가장 일반적인 두 가지 방법은 다음과 같습니다:

- EFI 시스템 파티션을 다른 위치에 마운트하고 (필요에 따라 `mkdir` 및 `cd` 명령어를 조정합니다)
- 커널을 EFI 시스템 파티션 루트 근처에 저장하고 (필요에 따라 `efibootmgr` 호출을 변경합니다)


## 6.4. Notes on Initramfs
일반적인 시나리오에서 루트 파일시스템용 드라이버만 포함된 슬림화된 커널로 부팅한 후(다른 하드웨어 초기화를 위한 모듈을 로드하는 방식) 커널을 적용하지 못하는 경우가 있습니다. 이는 루트 파일시스템이 물리 볼륨이 아닌 LUKS 같은 암호화 계층 내의 논리 볼륨이기 때문입니다. 이러한 상황을 처리하려면 위에서 설명한 커널 빌드 과정을 넘어, lvm2 및 `cryptsetup` 패키지(그리고 커널에 컴파일하지 않기로 선택한 경우 USB 입력 장치용 드라이버)를 포함하는 압축 파일 시스템 이미지(`initramfs` 라고 함)도 생성해야 합니다. 이러한 `initramfs` 생성은 한때 복잡한 절차였지만, dracut 같은 도구 덕분에 요즘은 훨씬 더 간단해졌습니다.

`Idracut` 실행과 커널과 함께 `initramfs` 를 EFI 시스템 파티션에 저장하는 작업이 일반적인 CRUX 설치 절차에서 유일한 차이점이었다면, 부록의 한 섹션만으로도 CRUX에서 전체 디스크 암호화를 수행하는 방법을 설명하기에 충분했을 것입니다. 그러나, 이런 설정 준비는 파티션 단계에서 시작되며, 파일 시스템을 생성하고 마운트하기 전에 lvm2 및 cryptsetup 패키지의 명령어를 호출해야 합니다. 따라서, 부록의 이 섹션은 별도의 문서로 연결되며, 해당 문서는 전체 디스크 암호화를 적용한 CRUX 설치 과정이 처음부터 끝까지 개요 형태로 제시되어 있습니다. 전체 디스크 암호화가 최종 목표가 아니더라도 고도로 모듈화된 커널 구성에 대해 좀 더 알고 싶다면, 전체 디스크 암호화 같은 구체적인 사용 사례를 고려함으로써 `initramfs` 의 필요성을 좀 더 쉽게 이해할 수 있습니다. 링크된 개요에서 익숙하지 않은 명령어(예: `cryptsetup, pvcreate, dracut`)에 대한 상위 문서(upstream documentation)를 공부하는 것은 프로세스 각 단계에서 수행되는 기능을 구분하는 탁월한 방법입니다.
