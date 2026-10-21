import {Config} from '@remotion/cli/config';

// Kualitas upload YouTube 1080p30: ~10 Mbps, pixel format standar.
Config.setVideoBitrate('10M');
Config.setPixelFormat('yuv420p');
Config.setEntryPoint('src/index.ts');
