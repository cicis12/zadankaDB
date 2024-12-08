#!/bin/bash

echo "Checking system PATH..."
echo $PATH  # Print the PATH to help debug

# Check Node.js version and where it's installed
echo "Checking Node.js installation..."
which node
node -v

# Function to check if a command is available
check_command() {
  local cmd=$1
  local install_instructions=$2

  if ! command -v "$cmd" &>/dev/null; then
    echo "$cmd is not installed."
    echo "Please install $cmd using: $install_instructions"
    exit 1
  else
    echo "$cmd is already installed."
  fi
}

# Check Node.js
check_command "node" "Download it from https://nodejs.org/ or use your package manager (e.g., apt, yum, brew)."

# Check npm
check_command "npm" "It comes with Node.js. If missing, reinstall Node.js."

# Initialize npm in the current directory if not already done
if [ ! -f "package.json" ]; then
  echo "Initializing npm in the current directory..."
  npm init -y
else
  echo "npm already initialized in the current directory."
fi

# Check and install necessary Node.js packages
echo "Checking Node.js packages..."
check_and_install_node_package "axios"
check_and_install_node_package "form-data"

echo "All dependencies are installed and ready to go!"
