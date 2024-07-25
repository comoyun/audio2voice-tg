# audio2voice-tg

Converts an audio file to OGG format and sends them as a voice message via a Telegram bot.

<img src="https://github.com/user-attachments/assets/1c1eac35-0040-4ce0-8545-fb881b209d89" width="600">

## Requirements

- Node.js
- `ffmpeg` 

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

1. Convert and send an audio file:
   ```bash
   npm start <audiofile>
   ```

## Example

```bash
npm start audio.mp3
```

## Note

The script can be run interactively. For that, simply run `node index.js` and follow the prompts for bot token, chat ID, and audio file path.
