export type Platform = 'windows' | 'linux';

export interface GeneratorResult {
  platform: Platform;
  script: string;
  includedItems: { id: string; name: string; command: string }[];
  skippedItems: { id: string; name: string; reason: string }[];
}
