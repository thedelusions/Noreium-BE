import { Platform, GeneratorResult } from './generator.types';
import { getCollection } from '../collections/collection.service';
import { findLibraryItemByIdAndOwner } from '../library-items/library-item.repository';
import { ApiError } from '../../utils/ApiError';

export async function generateScript(
  ownerId: string,
  collectionId: string,
  platform: Platform
): Promise<GeneratorResult> {
  const collection = await getCollection(ownerId, collectionId);
  if (!collection) throw new ApiError(404, 'Collection not found');

  const included: GeneratorResult['includedItems'] = [];
  const skipped: GeneratorResult['skippedItems'] = [];

  for (const itemId of collection.itemIds) {
    const item = await findLibraryItemByIdAndOwner(itemId.toString(), ownerId);
    if (!item) {
      skipped.push({ id: itemId.toString(), name: '', reason: 'Not found or not owned' });
      continue;
    }

    const metadata: any = item.metadata || {};
    let command: string | undefined;
    if (platform === 'windows') {
      command = metadata.windowsCommand || metadata.command;
    } else {
      command = metadata.linuxCommand || metadata.command;
    }

    if (!command) {
      skipped.push({
        id: item._id.toString(),
        name: item.name,
        reason: 'No install command available',
      });
      continue;
    }

    included.push({ id: item._id.toString(), name: item.name, command });
  }

  let script = '';
  if (platform === 'linux') {
    script += '#!/usr/bin/env bash\nset -e\n\n';
  }

  for (const inc of included) {
    script += inc.command + '\n';
  }

  return { platform, script, includedItems: included, skippedItems: skipped };
}
