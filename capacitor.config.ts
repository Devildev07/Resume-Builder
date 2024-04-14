import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dew.resumify',
  appName: 'Resumify',
  webDir: 'resume-builder',
  server: {
    androidScheme: 'https',
  },
};

export default config;
