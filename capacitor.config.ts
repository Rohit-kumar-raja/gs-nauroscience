import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neauroscience.gs',
  appName: 'G.S neauroscience',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      backgroundColor: '#ffffff', // Set your desired status bar color
      style: 'DARK'
    }
  }
};

export default config;