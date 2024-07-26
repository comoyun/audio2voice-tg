# audio2voice-tg

Converts an audio file to OGG format with OPUS encoding and sends it as a playable voice message with a spectrogram through a Telegram bot.

<img src="https://github.com/user-attachments/assets/1c1eac35-0040-4ce0-8545-fb881b209d89" width="600">

## Requirements

- Node.js
- `ffmpeg`
- Telegram bot token and chat ID

Use your distribution’s package manager to install `ffmpeg`:

- **Ubuntu/Debian:**

  ```bash
  sudo apt update
  sudo apt install ffmpeg
  ```

- **CentOS/RHEL:**

  ```bash
  sudo yum install epel-release
  sudo yum install ffmpeg
  ```

- **Arch Linux:**

  ```bash
  sudo pacman -S ffmpeg
  ```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/comoyun/audio2voice-tg.git
   cd audio2voice-tg
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the script with your bot token and chat ID. You can find your chat ID through @ShowJsonBot. 
   
## Usage

```bash
npm start <token> <chat_id> <audio_file_path>
```

Example:

```bash
npm start 1234567890:AABBCCDDEEFF-0000 5321012345 audio.mp3 
```

## Notes

The script can be run interactively. For that, simply run `node index.js` and follow the prompts for bot token, chat ID, and audio file path.
To have spectogram, the resulting file from conversion must be [no more than 1MB]([url](https://core.telegram.org/bots/api#inputfile)) in size. Otherwise, voice notes will be sent as files.
