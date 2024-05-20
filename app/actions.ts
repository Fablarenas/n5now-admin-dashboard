'use server';

import { revalidatePath } from 'next/cache';

export async function updatePermission(permissionId: number) {
  // Uncomment this to enable update
  // await updatePermissionById(permissionId);
  // revalidatePath('/');
}
